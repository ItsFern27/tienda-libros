
interface StoreInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  schedule: string[];
}

interface StoreCardProps {
  storeInfo: StoreInfo;
  imageUrl: string;
}

export function StoreCard({ storeInfo, imageUrl }: StoreCardProps) {
  return (
    <div className='flex flex-col border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white'>
      <div className='flex-1 min-h-[200px]'>
        <img 
          src={imageUrl}
          alt={storeInfo.name}
          className='w-full h-full object-cover'
        />
      </div>
      <div className='flex-1 p-6 bg-white'>
        <div className='space-y-3'>
          <h3 className='font-bold text-xl text-gray-800 mb-4'>{storeInfo.name}</h3>
          
          <div className='flex items-center gap-2 text-gray-700'>
            <span className='text-lg'>📍</span>
            <p className='text-sm'>{storeInfo.address}</p>
          </div>
          
          <div className='flex items-center gap-2 text-gray-700'>
            <span className='text-lg'>📞</span>
            <p className='text-sm'>{storeInfo.phone}</p>
          </div>
          
          <div className='flex items-center gap-2 text-gray-700'>
            <span className='text-lg'>✉️</span>
            <p className='text-sm'>{storeInfo.email}</p>
          </div>
          
          <div className='mt-4 pt-3 border-t border-gray-200'>
            <div className='flex items-center gap-2 mb-2'>
              <span className='text-lg'>🕐</span>
              <p className='font-bold text-sm text-gray-800'>Horario de atención:</p>
            </div>
            <div className='ml-6 space-y-1'>
              {storeInfo.schedule.map((schedule, index) => (
                <p key={index} className='text-xs text-gray-600'>{schedule}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

