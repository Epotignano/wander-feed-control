import { transformListing } from '@/components/feed-preview/meta/types';
import { NextResponse } from 'next/server';

import { XMLObject } from '@/lib/utils';
import { xmlToJson } from '@/lib/utils';
import { ListingElement } from '@/components/feed-preview/meta/types';

const feedServerHost = process.env.FEED_SERVER_HOST || 'http://localhost:8000';

interface FeedsResponse {
    listings?: ListingElement[];
    error?: string;
}

export async function GET(): Promise<NextResponse<FeedsResponse>> {
    try {
        console.log('Fetching meta feed...');
        const response = await fetch(
            `${feedServerHost}/hotel_feeds/meta?static-only=true`,
            {
                next: {
                    revalidate: 86400 // Cache for 24 hours (in seconds)
                }
            }
        );
        console.log('Response:', response);
        console.log('Response was ok?', response.ok);

        if (!response.ok) {
            console.error('Error fetching meta feed:', response.statusText);
            return NextResponse.json({ error: 'Failed to fetch meta feed' }, { status: response.status });
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

        return NextResponse.json({
            listings: transformedListings
        });
    } catch (error) {
        console.error('Error fetching meta feed:', error);
        return NextResponse.json({
            error: 'Internal server error'
        }, { status: 500 });
    }
}