import { StoreCard } from '../card/store-card';

interface StoreInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  schedule: string[];
  imageUrl: string;
}

export function StoresList() {
  const stores: StoreInfo[] = [
    {
      name: 'Librería Diagonal',
      address: 'Av. Oscar R. Benavides (Ex Diagonal) 500, Miraflores',
      phone: '01242-2798/993516845',
      email: 'diagonal@ibero.com.pe',
      schedule: [
        'Lunes a Jueves: 09:00 am-09:00 pm',
        'Viernes a Sábado: 09:00 am - 10:00 pm',
        'Domingo: 10:00 am - 09:00 pm'
      ],
      imageUrl: 'https://cdeyc.com/wp-content/uploads/2024/11/boo-1024x683.jpg'
    },
    {
      name: 'Librería Larco',
      address: 'Av. Larco 199, Miraflores',
      phone: '01445-5520/993513516',
      email: 'Marco@ibero.com.pe',
      schedule: [
        'Lunes a Sábado: 09:00 am - 10:00 pm',
        'Domingo: 10:00 am-09:00 pm'
      ],
      imageUrl: 'https://i.blogs.es/d65aaa/akiracomics_2/1366_2000.jpg'
    },
    {
      name: 'Librería Centro',
      address: 'Jr. Cailloma 843, Lima 15001',
      phone: '01242-2798/935162657',
      email: 'diagonal@ibero.com.pe',
      schedule: [
        'Lunes a Jueves: 09:00 am-09:00 pm',
        'Viernes a Sábado: 09:00 am - 10:00 pm',
        'Domingo: 10:00 am - 09:00 pm'
      ],
      imageUrl: 'https://connectionsbyfinsa.com/wp-content/uploads/2017/10/studio-arthur-casas-saraiva-bookstore.jpg'
    },
    {
      name: 'Librería San Isidro',
      address: 'Av. Dos de Mayo 1690, San Isidro 15076',
      phone: '01242-2798/993351657',
      email: 'diagonal@ibero.com.pe',
      schedule: [
        'Lunes a Jueves: 09:00 am-09:00 pm',
        'Viernes a Sábado: 09:00 am - 10:00 pm',
        'Domingo: 10:00 am - 09:00 pm'
      ],
      imageUrl: 'https://f.rpp-noticias.io/2023/04/21/1418542000532856wjpg.jpg'
    }
  ];

  return (
    <div className='flex justify-center w-full mt-8 mb-8'>
      <div className='grid grid-cols-2 gap-x-15 gap-y-8 max-w-5xl px-4'>
        {stores.map((store, index) => (
          <StoreCard key={index} storeInfo={store} imageUrl={store.imageUrl} />
        ))}
      </div>
    </div>
  );
}

