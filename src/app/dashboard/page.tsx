'use server';

import { auth } from "@/auth"
import Link from "next/link";
import { redirect } from 'next/navigation'


export default async function Dashboard() {
  const session = await auth();
  if (!session) {
    redirect('/sign-in')
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div>
          <h1 className="text-4xl font-bold text-blue-500">DASHBOARD</h1>
        </div>
        <div>
          <h1 className="text-xl text-black-500">signed in as {session!.user!.email}</h1>
        </div>
        <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="/customers" >
          Customers
        </Link>
      </div>
    </>
  );
}
