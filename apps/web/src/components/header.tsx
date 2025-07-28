import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="bg-white px-10 py-5">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/image-2.png" alt="Logo" width={300} height={300} />
          </div>
          <Link href="/places/create">
            <Button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors">
              Agregar destino
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
