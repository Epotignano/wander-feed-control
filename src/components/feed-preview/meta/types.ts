export interface Address {
  COMPONENT: string[];
}

interface RawListing {
  ID: string;
  NAME: string;
  BRAND: string;
  CATEGORY: string;
  DESCRIPTION: string;
  NUMBER_OF_ROOMS: string;
  STAR_RATING: string;
  BASE_PRICE: string;
  PRICE: string;
  SALE_PRICE: string;
  STATUS: string;
  COUNTRY: string;
  ADDRESS: Address;
  LATITUDE: string;
  LONGITUDE: string;
  URL: string[];
  IMG?: Record<string, unknown>[];
  CUSTOM_NUMBER_0?: string;
  CUSTOM_NUMBER_1?: string;
  CUSTOM_NUMBER_2?: string;
  CUSTOM_NUMBER_3?: string;
  CUSTOM_NUMBER_4?: string;
}

export interface ListingElement {
  ID: string;
  NAME: string;
  BRAND: string;
  CATEGORY: string;
  DESCRIPTION: string;
  NUMBER_OF_ROOMS: string;
  STAR_RATING: string;
  BASE_PRICE: string;
  PRICE: string;
  SALE_PRICE: string;
  STATUS: string;
  COUNTRY: string;
  ADDRESS: Address;
  LATITUDE: string;
  LONGITUDE: string;
  propertyUrl: string;
  images: string[];
  CUSTOM_NUMBER_0?: string;
  CUSTOM_NUMBER_1?: string;
  CUSTOM_NUMBER_2?: string;
  CUSTOM_NUMBER_3?: string;
  CUSTOM_NUMBER_4?: string;
}

export function transformListing(rawListing: unknown): ListingElement {
  const listing = rawListing as RawListing;
  
  // Extract property URL and image URLs
  const urls = Array.isArray(listing.URL) ? listing.URL : [];
  const propertyUrl = urls.find((url) => url.includes('/property/')) || '';
  const imageUrls = urls.filter((url) => url.includes('assets.wander.com'));

  // Create a new object with only the fields we want
  const transformed: ListingElement = {
    ID: listing.ID,
    NAME: listing.NAME,
    BRAND: listing.BRAND,
    CATEGORY: listing.CATEGORY,
    DESCRIPTION: listing.DESCRIPTION,
    NUMBER_OF_ROOMS: listing.NUMBER_OF_ROOMS,
    STAR_RATING: listing.STAR_RATING,
    BASE_PRICE: listing.BASE_PRICE,
    PRICE: listing.PRICE,
    SALE_PRICE: listing.SALE_PRICE,
    STATUS: listing.STATUS,
    COUNTRY: listing.COUNTRY,
    ADDRESS: listing.ADDRESS,
    LATITUDE: listing.LATITUDE,
    LONGITUDE: listing.LONGITUDE,
    propertyUrl,
    images: imageUrls,
    CUSTOM_NUMBER_0: listing.CUSTOM_NUMBER_0,
    CUSTOM_NUMBER_1: listing.CUSTOM_NUMBER_1,
    CUSTOM_NUMBER_2: listing.CUSTOM_NUMBER_2,
    CUSTOM_NUMBER_3: listing.CUSTOM_NUMBER_3,
    CUSTOM_NUMBER_4: listing.CUSTOM_NUMBER_4,
  };

  return transformed;
} 