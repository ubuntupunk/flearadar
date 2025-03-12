// scripts/migrate-listings.js
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
console.log('dotenv config path:', '.env.local')

import listings from '../app/data/listings.json' with { type: 'json' }
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Anon Key:', supabaseAnonKey)

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anon Key in .env.local')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function migrate() {
  console.log(`Starting migration of ${listings.length} listings...`)

  for (const listing of listings) {
    // Determine base slug from slug, name, or title (fallback to unique ID if all empty)
    const slugBase = listing.slug || listing.name || listing.title || `listing-${listing.id || Date.now()}`;
    let slug = slugBase.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    // Handle empty or invalid slug
    if (!slug || slug === '') {
      slug = `listing-${listing.id || Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    }

    // Check for existing slug and append counter if needed
    let counter = 1;
    let finalSlug = slug;
    while ((await supabase.from('listings').select('id').eq('slug', finalSlug)).data.length > 0) {
      finalSlug = `${slug}-${counter++}`;
    }

    console.log(`Inserting listing: ${finalSlug}`);

    const { error } = await supabase
      .from('listings')
      .insert({ slug: finalSlug, data: listing })

    if (error) {
      console.error(`Error inserting ${finalSlug}:`, error);
      continue; // Skip to next listing on error
    }
  }

  console.log('Migration complete')
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
