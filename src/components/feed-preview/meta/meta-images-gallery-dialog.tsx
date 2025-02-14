'use client';

import * as React from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MetaImagesGalleryDialogProps {
  images: string[];
  listingName: string;
  children: React.ReactNode;
}

export function MetaImagesGalleryDialog({ 
  images, 
  listingName,
  children 
}: MetaImagesGalleryDialogProps) {
  const [open, setOpen] = React.useState(false);

  const optimizeImageUrl = (url: string): string => {
    return url.replace('fullres', '640');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-5xl p-0 h-[90vh] flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">{listingName}</h2>
            <p className="text-sm text-gray-500">{images.length} images</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div 
                key={image} 
                className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 cursor-pointer"
              >
                <Image
                  src={optimizeImageUrl(image)}
                  alt={`${listingName} - Image ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 640px"
                  quality={75}
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  loading={index < 4 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 