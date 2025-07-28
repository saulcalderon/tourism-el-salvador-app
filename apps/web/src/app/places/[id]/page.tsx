import { fetchPlace } from '@/lib/api';
import { PlaceDetail } from '@/components/place-detail';
import Footer from '@/components/footer';

export default async function PlaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const place = await fetchPlace(id);

  if (!place) {
    return (
      <div className="flex-1 flex items-center justify-center">
        Lugar no encontrado
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <PlaceDetail initialPlace={place} />
      </div>

      <div className="relative w-full h-[50px] md:h-[60px] overflow-hidden mt-8 md:mt-12">
        <Footer />
      </div>
    </div>
  );
}
