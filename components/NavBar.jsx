"use client";


import Link from "next/link";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const NavBar = () => {


  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setProvider();

  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href='/' className="flex gap-2 flex-center">
        <Image src="/assets/images/logo.svg" alt="Logo" width={30} height={30} className="object-contain" />
        <p className="logo_text">Promptonoxsis</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href='/create-prompt' className="black_btn">
              Create Post
            </Link>


            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href='/profile'>
              <Image
                src='/assets/images/userprofile.png'
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />

            </Link>
          </div>
        ) : (
          <>

            {providers && Object.values(providers).map((provider) => {
              <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                Sign In
              </button>
            })}


          </>
        )}
      </div>

      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
              <Image 
                src='/assets/images/arrow.jpeg'
                width={37}
                height={37}
                className="rounded-full"
                onClick={() => {}}
                style={{'cursor' : 'pointer'}}
              />

          </div>
        ) : (
          <>
            {providers && Object.values(providers).map((provider) => {
              <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                Sign In
              </button>
            })}


          </>
        )}
      </div>
    </nav>
  )
}

export default NavBar