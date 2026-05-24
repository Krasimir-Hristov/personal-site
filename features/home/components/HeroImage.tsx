import Image from 'next/image';

// Server Component — Next.js correctly emits fetchpriority="high" and a
// <link rel="preload"> in <head> for Server Component Images with priority.
const HeroImage = () => (
  <Image
    src='/images/hero-section.png'
    alt='AI brain visualization — glowing cyan neural network'
    width={560}
    height={420}
    priority
    quality={85}
    sizes='(max-width: 1024px) calc(100vw - 4rem), (max-width: 1280px) 40vw, 560px'
    className='relative z-10 w-full h-auto object-contain'
  />
);

export default HeroImage;
