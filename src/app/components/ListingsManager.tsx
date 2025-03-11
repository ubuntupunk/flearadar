'use client'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { supabase } from '@/lib/supabase'

interface ListingForm {
  title: string
  price: number
  location: string
}

export default function ListingsManager() {
  const { register, handleSubmit, reset } = useForm<ListingForm>()
  const [listings, setListings] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    const { data, error } = await supabase.from('listings').select('id, slug, data')
    if (error) setError(error.message)
    else setListings(data)
  }

  const onSubmit = async (data: ListingForm) => {
    const slug = data.title.toLowerCase().replace(/\s+/g, '-')
    const { error } = await supabase.from('listings').insert({
      slug,
      data: { title: data.title, price: data.price, location: data.location },
    })
    if (error) setError(error.message)
    else {
      reset()
      fetchListings()
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Title</label>
          <input {...register('title', { required: true })} className="border p-2 w-full" />
        </div>
        <div>
          <label>Price</label>
          <input type="number" {...register('price', { required: true })} className="border p-2 w-full" />
        </div>
        <div>
          <label>Location</label>
          <input {...register('location', { required: true })} className="border p-2 w-full" />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white p-2">Add Listing</button>
      </form>
      <h2>Listings</h2>
      <ul>
        {listings.map((listing) => (
          <li key={listing.id}>
            {listing.data.title} - ${listing.data.price} - {listing.data.location}
          </li>
        ))}
      </ul>
    </div>
  )
}