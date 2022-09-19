import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';
import SideBarFooter from './SideBarFooter';
import useAuthStore from '../../store/authStore';
import { useRouter } from 'next/router';

const SideBar = () => {
  const { userProfile } = useAuthStore();
  const router = useRouter();
  const [post, setPost] = useState(userProfile);

  useEffect(() => {
    setPost(userProfile);
  }, [userProfile]);

  const normalLink = 'flex items-center mt-2 hover:bg-primary justify-center xl:justify-start cursor-pointer font-semibold text-black rounded';
  return (
    <div className="flex flex-col items-center">
      <div className="xl:w-400  xl:border-0 w-15 flex flex-col justify-start mb-10 md:justify-center  ">
        <div className="xl:border-b-2 border-gray-200 xl:pb-4">
          <Link href={`/profile/${post?._id || router.push('/')}`}>
            <div className={normalLink}>
              <p className="text-2xl p-4">
                <AiFillHome />
              </p>
              <span className="text-xl hidden xl:block">{post?.userName || 'Welcome'}</span>
            </div>
          </Link>
        </div>
        <Discover />
        <SuggestedAccounts />
        <SideBarFooter />
      </div>
    </div>
  );
};

export default SideBar;
