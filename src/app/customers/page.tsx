'use client';

import { useTransition } from 'react';
import { callApiGateway } from './actions';

const Customers: React.FC = () => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await callApiGateway();
    });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div>
          <h1 className="text-4xl font-bold text-blue-500">CUSTOMERS</h1>
        </div>
        <div>
          <button onClick={handleClick} disabled={isPending} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {isPending ? 'Loading...' : 'Get Customers'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Customers;