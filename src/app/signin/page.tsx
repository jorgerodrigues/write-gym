'use client';

// import { signIn } from 'next-auth/react';
import Image from 'next/image';
import GoogleLogo from '../../../public/googleLogo.svg'
import { Card } from '@/components/Card';

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-default">
        <Card className='flex flex-col gap-small max-w-[500px] h-[200px] items-center'>
        <div className="flex flex-col text-center gap-xSmall">
          <h2 className="text-3xl font-bold text-text-dark">
            Welcome!
          </h2>
          <p className="text-sm text-text-light">
            Please sign in to continue
          </p>
        </div>
        <div className='flex flex-1 w-full items-center justify-center'>
        <button
        //   onClick={() => signIn('google', { callbackUrl: '/' })}
          className={`
flex 
w-[400px]
items-center justify-center 
gap-3 p-2 
border border-gray-300 
rounded-md shadow 
text-sm 
bg-white hover:bg-gray-50 
focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            `}
        >
          <Image
            src={GoogleLogo}
            alt="Google logo"
            width={20}
            height={20}
          />
          Sign in with Google
        </button>
        </div>

    </Card>
    </div>
  );
}
