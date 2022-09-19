import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import GoogleLogin from 'react-google-login';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';
import SideBarFooter from './SideBarFooter';
import UserLogin from './UserLogin';
import useAuthStore from '../../store/authStore';

const SideBar = ({ showSideBar, setShowSideBar }: { showSideBar: boolean; setShowSideBar: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { userProfile } = useAuthStore();
  const normalLink = 'flex items-center mt-2 hover:bg-primary justify-center xl:justify-start cursor-pointer font-semibold text-black rounded';
  // const userProfile = false;
  return (
    <div className="flex flex-col items-center">
      {/* <div className="block xl:hidden  justify-center mt-3 p-4 text-xl" onClick={() => setShowSideBar((prev) => !prev)}>
        {showSideBar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div> */}
      {showSideBar && (
        <div className="xl:w-400  xl:border-0 w-20 flex flex-col justify-start mb-10 md:justify-center">
          <div className="xl:border-b-2 border-gray-200 xl:pb-4">
            <Link href={`/profile/${userProfile?._id}`}>
              <div className={normalLink}>
                <p className="text-2xl p-4">
                  <AiFillHome />
                </p>
                <span className="text-xl hidden xl:block">{userProfile?.userName}</span>
              </div>
            </Link>
          </div>
          <Discover />
          <SuggestedAccounts />
          <SideBarFooter />
        </div>
      )}
    </div>
  );
};

export default SideBar;
