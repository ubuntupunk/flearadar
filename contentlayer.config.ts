import { defineDocumentType, makeSource } from 'contentlayer/source-files'

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
  contentDirPath: 'content',
  documentTypes: [Content],
})
