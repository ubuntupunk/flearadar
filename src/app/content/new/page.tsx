// app/content/new/page.tsx
import { supabase } from '@/lib/supabase'
import ContentInput from '@/app/components/ContentInput.tsx'

export default async function NewContentPage() {
  const { data: listings } = await supabase.from('listings').select('id, data')
  return <ContentInput listings={listings || []} />
}
