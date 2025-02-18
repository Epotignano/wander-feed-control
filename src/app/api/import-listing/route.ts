import { NextResponse } from 'next/server';
// import { createClient } from '@supabase/supabase-js';
// import { parseStringPromise } from 'xml2js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
// const supabase = createClient(supabaseUrl, supabaseKey);

// interface Listing {
//   ID: string;
//   images?: {
//     image: string | string[];
//   };
//   // Add other listing properties as needed
// }

// interface PropertyData {
//   id: string;
//   // Add other property fields as needed
// }

// interface PropertyImage {
//   image_url: string;
//   use_in_ads: boolean;
//   property_id: string;
// }

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { xmlUrl, testMode = false } = body;

//     console.log('Processing XML URL:', xmlUrl);
//     console.log('Test mode:', testMode);

//     if (!xmlUrl) {
//       console.error('Missing XML URL in request body');
//       return NextResponse.json({ error: 'XML URL is required' }, { status: 400 });
//     }

//     console.log('Fetching XML from URL...');
//     const xmlResponse = await fetch(xmlUrl);
//     console.log('XML fetch response status:', xmlResponse.status);
    
//     const xmlText = await xmlResponse.text();
//     console.log('Received XML content length:', xmlText.length);
//     console.log('First 200 characters of XML:', xmlText.substring(0, 200));

//     console.log('Parsing XML...');
//     const parsedXml = await parseStringPromise(xmlText, { explicitArray: false });
//     console.log('XML successfully parsed');

//     const listings = Array.isArray(parsedXml.listings.listing)
//       ? parsedXml.listings.listing
//       : [parsedXml.listings.listing];
//     console.log(`Found ${listings.length} listings to process`);

//     if (testMode) {
//       // In test mode, just log the structure of the first listing
//       const sampleListing = listings[0];
//       console.log('Sample listing structure:', JSON.stringify(sampleListing, null, 2));
      
//       // Log summary of all listings
//       const listingSummary = listings.map((listing: Listing) => ({
//         id: listing.ID,
//         imageCount: listing.images ? (Array.isArray(listing.images.image) ? listing.images.image.length : 1) : 0,
//         fields: Object.keys(listing)
//       }));
      
//       return NextResponse.json({
//         message: 'Test mode - parsed data summary',
//         totalListings: listings.length,
//         sampleListing,
//         listingSummary,
//         xmlStructure: {
//           availableFields: Object.keys(sampleListing),
//           hasImages: !!sampleListing.images,
//           imageStructure: sampleListing.images ? typeof sampleListing.images.image : null
//         }
//       });
//     }

//     console.log('Beginning to process listings...');
//     const results = await Promise.all(listings.map(async (listing: Listing, index: number) => {
//       console.log(`Processing listing ${index + 1}/${listings.length}:`, listing.ID);
      
//       const propertyData: PropertyData = {
//         id: listing.ID,
//         // ... map additional property fields
//       };
//       console.log('Prepared property data:', propertyData);

//       console.log(`Upserting property ${propertyData.id} to database...`);
//       const { error: propertyError } = await supabase
//         .from('Property')
//         .upsert(propertyData, { onConflict: 'id' });

//       if (propertyError) {
//         console.error(`Error upserting property ${propertyData.id}:`, propertyError);
//         throw propertyError;
//       }
//       console.log(`Successfully upserted property ${propertyData.id}`);

//       if (listing.images && listing.images.image) {
//         const images = Array.isArray(listing.images.image)
//           ? listing.images.image
//           : [listing.images.image];
//         console.log(`Processing ${images.length} images for property ${propertyData.id}`);

//         await Promise.all(images.map(async (imageUrl: string, imgIndex: number) => {
//           console.log(`Processing image ${imgIndex + 1}/${images.length} for property ${propertyData.id}`);
//           const propertyImageData: PropertyImage = {
//             image_url: imageUrl,
//             use_in_ads: false,
//             property_id: propertyData.id,
//           };

//           const { error: imageError } = await supabase
//             .from('Property_Images')
//             .upsert(propertyImageData, { onConflict: 'image_url' });

//           if (imageError) {
//             console.error(`Error upserting image for property ${propertyData.id}:`, imageError);
//             throw imageError;
//           }
//           console.log(`Successfully upserted image ${imgIndex + 1} for property ${propertyData.id}`);
//         }));
//       } else {
//         console.log(`No images found for property ${propertyData.id}`);
//       }

//       console.log(`Completed processing listing ${index + 1}/${listings.length}`);
//       return propertyData.id;
//     }));

//     console.log('All listings processed successfully:', results);
//     return NextResponse.json({ message: 'Listings imported successfully', importedIds: results });
//   } catch (error) {
//     console.error('Error importing listings:', error);
//     if (error instanceof Error) {
//       console.error('Error details:', {
//         message: error.message,
//         stack: error.stack,
//         name: error.name
//       });
//     }
//     return NextResponse.json({ error: 'Failed to import listings' }, { status: 500 });
//   }
// } 


export async function GET() {
  return NextResponse.json({ message: 'Hello, world!' });
}