'use client'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { supabase } from '@/lib/supabase'

interface ListingForm {
  title: string
  category: string
  type: string
  description: string
  date: string
  location: string
  gps: string
  organiser: string
  contact: string
  email: string
  url: string
  social: string
  image: string
  environment: string
  frequency: string
  tradeDays: string
  tradeHours: string
  currency: string
  payments: string
  crowd: string
  access: string
  status: string
  verified: boolean
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
          <label>Location</label>
          <input {...register('location', { required: true })} className="border p-2 w-full" />
        </div>
        <div>
          <label>Category</label>
          <input {...register('category', { required: true })} className="border p-2 w-full" />
        </div>
        <div>
          <label>Type</label>
          <input {...register('type', { required: true })} className="border p-2 w-full" />
        </div>
        <div>
          <label>Description</label>
          <textarea {...register('description', { required: true })} className="border p-2 w-full" />
        </div>
        <div>
          <label>Date</label>
          <input type="date" {...register('date', { required: true })} className="border p-2 w-full" />
        </div>
        <div>
          <label>GPS</label>
          <input {...register('gps', { required: true })} className="border p-2 w-full" />
        </div>
        <div>
          <label>Organiser</label>
          <input {...register('organiser')} className="border p-2 w-full" />
        </div>
        <div>
          <label>Contact</label>
          <input {...register('contact')} className="border p-2 w-full" />
        </div>
        <div>
          <label>Email</label>
          <input type="email" {...register('email')} className="border p-2 w-full" />
        </div>
        <div>
          <label>URL</label>
          <input type="url" {...register('url')} className="border p-2 w-full" />
        </div>
        <div>
          <label>Social</label>
          <input {...register('social')} className="border p-2 w-full" />
        </div>
        <div>
          <label>Image URL</label>
          <input type="url" {...register('image', { required: true })} className="border p-2 w-full" />
        </div>
        <div>
          <label>Environment</label>
          <input {...register('environment')} className="border p-2 w-full" />
        </div>
        <div>
          <label>Frequency</label>
          <input {...register('frequency')} className="border p-2 w-full" />
        </div>
        <div>
          <label>Trade Days</label>
          <input {...register('tradeDays')} className="border p-2 w-full" />
        </div>
        <div>
          <label>Trade Hours</label>
          <input {...register('tradeHours')} className="border p-2 w-full" />
        </div>
        <div>
          <label>Currency</label>
          <input {...register('currency')} className="border p-2 w-full" />
        </div>
        <div>
          <label>Payments</label>
          <input {...register('payments')} className="border p-2 w-full" />
        </div>
        <div>
          <label>Crowd</label>
          <input {...register('crowd')} className="border p-2 w-full" />
        </div>
        <div>
          <label>Access</label>
          <input {...register('access')} className="border p-2 w-full" />
        </div>
        <div>
          <label>Status</label>
          <input {...register('status')} className="border p-2 w-full" />
        </div>
        <div>
          <label>Verified</label>
          <input type="checkbox" {...register('verified')} className="border p-2" />
        </div>

        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white p-2">Add Listing</button>
      </form>
      <h2>Listings</h2>
      <ul>
        {listings.map((listing) => (
          <li key={listing.id}>
            {listing.data.title} - {listing.data.location}
          </li>
        ))}
      </ul>
    </div>
  )
}
