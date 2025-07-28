'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  
  const isPlacesIndex = pathname === '/places';
  const backgroundClass = isPlacesIndex ? 'bg-white' : 'bg-transparent';
  
  return (
    <header className={`${backgroundClass} px-10 py-5`}>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="hidden items-center md:block">
            <Link href="/places">
              <Image src="/image-2.png" alt="Logo" width={300} height={300} />
            </Link>
          </div>
          {isPlacesIndex ? (
            <Link href="/places/create">
              <Button className="bg-red-500 text-white italic px-6 py-2 rounded hover:bg-red-600 transition-colors">
                Agregar destino
              </Button>
            </Link>
          ) : (
            <Link href="/places">
              <Button className="bg-red-500 text-white italic px-6 py-2 rounded hover:bg-red-600 transition-colors">
                Listado de destinos
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
