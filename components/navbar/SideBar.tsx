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

const SideBar = () => {
  const [showSideBar, setShowSideBar] = useState<boolean>(true);
  const normalLink = 'flex items-center mt-2 hover:bg-primary justify-center xl:justify-start cursor-pointer font-semibold text-black rounded';
  // const userProfile = false;
  return (
    <div className="flex flex-col items-center">
      <div className="block xl:hidden  justify-center mt-3 p-4 text-xl" onClick={() => setShowSideBar((prev) => !prev)}>
        {showSideBar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSideBar && (
        <div className="xl:w-400  xl:border-0 w-20 flex flex-col justify-start mb-10 md:justify-center">
          <div className="xl:border-b-2 border-gray-200 xl:pb-4">
            <Link href="/">
              <div className={normalLink}>
                <p className="text-2xl p-4">
                  <AiFillHome />
                </p>
                <span className="text-xl hidden xl:block">For You</span>
              </div>
            </Link>
          </div>
          {/* {!userProfile && (
            <div className="px-2 py-4 hidden xl:block">
              <p className="text-gray-500">Login to like and comment on video</p>
              <div className="pr-4">
                <GoogleLogin
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="text-[#EA5666] bg-white text-lg border-[1px] border-[#EA5666] font-semibold px-6 py-3 rounded-md outline-none w-full mt-3 hover:text-white hover:bg-[#EA5666] cursor-pointer"
                    >
                      Log In
                    </button>
                  )}
                  clientId=""
                  buttonText="Login"
                  onSuccess={() => {}}
                  onFailure={() => {}}
                  cookiePolicy={'single_host_origin'}
                />
              </div>
            </div>
          )} */}

          <Discover />
          <SuggestedAccounts />
          <SideBarFooter />
        </div>
      )}
    </div>
  );
};

export default SideBar;
