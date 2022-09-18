import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { GoVerified } from 'react-icons/go';
import Link from 'next/link';
import axios from 'axios';

import useAuthStore from '../../store/authStore';
import { video } from '../../Type/videoProps';
import { userDetail } from '../../Type/userDetail';
import { BASE_URL } from '../api/post';

import NoResults from '../../components/video/NoResults';
import VideoCard from '../../components/video/VideoCard';

const Search = ({ videos }: { videos: video[] }) => {
  const [isAccounts, setIsAccounts] = useState(false);
  const { allUsers }: { allUsers: userDetail[] } = useAuthStore();
  const router = useRouter();
  const { searchId }: any = router.query;

  const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  const searchedAccounts = allUsers?.filter((user: userDetail) => user.userName.toLowerCase().includes(searchId.toLowerCase()));
  console.log(videos);

  return (
    <div className="w-full">
      <div className="flex gap-10 mb-10 border-b-2 border-gray-200 md:fixed z-50 bg-white w-full">
        <p className={`text-xl  font-semibold cursor-pointer ${accounts} mt-2`} onClick={() => setIsAccounts(true)}>
          Accounts
        </p>
        <p className={`text-xl font-semibold cursor-pointer ${isVideos} mt-2`} onClick={() => setIsAccounts(false)}>
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div className="md:mt-16">
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: userDetail, idx: number) => (
              <Link key={idx} href={`/profile/${user._id}`}>
                <div className=" flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-100">
                  <div className="border-2 border-blue-500 rounded-full w-12 h-12">
                    <Image width={120} height={120} className="rounded-full" alt="user-profile" src={user.image} />
                  </div>
                  <div>
                    <div>
                      <p className="flex gap-1 items-center text-lg font-bold text-primary">
                        {user.userName} <GoVerified className="text-blue-400" />
                      </p>
                      <p className="capitalize text-gray-400 text-sm">{user.userName}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`No Account Results for ${searchId}`} />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start ">
          {videos.length ? (
            videos.map((post: video, idx: number) => <VideoCard post={post} key={idx} />)
          ) : (
            <NoResults text={`No Video Results for ${searchId}`} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({ params: { searchId } }: { params: { searchId: string } }) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchId}`);
  console.log(res.data);
  return {
    props: { videos: res.data },
  };
};

export default Search;
