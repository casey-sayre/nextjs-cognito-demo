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
      <div className="">
        <div>
          <h1 className="">CUSTOMERS</h1>
        </div>
        <div>
          <button onClick={handleClick} disabled={isPending} className="">
            {isPending ? 'Loading...' : 'Get Customers'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Customers;