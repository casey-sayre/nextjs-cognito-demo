import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!token?.idToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const idToken = token.idToken;
  const customerId = (await params).id; // Get the dynamic ID from the URL

  try {
    const response = await fetch(`YOUR_EXTERNAL_API_CUSTOMER_ENDPOINT/${customerId}`, { // Replace with your API endpoint
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'External API error' }, { status: response.status });
    }

    const customer = await response.json(); // Assuming the API returns a single customer object
    return NextResponse.json(customer);
  } catch (error) {
    console.error('External API call error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
