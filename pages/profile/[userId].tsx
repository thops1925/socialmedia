import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../api/post';
import axios from 'axios';
import { userDetail } from '../../Type/userDetail';
import { video } from '../../Type/videoProps';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import VideoCard from '../../components/video/VideoCard';
import NoResults from '../../components/video/NoResults';

interface IProps {
  data: {
    user: userDetail;
    userVideos: video[];
    userLikedVideos: video[];
  };
}
const Profile = ({ data }: IProps) => {
  const { user, userVideos, userLikedVideos } = data;

  const [showBorder, setShowBorder] = useState(false);
  const [videoList, setVideoList] = useState<video[]>([]);
  const videos = showBorder ? 'border-b-2 border-black' : 'text-gray-400';
  const likes = !showBorder ? 'border-b-2 border-black' : 'text-gray-400';
  useEffect(() => {
    if (showBorder) {
      setVideoList(userVideos);
    } else {
      setVideoList(userLikedVideos);
    }
  }, [showBorder, userVideos, userLikedVideos]);

  return (
    <>
      {!user ? (
        <NoResults text={'No Video'} />
      ) : (
        <div className="flex flex-col gap-6 md:gap-2  bg-white w-full">
          <div className="flex gap-3 p-2 font-semibold rounded cursor-pointer">
            <div className="w-16 h-16 border-2 border-blue-600 rounded-full">
              <>
                <Image src={user.image} alt="user" className=" rounded-full" height={120} width={120} layout="responsive" />
              </>
            </div>
            <div className="">
              <p className="text-2xl tracking-wider flex justify-center  gap-1 items-center text-md font-bold text-primary lowercase ">
                {user.userName.replaceAll(' ', '')}
                <GoVerified className="text-blue-400" />
              </p>
              <p>
                <span className="text-gray-400 capitalize text-xs ">{user.userName}</span>
              </p>
            </div>
          </div>
          <div className="flex gap-4 mb-2 mt-2 border-b-2 border-gray-200 bg-white w-full">
            <p className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`} onClick={() => setShowBorder(true)}>
              Videos
            </p>
            <p className={`text-xl font-semibold cursor-pointer mt-2 ${likes}`} onClick={() => setShowBorder(false)}>
              Liked
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center md-justify-start">
            {videoList.length > 0 ? (
              videoList.map((video: video, idx: number) => <VideoCard post={video} key={idx} />)
            ) : (
              <NoResults text={`No ${showBorder ? '' : 'Like'} videos yet`} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export const getServerSideProps = async ({ params: { userId } }: { params: { userId: string } }) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${userId}`);
  return {
    props: {
      data: res.data,
    },
  };
};

export default Profile;
