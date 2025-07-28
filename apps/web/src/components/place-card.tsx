import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceApiResponse } from '@/lib/definitions';

type PlaceCardProps = {
  place: PlaceApiResponse;
  onLike: (placeId: string) => void;
  onDelete: (placeId: string) => void;
};

export function PlaceCard({ place, onLike, onDelete }: PlaceCardProps) {
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
          <button
            onClick={() => onLike(place.id)}
            className="absolute top-[-15px] right-[-10px] bg-white/95 rounded-full px-3 py-1.5 shadow-sm hover:bg-white transition-colors flex items-center gap-1"
          >
            <span className="text-sm font-medium text-gray-700">
              {place.likesCount}
            </span>
            <Heart
              className={`w-4 h-4 ${
                place.likesCount > 0
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-600'
              }`}
            />
          </button>
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
