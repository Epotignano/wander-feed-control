'use client';

import { useState } from 'react';
import { FeedPreviewMeta } from "@/components/feed-preview/meta";
import { ListingElement } from "@/components/feed-preview/meta/types";
import { StatusFilterClient } from "./status-filter-client";
import { Suspense } from "react";

interface MetaFeedContentProps {
  initialListings: ListingElement[];
  initialStatuses: (string | null)[];
}

function filterListingsByStatus(listings: ListingElement[], selectedStatuses: string[]): ListingElement[] {
  if (selectedStatuses.length === 0) return listings;
  
  return listings.filter(listing => {
    const status = listing.STATUS || 'null';
    return selectedStatuses.includes(status);
  });
}

export function MetaFeedContent({ initialListings, initialStatuses }: MetaFeedContentProps) {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const filteredListings = filterListingsByStatus(initialListings, selectedStatuses);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">Meta Feed Preview</h1>
          <div className="flex items-center gap-4">
            <StatusFilterClient
              title="Status"
              options={initialStatuses}
              value={selectedStatuses}
              onSelectionChange={setSelectedStatuses}
            />
          </div>
        </div>
        
        <Suspense fallback={<div>Loading...</div>}>
          <FeedPreviewMeta listings={filteredListings} />
        </Suspense>
        
        <details className="mt-8">
          <summary className="cursor-pointer text-blue-600 hover:underline">View Raw Data</summary>
          <pre className="mt-4 p-6 bg-white rounded-xl shadow-sm text-left overflow-auto max-h-96 text-sm">
            {initialListings.length > 0 && JSON.stringify(initialListings[0], null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
} 