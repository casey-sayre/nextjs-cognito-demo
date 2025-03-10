// app/customers/page.tsx
'use client'; // Client component

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { redirect, useRouter } from 'next/navigation';
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

interface Customer {
  id: number;
  name: string;
  // ... other customer properties
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAddClick = () => {
    router.push('/customers/create')
  }

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await fetch('/api/customers');
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        const data = await response.json();
        setCustomers(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
  }, []);

  if (loading) {
    return <p>Loading customers...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleClick = (customer: Customer) => {
    redirect(`/customers/${customer.id}`)
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Box display="flex" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Customers
        </Typography>
        <IconButton aria-label="create" sx={{ marginLeft: '16px' }} onClick={handleAddClick}>
          <PersonAddIcon />
        </IconButton>
      </Box>
      <List>
        {customers.map((customer) => (
          <ListItem disablePadding key={customer.id}>
            <ListItemButton onClick={() => handleClick(customer)}>
              <ListItemText primary={customer.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
