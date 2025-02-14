import { xmlToJson, type XMLObject } from "@/lib/utils";
import { ListingElement, transformListing } from "@/components/feed-preview/meta/types";
import { MetaFeedContent } from "./components/meta-feed-content";

interface MetaFeedResponse {
  listings: ListingElement[];
}

async function getMetaFeed(): Promise<MetaFeedResponse | null> {
  try {
    const response = await fetch(
      'https://wander-growth.onrender.com/hotel_feeds/meta?static-only=true',
      {
        next: {
          revalidate: 86400 // Cache for 24 hours (in seconds)
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const xmlText = await response.text();
    const { JSDOM } = await import('jsdom');
    const dom = new JSDOM(xmlText);
    const xmlDoc = dom.window.document;
    
    const data = xmlToJson(xmlDoc.documentElement) as XMLObject;
    const feed = data.BODY as XMLObject;
    
    // Get the LISTINGS array
    const listings = feed.LISTINGS as XMLObject;
    const listingElements = Array.isArray(listings.LISTING) 
      ? listings.LISTING as XMLObject[]
      : [listings.LISTING as XMLObject];

    // Transform listings into our expected format with proper URL handling
    const transformedListings = listingElements.map(transformListing);

    return {
      listings: transformedListings
    };
  } catch (error) {
    console.error('Error fetching meta feed:', error);
    return null;
  }
}

function getUniqueStatuses(listings: ListingElement[]): (string | null)[] {
  const statuses = new Set(listings.map(listing => listing.STATUS || null));
  return Array.from(statuses);
}

export default async function MetaFeedPage() {
  const metaFeed = await getMetaFeed();
  
  if (!metaFeed) {
    return (
      <div className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-600">
              Unable to load property listings from Meta feed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const statuses = getUniqueStatuses(metaFeed.listings);

  return <MetaFeedContent initialListings={metaFeed.listings} initialStatuses={statuses} />;
}
