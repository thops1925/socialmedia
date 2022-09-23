import React from 'react';
import { video } from '../../Type/videoProps';
import { GoVerified } from 'react-icons/go';
import Link from 'next/link';
import Image from 'next/image';
import CommentSection from '../details/CommentSection';

const VideoCard = ({ post }: { post: video }) => {
  return (
    <div className="flex flex-col border-b-2 border-gray-200 border-2 rounded-md w-full">
      <div>
        <div className="flex gap-3 p-2 border-b-2 mb-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:16 w-16 h-16 border-2 justify-center border-blue-600 rounded-full">
            <Link href={`/profile/${post._id}`}>
              <>
                <Image layout="responsive" alt="profile" width={120} height={120} className="rounded-full" src={post.postedBy?.image} />
              </>
            </Link>
          </div>
          <div>
            <Link href={`/profile/${post.postedBy._id}`}>
              <div className="flex flex-col gap-2">
                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                  {post.postedBy.userName}
                  <GoVerified className="text-[#EA5666] text-md" />
                </p>
                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">{post.postedBy.userName}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-center item-center ">
        <div className="w-[650px] ">
          <Link href={`/detail/${post._id}`}>
            <video
              // className="w-full h-[400px] object-fit rounded-md cursor-pointer"
              loop
              controls
              muted
              className="lg:w-[700px] h-[400px] md:h-[500px] lg:h-[630px]  rounded-2xl  cursor-pointer bg-black m-auto "
              src={post.video.asset.url}
            ></video>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
