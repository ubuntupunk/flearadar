// scripts/migrate-listings.js
import listings from '../data/listings.json'
import { supabase } from '../lib/supabase'

async function migrate() {
  for (const listing of listings) {
    const { error } = await supabase
      .from('listings')
      .insert({ slug: listing.slug || listing.title.toLowerCase().replace(/\s+/g, '-'), data: listing })
    if (error) console.error(error)
  }
  console.log('Migration complete')
}

migrate()