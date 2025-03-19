import { createClientSupabaseClient } from "@/lib/supabase/client";
import { Listing, Json } from "@/lib/types/database";
import { notFound } from "next/navigation";
import Directory from "@/components/Directory";
import Score from "@/components/Score";

// Create a new type that extends Listing and includes additional properties
interface ExtendedListing extends Listing {
  name: string;
  type: string;
  description: string;
  date: string;
  location: string;
  gps: string;
  organiser: string;
  contact: string;
  email: string;
  url: string;
  social: string;
  image: string;
  environment: string;
  frequency: string;
  "trade-days": string;
  "trade-hours": string;
  currency: string;
  payments: string;
  crowd: string;
  access: string;
  status: string;
  rating: number[];
}

interface Params {
  listingId: string;
}

interface Props {
  params: Params;
  searchParams: { rating: number };
}

const DirectoryPage: React.FC<Props> = async ({ params, searchParams }) => {
  const supabase = createClientSupabaseClient();
  const ratingValue = (await searchParams).rating || 0;
  const { listingId } = await params;
  const ratingValueArr = [ratingValue];

   // Add validation for listingId
  const parsedListingId = parseInt(listingId);
  if (isNaN(parsedListingId) || parsedListingId <= 0) {
    console.error("Invalid listing ID:", listingId);
    return notFound();
  }

  try {
    const { data, error } = await supabase
      .from("listings")
      .select(
        `
          id,
          data->>name as name,
          data->>type as type,
          data->>description as description,
          data->>date as date,
          data->>location as location,
          data->>gps as gps,
          data->>organiser as organiser,
          data->>contact as contact,
          data->>email as email,
          data->>url as url,
          data->>social as social,
          data->>image as image,
          data->>environment as environment,
          data->>frequency as frequency,
          data->>"trade-days" as "trade-days",
          data->>"trade-hours" as "trade-hours",
          data->>currency as currency,
          data->>payments as payments,
          data->>crowd as crowd,
          data->>access as access,
          data->>status as status,
          data->>rating as rating,
          contact_details,
          contact_email,
          created_at,
          created_by,
          is_verified,
          owner_id,
          slug,
          updated_at
        `
      )
      .eq("id", parsedListingId);

    if (error) {
      console.error("Error fetching listing:", error);
      console.log("Supabase error data:", error.details);
      return notFound();
    }

    const listing = data?.[0];

    if (!listing) {
      console.error("Listing not found:", listingId); 
      return notFound();
    }

    // More robust type guard for listing
    const isListingType = (obj: any): obj is ExtendedListing => {
      return (
        obj &&
        typeof obj.id === "number" &&
        typeof obj.slug === "string" &&
        typeof obj.name === "string"
      );
    };

    if (!isListingType(listing)) {
      console.error("Invalid listing data type:", listing);
      return notFound();
    }

    // Handle potential errors more robustly
    const ratingArray = (() => {
      try {
        const parsedRating = JSON.parse(listing.rating || "[]");
        if (Array.isArray(parsedRating) && parsedRating.every((item) => typeof item === "number")) {
          return parsedRating;
        } else {
          console.warn("Invalid rating data:", listing.rating);
          return [];
        }
      } catch (parseError) {
        console.error("Error parsing rating data:", parseError);
        return [];
      }
    })();


    const listingWithCompleteData: ExtendedListing = {
      ...listing,
      rating: ratingArray,
    };

    return (
      <div>
        <Directory listings={[listingWithCompleteData]} />
        <Score rating={ratingValueArr} />
      </div>
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    console.log("Unexpected error details:", error);
    return notFound();
  }
};

export default DirectoryPage;