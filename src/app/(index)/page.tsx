/*
Aqui se manda el contenido al layout
*/
import Link from 'next/link'
import { BookCard } from '../components/card/book';

export default async function Home() {
  

  return (
    <div className='flex flex-col items-start'> {/* borrar items-start para comportamiento normal de flex */}
      <h1>index main </h1>
      <Link href="/stores" className='bg-red-500'>link a stores</Link>
      <Link href="/search" className='bg-emerald-700'>link a search</Link>
      <Link href="/configuration" className='bg-blue-700'>link a conf</Link>

      <p>Componente</p>
      <BookCard/>
    </div>
  );
}