import { defineDocumentType, makeSource } from 'contentlayer/source-remote-files'

export const Content = defineDocumentType(() => ({
  name: 'Content',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    body: { type: 'string', required: true },
    type: { type: 'enum', options: ['article', 'review', 'journal'], required: true },
    metadata: { type: 'json', required: false },
  },
}))

export default makeSource({
  contentDirPath: 'content', // Local fallback (optional)
  fetcher: async () => {
    const { supabase } = await import('./lib/supabase')
    const { data } = await supabase.from('content').select('*')
    return data.map(item => ({
      ...item,
      _id: item.id,
      body: { raw: item.body },
    }))
  },
  documentTypes: [Content],
})