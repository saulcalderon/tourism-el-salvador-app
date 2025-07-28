import Image from 'next/image';
import PlaceList from '@/components/place-list';

export default function PlacesPage() {
  return (
    <div className="min-h-screen">
      <div className="relative w-full h-[40vh] md:h-[60vh] lg:h-[70vh] xl:h-[700px] overflow-hidden">
        <Image
          src="/image-1.png"
          alt="El Salvador Tourism - Beautiful landscape showcasing the natural beauty of El Salvador"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      <div className="relative w-full h-[50px] md:h-[60px] overflow-hidden">
        <Image
          src="/image-3.png"
          alt="El Salvador tourism banner with traditional patterns"
          fill
          className="object-cover"
        />
      </div>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <PlaceList />
        </div>
      </main>
    </div>
  );
}
