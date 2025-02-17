import Image from 'next/image';
import { ListingElement } from './types';

interface MetaCardProps {
  listing: ListingElement;
}

function isValidListing(listing: ListingElement): boolean {
  const requiredFields = [
    'ID',
    'NAME',
    'BRAND',
    'CATEGORY',
    'DESCRIPTION',
    'NUMBER_OF_ROOMS',
    'STAR_RATING',
    'BASE_PRICE',
    'PRICE',
    'STATUS',
    'COUNTRY',
    'ADDRESS',
  ];

  return requiredFields.every(field => {
    const value = listing[field as keyof ListingElement];
    return value !== undefined && value !== null;
  });
}

function DebugCard({ listing }: MetaCardProps) {
  return (
    <div className="flex flex-col bg-white rounded-lg border border-red-200 p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-red-600 mb-1">Invalid Listing Data</h3>
        <p className="text-sm text-red-500">This listing has missing or invalid data</p>
      </div>
      <pre className="text-xs bg-gray-50 p-4 rounded overflow-auto max-h-96">
        {JSON.stringify(listing, null, 2)}
      </pre>
    </div>
  );
}

export function MetaCard({ listing }: MetaCardProps) {
  if (!isValidListing(listing)) {
    return <DebugCard listing={listing} />;
  }

  const [street, city, zipCode, state] = listing?.ADDRESS?.COMPONENT || [];

  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numPrice);
  };

  return (
    <div className="flex flex-col bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{listing.NAME}</h3>
            <p className="text-sm text-gray-500">{listing.BRAND} • {listing.CATEGORY}</p>
          </div>
          <span className={`px-3 py-1 text-xs rounded-full uppercase font-bold ${
            listing.STATUS === 'active' ? 'bg-green-100 text-green-800 border border-green-500' :
            listing.STATUS === 'archived' ? 'bg-gray-100 text-gray-800 border border-gray-500' :
            'bg-yellow-100 text-yellow-800 border border-yellow-500'
          }`}>
            {listing.STATUS}
          </span>
        </div>
        
        <div className="flex gap-4 text-sm text-gray-600">
          <div>
            <p className="font-medium text-gray-900">Price</p>
            <div className="flex items-baseline gap-1">
              <p>{formatPrice(listing.PRICE)}</p>
              {listing.PRICE !== listing.BASE_PRICE && (
                <p className="text-xs line-through text-gray-400">
                  {formatPrice(listing.BASE_PRICE)}
                </p>
              )}
            </div>
          </div>
          <div>
            <p className="font-medium text-gray-900">Rooms</p>
            <p>{listing.NUMBER_OF_ROOMS}</p>
          </div>
          <div>
            <p className="font-medium text-gray-900">Rating</p>
            <p>★ {listing.STAR_RATING}</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        {listing.images && listing.images.length > 0 ? (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Images ({listing.images.length})</h4>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {listing.images.map((imageUrl, index) => (
                <div 
                  key={imageUrl} 
                  className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group"
                >
                  <Image
                    src={imageUrl.replace('fullres', '640')}
                    alt={`${listing.NAME} - Image ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 33vw, 200px"
                    className="object-cover transition-transform group-hover:scale-105"
                    // loading={index < 6 ? "eager" : "lazy"}
                    quality={70}
                  />
                  <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/50 rounded text-xs text-white">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-yellow-700">No images available for this property</p>
          </div>
        )}

        <div className="flex flex-col">
          <h4 className="font-medium text-gray-900 mb-2">Location</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>{street}</p>
            <p>{city && state ? `${city}, ${state} ${zipCode}` : ''}</p>
            <p>{listing.COUNTRY}</p>
            <p className="text-xs text-gray-500">
              {listing.LATITUDE}, {listing.LONGITUDE}
            </p>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2 line-clamp-2">{listing.DESCRIPTION}</p>
            {listing.propertyUrl && (
              <a
                href={listing.propertyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                View on Wander
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
