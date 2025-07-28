import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceApiResponse } from '@/lib/definitions';
import { LikeButton } from './like-button';

type PlaceCardProps = {
  place: PlaceApiResponse;
  onDelete: (placeId: string) => void;
};

export function PlaceCard({ place, onDelete }: PlaceCardProps) {
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden bg-white shadow-lg p-0">
      <Image
        src={place.url}
        alt={place.name}
        width={400}
        height={250}
        className="w-full h-48 object-cover"
      />

      <CardContent className="px-6">
        <div className="relative">
          <h2 className="text-2xl text-center font-bold text-gray-900 mb-4 px-10">
            {place.name}
          </h2>
          <LikeButton likesCount={place.likesCount} placeId={place.id} />
        </div>

        <p className="text-gray-700 text-base font-medium leading-relaxed mb-8 line-clamp-3">
          {place.description}
        </p>
        <p className="text-gray-600 text-sm">{place.address}</p>
      </CardContent>

      <CardFooter className="px-6 pb-6 pt-0 flex flex-col gap-3 mt-auto">
        <Link
          href={`/places/${place.id}`}
          className="text-gray-600 text-sm font-medium hover:text-gray-800 transition-colors"
        >
          Ver más
        </Link>
        <Button
          onClick={() => onDelete(place.id)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3"
          size="lg"
        >
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  );
}
