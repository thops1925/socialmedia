import { NextPage } from 'next';
import React from 'react';
import { video } from '../../Type/videoProps';
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';
import { BsFillPlayFill, BsPlay, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import Link from 'next/link';
import Image from 'next/image';

interface IProps {
  post: video;
  key: string;
}
const VideoCard: NextPage<IProps> = ({ post, key }) => {
  console.log(post);
  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:16 w-10 h-10">
            <Link href="/">
              <>
                <Image layout="responsive" alt="profile" width={62} height={62} className="rounded-full" src={post.postedBy.image} />
              </>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
