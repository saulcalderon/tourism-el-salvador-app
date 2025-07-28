import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PlaceForm } from '@/components/place-form';
import Footer from '@/components/footer';

export default function CreatePlacePage() {
  return (
    <div className="relative min-h-screen">
    <div className="flex flex-col items-center justify-center bg-white md:mx-20 rounded-lg">
      <Card className="max-w-2xl w-full p-2 md:p-10 h-full rounded-none border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Agregar destino turístico
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PlaceForm />
        </CardContent>
      </Card>
    </div>
    <Footer />
    </div>
  );
}
