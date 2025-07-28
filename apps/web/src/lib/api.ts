import { PlaceApiResponse, PlaceIdResponse } from './definitions';
import { CreatePlaceForm } from './schemas';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function createPlace(
  data: CreatePlaceForm,
): Promise<PlaceIdResponse> {
  const response = await fetch(`${API_BASE_URL}/places`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || `Failed to create place: ${response.status}`,
    );
  }

  return result;
}

export async function fetchPlaces(): Promise<PlaceApiResponse[]> {
  const response = await fetch(`${API_BASE_URL}/places`);

  if (!response.ok) {
    throw new Error(`Failed to fetch places: ${response.status}`);
  }

  return response.json();
}

export async function likePlace(placeId: string): Promise<PlaceIdResponse> {
  const response = await fetch(`${API_BASE_URL}/places/${placeId}/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || `Failed to like place: ${response.status}`,
    );
  }

  return result;
}

export async function deletePlace(placeId: string): Promise<PlaceIdResponse> {
  const response = await fetch(`${API_BASE_URL}/places/${placeId}`, {
    method: 'DELETE',
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || `Failed to delete place: ${response.status}`,
    );
  }

  return result;
}
