import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { GoVerified } from 'react-icons/go';
import useAuthStore from '../../store/authStore';

const SuggestedAccounts = () => {
  const [user, setUser] = useState<any>(null);
  const { allUsers, fetchaAllusers, userProfile } = useAuthStore();

  useEffect(() => {
    fetchaAllusers();
    setUser(userProfile);
  }, [fetchaAllusers, userProfile]);
  if (!user) return null;
  return (
    <div className="xl:border-b-2">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">Suggested Accounts</p>
      <div className="flex flex-col items-start justify-center">
        {allUsers.slice(0, 6).map((user) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className="flex gap-3 p-2 font-semibold rounded cursor-pointer">
              <div className="w-8 h-8">
                <Image src={user.image} alt="user" className=" rounded-full" height={34} width={34} layout="responsive" />
              </div>
              <div className="hidden xl:block">
                <p className="flex gap-1 items-center text-md font-bold text-primary lowercase ">
                  {user.userName.replaceAll(' ', '')}
                  <GoVerified className="text-blue-400" />
                </p>
                <p>
                  <span className="text-gray-400 capitalize text-xs">{user.userName}</span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedAccounts;
