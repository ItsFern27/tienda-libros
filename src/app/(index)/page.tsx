/*
Aqui se manda el contenido al layout
*/
import Link from 'next/link'
import { Carousel } from '../components/carousel/carousel';
import { BookSection } from '../components/book-components/book-section';

export default async function Home() {
  

  return (
    <div className='flex flex-col items-start'> {/* borrar items-start para comportamiento normal de flex */}
      <Carousel />

      <section className='flex flex-col gap-10 mx-auto my-8'>
        <BookSection title='Destacados'/>
        <BookSection title='Juvenil' categoriaNombre='Romance'/>
        <BookSection title='Ficción' categoriaNombre='Ficcion'/>
      </section>
    </div>
  );
}