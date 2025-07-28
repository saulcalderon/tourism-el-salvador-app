'use client';

import useSWR, { mutate } from 'swr';
import { PlaceCard } from './place-card';
import { fetchPlaces, deletePlace } from '@/lib/api';
import { toast } from 'sonner';

export default function PlaceList() {
  const {
    data: places,
    error,
    isLoading,
  } = useSWR('places', fetchPlaces, {
    refreshInterval: 5000,
  });

  const handleDelete = async (placeId: string) => {
    try {
      await deletePlace(placeId);
      mutate('places');
    } catch (error) {
      console.error('Failed to delete place:', error);
      toast.error('Error al eliminar el lugar. Por favor intenta de nuevo.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-gray-600">Cargando lugares...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-red-600">
          Error al cargar los lugares. Por favor intenta de nuevo.
        </div>
      </div>
    );
  }

  if (!places || places.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-gray-600">No hay lugares disponibles.</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {places.map((place) => (
        <PlaceCard key={place.id} place={place} onDelete={handleDelete} />
      ))}
    </div>
  );
}
