import { Listing as ListingType } from '../lib/types/database';

export type Listing = ListingType;
export type TrendingExpandibleProps = {
  listings: Listing[];
};
