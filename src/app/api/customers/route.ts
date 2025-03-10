// app/api/customers/route.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

const API_GATEWAY_BASE_URL = process.env.BASE_API_URL;
const API_ENDPOINT = `${API_GATEWAY_BASE_URL}/customers`;

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!token?.idToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const idToken = token.idToken;

  try {
    const response = await fetch(API_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'External API error' }, { status: response.status });
    }

    const customers = await response.json(); // Assuming the API returns a JSON array of customers
    return NextResponse.json(customers);
  } catch (error) {
    console.error('External API call error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!token?.idToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const idToken = token.idToken;

  try {
    const body = await req.json();
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'External API error' }, { status: response.status });
    }

    const newCustomer = await response.json(); // Assuming the external API returns the created customer
    return NextResponse.json(newCustomer);
  } catch (error) {
    console.error('External API call error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
