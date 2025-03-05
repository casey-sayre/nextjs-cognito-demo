'use server';

import { auth, CognitoSession } from "@/auth";
import { redirect } from 'next/navigation'

const API_GATEWAY_BASE_URL = 'https://acd449yz21.execute-api.us-east-1.amazonaws.com/prod'
const API_ENDPOINT = `${API_GATEWAY_BASE_URL}/customers`


export async function callApiGateway() {
  'use server';
  const session = await auth() as CognitoSession;

  const token = session?.idToken;

  if (!token) {
    redirect('/sign-in')
  }

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'GET', // Or POST, PUT, DELETE
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Gateway response:', data);
    // Handle the response data
  } catch (error) {
    console.error('Error calling API Gateway:', error);
    // Handle the error
  }
}
