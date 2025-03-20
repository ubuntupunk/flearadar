import { createClientSupabaseClient } from '@/lib/supabase/client';
import { notFound } from 'next/navigation';
import Directory from '@/components/Directory';
import Score from '@/components/Score';
import { Listing, ListingImage } from '@/lib/types/database';
import { DirectoryProps, ScoreProps } from '@lib/types/components';

interface Props {
  params: {
    listingId: string;
  };
  searchParams: {
    rating?: string;
  };
}

interface ListingResponse {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  images: ListingImage[];
  rating: number | null;
  created_at: string;
  updated_at: string;
  user_id: string;
  category_id: number;
  status: 'active' | 'pending' | 'sold';
  features: string[];
  contact_info: {
    email: string;
    phone?: string;
  };
}

interface DirectoryContextProps {
  currentListing: ListingResponse | null;
  isLoading: boolean;
  error: Error | null;
}

// Validation utility
const isValidListingId = (id: string): boolean => {
  return /^[1-9]\d*$/.test(id);
};

// Type guard to check if listing data is valid
const isValidListing = (listing: any): listing is ListingResponse => {
  return listing 
    && typeof listing.id === 'number'
    && typeof listing.title === 'string'
    && typeof listing.description === 'string'
    && typeof listing.price === 'number'
    && typeof listing.location === 'string'
    && Array.isArray(listing.images)
    && typeof listing.user_id === 'string';
};

export async function generateStaticParams() {
  const supabase = createClientSupabaseClient();
  const { data } = await supabase
    .from('listings')
    .select('id');
  
  return data?.map((listing) => ({
    listingId: listing.id.toString(),
  })) || [];
}

const DirectoryPage: React.FC<Props> = async ({ params, searchParams }) => {
  const supabase = createClientSupabaseClient();
  
  // Input validation
  const { listingId } = params;
  if (!isValidListingId(listingId)) {
    console.error('Invalid listing ID format:', listingId);
    return notFound();
  }

  const parsedListingId = parseInt(listingId, 10);
  if (isNaN(parsedListingId) || parsedListingId <= 0) {
    console.error('Invalid listing ID:', listingId);
    return notFound();
  }

  // Handle rating parameter
  const ratingValue = searchParams?.rating ? parseFloat(searchParams.rating) : 0;
  const ratingValueArr = isNaN(ratingValue) ? [] : [ratingValue];

  try {
    // Fetch listing data
    const { data: listing, error } = await supabase
      .from('listings')
      .select(`
        id,
        title,
        description,
        price,
        location,
        images,
        rating,
        created_at,
        updated_at,
        user_id,
        category_id,
        status,
        features,
        contact_info
      `)
      .eq('id', parsedListingId)
      .single();

    if (error) {
      console.error('Error fetching listing:', error);
      return notFound();
    }

    if (!listing || !isValidListing(listing)) {
      console.error('Invalid or missing listing data');
      return notFound();
    }

    // Process rating
    const processedRating = listing.rating || ratingValueArr;

    const directoryContextValue: DirectoryContextProps = {
      currentListing: listing,
      isLoading: false,
      error: null
    };

    const scoreProps: ScoreProps = {
      rating: processedRating,
      size: 'large',
      showCount: true,
      interactive: false
    };

    return (
      <Directory context={directoryContextValue}>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">{listing.title}</h1>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              {/* Status Badge */}
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold
                  ${listing.status === 'active' ? 'bg-green-100 text-green-800' :
                    listing.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'}`}>
                  {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                </span>
              </div>

              {/* Listing Details */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{listing.description}</p>
              </div>

              {/* Features */}
              {listing.features && listing.features.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Features</h2>
                  <ul className="grid grid-cols-2 gap-2">
                    {listing.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Price */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Price</h2>
                <p className="text-2xl font-bold text-green-600">
                  ${listing.price.toFixed(2)}
                </p>
              </div>

              {/* Location */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Location</h2>
                <p className="text-gray-700">{listing.location}</p>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Rating</h2>
                <Score {...scoreProps} />
              </div>

              {/* Contact Information */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
                <div className="text-gray-700">
                  <p>Email: {listing.contact_info.email}</p>
                  {listing.contact_info.phone && (
                    <p>Phone: {listing.contact_info.phone}</p>
                  )}
                </div>
              </div>

              {/* Images */}
              {listing.images && listing.images.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Images</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {listing.images.map((image: ListingImage, index: number) => (
                      <div key={index} className="aspect-w-1 aspect-h-1">
                        <img
                          src={image.url}
                          alt={image.alt || `Listing image ${index + 1}`}
                          className="object-cover rounded-lg"
                          loading={index < 2 ? 'eager' : 'lazy'}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="text-sm text-gray-500">
                <p>Listed on: {new Date(listing.created_at).toLocaleDateString()}</p>
                <p>Last updated: {new Date(listing.updated_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </Directory>
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return notFound();
  }
};

export default DirectoryPage;