import { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import { video } from '../../Type/videoProps';
import { GoVerified } from 'react-icons/go';
import Link from 'next/link';
import Image from 'next/image';

interface IProps {
  post: video;
}
const VideoCard: NextPage<IProps> = ({ post }) => {
  const vidRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:16 w-10 h-10">
            <Link href="/">
              <Image layout="responsive" alt="profile" width={62} height={62} className="rounded-full" src={post.postedBy?.image} />
            </Link>
          </div>
          <div>
            <Link href="/">
              <div className="flex items-center gap-2">
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

      <div className="lg:ml-20 flex gap-4  relative ">
        <div>
          <Link href={`/detail/${post._id}`}>
            <video
              loop
              controls
              muted
              ref={vidRef}
              className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-200 rounded-2xl  cursor-pointer bg-gray-200 m-auto"
              src={post.video.asset.url}
            ></video>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
