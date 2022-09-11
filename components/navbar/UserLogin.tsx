import React, { useState, useEffect } from 'react';

import { GoogleLogin, googleLogout } from '@react-oauth/google';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineUpload } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import useAuthStore from '../../store/authStore';
import { userDetail } from '../../Type/userDetail';
import { createOrGetUser } from '../../utils';

const UserLogin = () => {
  const [userAdd, setAddUser] = useState<userDetail | null>();

  const { userProfile, setUser, removeUser } = useAuthStore();

  useEffect(() => {
    setAddUser(userProfile);
  }, [userProfile]);

  return (
    <div>
      {userAdd ? (
        <div className="flex gap-5 md:gap-10">
          {userAdd?.image && (
            <Link href={`/profile/${userAdd._id}`}>
              <div className="w-10 h-10 md:w-12 md:h-12">
                <Image alt="profile" width={40} height={40} className="rounded-full cursor-pointer " src={userAdd.image} />
              </div>
            </Link>
          )}
          <Link href="upload">
            <button className=" md:px-4 text-md font-semibold flex items-center gap-2">
              <AiOutlineUpload className="text-2xl" />
              <span className="hidden md:block">Upload</span>
            </button>
          </Link>
          <button
            type="button"
            onClick={() => {
              googleLogout();
              removeUser();
            }}
          >
            <FiLogOut className="text-2xl" />
          </button>
        </div>
      ) : (
        <GoogleLogin onSuccess={(credentialResponse) => createOrGetUser(credentialResponse, setUser)} />
      )}
    </div>
  );
};

export default UserLogin;
