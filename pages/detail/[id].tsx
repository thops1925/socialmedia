import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { video } from '../../Type/videoProps';
import { BASE_URL } from '../api/post';
import { MdOutlineCancel } from 'react-icons/md';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import useAuthStore from '../../store/authStore';
import LikeButton from '../../components/details/LikeButton';
import CommentSection from '../../components/details/CommentSection';
import { userDetail } from '../../Type/userDetail';

interface IProps {
  postDetails: video;
}

const Detail = ({ postDetails }: IProps) => {
  const [userAdd, setAddUser] = useState<userDetail | null>();
  const [comment, setComment] = useState<string>('');
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false);
  const [post, setPost] = useState<video>('' as any);
  const router = useRouter();
  const videoEl = useRef<HTMLVideoElement>(null);
  const { userProfile } = useAuthStore();

  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch((error) => {
        console.error('Error attempting to play', error);
      });
  };

  useEffect(() => {
    attemptPlay();
  }, []);

  useEffect(() => {
    setAddUser(userProfile);
    setPost(postDetails);
  }, [userProfile, postDetails]);

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });
      setPost({ ...post, likes: data.likes });
    }
  };

  const addComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (userProfile) {
      if (comment) {
        setIsPostingComment(true);
        const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
          userId: userProfile._id,
          comment,
        });

        setPost({ ...post, comments: data.comments });
        setComment('');
        setIsPostingComment(false);
      }
    }
  };
  if (!post) return null;

  return (
    <div className="flex w-screen absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap z-10">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black">
        <div className="opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p className="cursor-pointer " onClick={() => router.push('/')}>
            <MdOutlineCancel className="text-white text-[35px] hover:opacity-90" />
          </p>
        </div>
        <div className="relative">
          <div className="lg:h[100vh] h-screen ">
            <video src={post?.video.asset.url} playsInline loop muted controls ref={videoEl} className="w-full h-full cursor-pointer"></video>
          </div>
        </div>
      </div>
      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
        <div className="lg:mt-10 mt-10">
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className="md:w-20 md:20 w-16 h-10 ml-4 ">
              <Link href="/">
                <>
                  <Image layout="fixed" alt="profile" width={120} height={120} className="rounded-full" src={post.postedBy.image} />
                </>
              </Link>
            </div>
            <div>
              <Link href="/">
                <div className="flex items-start gap-2 flex-col mt-5">
                  <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                    {post.postedBy.userName}
                    <GoVerified className="text-[#EA5666] text-md" />
                  </p>
                  <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">{post.postedBy.userName}</p>
                </div>
              </Link>
            </div>
          </div>
          <p className="px-10 text-gray-700 text-lg ">{post.caption}</p>
          <div className="mt-10 px-10 ">
            {userAdd && <LikeButton likes={post.likes} handleLike={() => handleLike(true)} handleDislike={() => handleLike(false)} />}
          </div>

          <CommentSection
            setComment={setComment}
            addComment={addComment}
            comment={comment}
            isPostingComment={isPostingComment}
            comments={post.comments}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;

export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);
  return {
    props: {
      postDetails: data,
    },
  };
};
