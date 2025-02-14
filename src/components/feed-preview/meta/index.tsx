import { ListingElement } from './types';
import { MetaCard } from './meta-card';

interface FeedPreviewMetaProps {
  listings: ListingElement[];
}

export function FeedPreviewMeta({ listings }: FeedPreviewMetaProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-medium text-gray-900">Meta Feed Preview</h2>
          <p className="text-sm text-gray-500">Showing {listings.length} properties from Meta feed</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            Meta Feed
          </span>
          <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
            {listings.length} items
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {listings
          .sort((a, b) => {
            if (a.STATUS === 'active' && b.STATUS !== 'active') return -1;
            if (a.STATUS !== 'active' && b.STATUS === 'active') return 1;
            return 0;
          })
          .map((listing) => (
            <MetaCard key={listing.ID} listing={listing} />
          ))}
      </div>
    </div>
  );
}
