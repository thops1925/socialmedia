import React, { useState, useEffect } from 'react';

import { GoogleLogin, googleLogout } from '@react-oauth/google';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineUpload } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import useAuthStore from '../../store/authStore';
import { userDetail } from '../../Type/userDetail';
import { createOrGetUser } from '../../utils';
import { useRouter } from 'next/router';

const UserLogin = () => {
  const [userAdd, setAddUser] = useState<userDetail | null>();
  const router = useRouter();
  const { userProfile, setUser, removeUser } = useAuthStore();

  useEffect(() => {
    setAddUser(userProfile);
  }, [userProfile]);

  return (
    <>
      {userAdd === null && (
        <GoogleLogin
          type="icon"
          onSuccess={(credentialResponse) => createOrGetUser(credentialResponse, setUser)}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      )}

      {userAdd && (
        <div className="flex justify-center items-center gap-4 mt-4  flex-col">
          {userAdd?.image && (
            <Link href={`/profile/${userAdd._id}`}>
              <div className="w-10 h-10 md:w-12 md:h-12">
                <>
                  <Image alt="profile" width={120} height={120} className="rounded-full cursor-pointer " src={userAdd.image} />
                </>
              </div>
            </Link>
          )}
          <Link href="upload">
            <button className=" md:px-4 text-md font-semibold flex items-center gap-2">
              <AiOutlineUpload className="text-3xl" />
              <span className="hidden sm:block"></span>
            </button>
          </Link>
          <button
            type="button"
            onClick={() => {
              googleLogout();
              removeUser();
              router.push('/');
            }}
          >
            <FiLogOut className="text-3xl" />
          </button>
        </div>
      )}
    </>
  );
};

export default UserLogin;
