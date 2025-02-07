'use client';

// import { signIn } from 'next-auth/react';
import Image from 'next/image';
import GoogleLogo from '../../../public/googleLogo.svg'

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-default">
      <div className="flex flex-col max-w-md w-full gap-large p-large bg-white rounded-lg shadow">
        <div className="flex flex-col text-center gap-xSmall">
          <h2 className="text-3xl font-bold text-text-dark">
            Welcome!
          </h2>
          <p className="text-sm text-text-light">
            Please sign in to continue
          </p>
        </div>

        <button
        //   onClick={() => signIn('google', { callbackUrl: '/' })}
          className={`
w-full 
flex 
items-center justify-center 
gap-3 px-4 py-2 
border border-gray-300 
rounded-md shadow-sm 
text-sm font-medium text-gray-700 
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
    </div>
  );
}
