// app/api/test/route.js
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase.from('listings').select('*').limit(1)
  if (error) return new Response(JSON.stringify({ error }), { status: 500 })
  if (data.length === 0) {
    return new Response(JSON.stringify({ message: 'Connected to Supabase, but no data in content table' }), { status: 200 })
  }
  return new Response(JSON.stringify(data), { status: 200 })
}