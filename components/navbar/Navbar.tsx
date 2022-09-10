import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineLogout, AiOutlineUpload } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import logo from '../../utils/mitch.png';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { createOrGetUser } from '../../utils';
import useAuthStore from '../../store/authStore';
import { FiLogOut } from 'react-icons/fi';

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
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            {userProfile?.image && (
              <Link href="/profile">
                <div>
                  <Image alt="profile" width={40} height={40} className="rounded-full cursor-pointer " src={userProfile.image} />
                </div>
              </Link>
            )}
            <Link href="/upload">
              <button className=" md:px-4 text-md font-semibold flex items-center gap-2">
                <AiOutlineUpload className="text-2xl" />
                <span>Upload</span>
              </button>
            </Link>
            <button type="button">
              <FiLogOut className="text-2xl" />
            </button>
          </div>
        ) : (
          <GoogleLogin onSuccess={(credentialResponse) => createOrGetUser(credentialResponse, setUser)} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
