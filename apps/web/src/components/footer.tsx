import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="absolute bottom-0 w-full h-[40px] md:h-[50px] overflow-hidden">
      <Image
        src="/image-3.png"
        alt="El Salvador tourism banner with traditional patterns"
        fill
        className="object-cover"
      />
    </footer>
  );
}
