import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import logo from '../../utils/mitch.png';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { createOrGetUser } from '../../utils';
import useAuthStore from '../../store/authStore';

const Navbar = () => {
  const { userProfile, setUser } = useAuthStore();

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-1 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <Image src={logo} alt="logo" className="cursor-pointer" layout="responsive" />
        </div>
      </Link>
      <div>Search</div>
      <div>
        {userProfile?.userName ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="border-2 rounded-full px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl" />
              </button>
            </Link>
            {userProfile.image && (
              <Link href="/profile">
                <div className="border-2 rounded-full px-1">
                  <Image alt="profile" width={35} height={35} className="rounded-full cursor-pointer " src={userProfile.image} />
                </div>
              </Link>
            )}
          </div>
        ) : (
          <GoogleLogin onSuccess={(credentialResponse) => createOrGetUser(credentialResponse, setUser)} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
