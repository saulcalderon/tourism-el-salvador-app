import { PlaceApiResponse, PlaceIdResponse } from './definitions';
import { CreatePlaceForm } from './schemas';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function createPlace(
  data: CreatePlaceForm,
): Promise<PlaceIdResponse | null> {
  const response = await fetch(`${API_BASE_URL}/places`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    console.error(
      result.message || `Failed to create place: ${response.status}`,
    );
    return null;
  }

  return result;
}

export async function fetchPlaces(): Promise<PlaceApiResponse[]> {
  const response = await fetch(`${API_BASE_URL}/places`);

  if (!response.ok) {
    console.error(`Failed to fetch places: ${response.status}`);
    return [];
  }

  return response.json();
}

export async function fetchPlace(id: string): Promise<PlaceApiResponse | null> {
  const response = await fetch(`${API_BASE_URL}/places/${id}`);

  if (!response.ok) {
    console.error(`Failed to fetch place: ${response.status}`);
    return null;
  }

  return response.json();
}

export async function likePlace(
  placeId: string,
): Promise<PlaceIdResponse | null> {
  const response = await fetch(`${API_BASE_URL}/places/${placeId}/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();

  if (!response.ok) {
    console.error(result.message || `Failed to like place: ${response.status}`);
    return null;
  }

  return result;
}

export async function deletePlace(
  placeId: string,
): Promise<PlaceIdResponse | null> {
  const response = await fetch(`${API_BASE_URL}/places/${placeId}`, {
    method: 'DELETE',
  });

  const result = await response.json();

  if (!response.ok) {
    console.error(
      result.message || `Failed to delete place: ${response.status}`,
    );
    return null;
  }

  return result;
}
