'use client';

import { Heart } from 'lucide-react';
import { likePlace } from '@/lib/api';
import { mutate } from 'swr';
import { toast } from 'sonner';

type LikeButtonProps = {
  likesCount: number;
  placeId: string;
};

export function LikeButton({ likesCount, placeId }: LikeButtonProps) {
  const handleLike = async (placeId: string) => {
    try {
      await likePlace(placeId);
      mutate('places');
      mutate(`places/${placeId}`);
    } catch (error) {
      console.error('Failed to like place:', error);
      toast.error('Error al dar like al lugar. Por favor intenta de nuevo.');
    }
  };

  return (
    <button
      onClick={() => handleLike(placeId)}
      className="absolute top-[-15px] right-[-10px] bg-white/95 rounded-full px-3 py-1.5 shadow-sm hover:bg-white transition-colors flex items-center gap-1"
    >
      <span className="text-sm font-medium text-gray-700">{likesCount}</span>
      <Heart
        className={`w-4 h-4 ${
          likesCount > 0 ? 'fill-red-500 text-red-500' : 'text-gray-600'
        }`}
      />
    </button>
  );
}
