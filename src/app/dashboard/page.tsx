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
      <div className="">
        <div>
          <h1 className="">DASHBOARD</h1>
        </div>
        <div>
          <h1 className="">signed in as {session!.user!.email}</h1>
        </div>
        <Link className="" href="/customers" >
          Customers
        </Link>
      </div>
    </>
  );
}
