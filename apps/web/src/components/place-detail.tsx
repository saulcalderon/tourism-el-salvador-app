'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { fetchPlace } from '@/lib/api';
import { LikeButton } from '@/components/like-button';
import useSWR from 'swr';
import { PlaceApiResponse } from '@/lib/definitions';

type PlaceDetailProps = {
  initialPlace: PlaceApiResponse;
};

export function PlaceDetail({ initialPlace }: PlaceDetailProps) {
  const { data: place = initialPlace } = useSWR(
    `places/${initialPlace.id}`,
    () => fetchPlace(initialPlace.id),
    {
      fallbackData: initialPlace,
    },
  );

  return (
    <div className="flex flex-col items-center">
      <Card className="mx-4 md:mx-10 bg-white rounded-none border-none shadow-none max-w-5xl w-full">
        <CardContent className="px-4 md:px-10 py-6 md:py-10">
          <div className="flex flex-col gap-6 md:gap-10">
            <div className="relative w-full h-[250px] md:h-[400px] overflow-hidden rounded-lg">
              <Image
                src={place?.url || ''}
                alt={place?.name || ''}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative">
              <h1 className="text-3xl md:text-5xl font-bold text-center">{place?.name}</h1>
              <LikeButton likesCount={place?.likesCount || 0} placeId={place?.id || ''} />
            </div>
            <div className="flex flex-col gap-4 md:gap-8">
              <p className="text-lg md:text-2xl text-gray-500">{place?.description}</p>
              <p className="text-base md:text-xl text-gray-500">{place?.address}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
