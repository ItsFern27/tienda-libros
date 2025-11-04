import { StoreCard } from '../card/store-card';

interface StoreInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  schedule: string[];
}

export function StoresList() {
  const imageUrl = 'https://cdeyc.com/wp-content/uploads/2024/11/boo-1024x683.jpg';

  const stores: StoreInfo[] = [
    {
      name: 'Librería Diagonal',
      address: 'Av. Oscar R. Benavides (Ex Diagonal) 500, Miraflores',
      phone: '01242-2798/993516845',
      email: 'diagonal@ibero.com.pe',
      schedule: [
        'Domingo: 10:00 am - 09:00 pm',
        'Lunes a Jueves: 09:00 am-09:00 pm',
        'Viernes a Sábado: 09:00 am - 10:00 pm'
      ]
    },
    {
      name: 'Librería Larco',
      address: 'Av. Larco 199, Miraflores',
      phone: '01445-5520/993513516',
      email: 'Marco@ibero.com.pe',
      schedule: [
        'Domingo: 10:00 am-09:00 pm',
        'Lunes a Sábado: 09:00 am - 10:00 pm'
      ]
    },
    {
      name: 'Librería Centro',
      address: 'Jr. Cailloma 843, Lima 15001',
      phone: '01242-2798/935162657',
      email: 'diagonal@ibero.com.pe',
      schedule: [
        'Domingo: 10:00 am - 09:00 pm',
        'Lunes a Jueves: 09:00 am-09:00 pm',
        'Viernes a Sábado: 09:00 am - 10:00 pm'
      ]
    },
    {
      name: 'Librería San Isidro',
      address: 'Av. Dos de Mayo 1690, San Isidro 15076',
      phone: '01242-2798/993351657',
      email: 'diagonal@ibero.com.pe',
      schedule: [
        'Domingo: 10:00 am - 09:00 pm',
        'Lunes a Jueves: 09:00 am-09:00 pm',
        'Viernes a Sábado: 09:00 am - 10:00 pm'
      ]
    }
  ];

  return (
    <div className='flex justify-center w-full mt-8 mb-8'>
      <div className='grid grid-cols-2 gap-x-15 gap-y-8 max-w-5xl px-4'>
        {stores.map((store, index) => (
          <StoreCard key={index} storeInfo={store} imageUrl={imageUrl} />
        ))}
      </div>
    </div>
  );
}

