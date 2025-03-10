// app/create-customer/page.tsx
'use client';

import { useState } from 'react';

export default function CreateCustomerPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }), // Send customer data
      });

      if (!response.ok) {
        throw new Error('Failed to create customer');
      }

      setMessage('Customer created successfully!');
      setError('');
      setName('');
      setEmail('');

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occured");
      }
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Create Customer</h1>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <button type="submit">Create Customer</button>
      </form>
    </div>
  );
}
