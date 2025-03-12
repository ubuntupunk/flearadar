'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { supabase } from '@/lib/supabase'

type ContentType = 'article' | 'review' | 'journal'

interface FormData {
  title: string
  body: string
  type: ContentType
  listingId?: string
  rating?: number
}

export default function ContentInput({ listings }: { listings: { id: number; data: { title: string } }[] }) {
  const { register, handleSubmit, reset } = useForm<FormData>()
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (data: FormData) => {
    const slug = data.title.toLowerCase().replace(/\s+/g, '-')
    const metadata = data.type === 'review' ? { rating: data.rating } : {}
    const { error } = await supabase.from('content').insert({
      title: data.title,
      slug,
      body: data.body,
      type: data.type,
      metadata,
      listing_id: data.type === 'review' ? parseInt(data.listingId || '0') : null,
    })
    if (error) setError(error.message)
    else reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Type</label>
        <select {...register('type', { required: true })} className="border p-2">
          <option value="article">Article</option>
          <option value="review">Review</option>
          <option value="journal">Journal</option>
        </select>
      </div>
      <div>
        <label>Title</label>
        <input {...register('title', { required: true })} className="border p-2 w-full" />
      </div>
      <div>
        <label>Body</label>
        <textarea {...register('body', { required: true })} className="border p-2 w-full" rows={5} />
      </div>
      <div className="conditional-fields">
        <input type="number" {...register('rating')} className="border p-2" placeholder="Rating (1-5)" min={1} max={5} />
        <select {...register('listingId')} className="border p-2">
          <option value="">Select Listing (for reviews)</option>
          {listings.map((listing) => (
            <option key={listing.id} value={listing.id}>
              {listing.data.title}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-blue-500 text-white p-2">Submit</button>
    </form>
  )
}
