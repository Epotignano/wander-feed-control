import { ListingElement } from "@/components/feed-preview/meta/types";
import { MetaFeedContent } from "./components/meta-feed-content";
const host = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

function getUniqueStatuses(listings: ListingElement[]): (string | null)[] {
  const statuses = new Set(listings.map(listing => listing.STATUS || null));
  return Array.from(statuses);
}

async function getMetaFeed() {
  const response = await fetch(`${host}/api/feeds`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    console.error('Failed to fetch data:', response.statusText);
    return null;
  }

  return response.json();
}

export default async function MetaFeedPage() {
  try {
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
  } catch (error) {
    console.error('Error fetching meta feed:', error);
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
}