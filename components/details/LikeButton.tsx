import { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { MdFavorite } from 'react-icons/md';
import useAuthStore from '../../store/authStore';
import { userDetail } from '../../Type/userDetail';

interface IProps {
  handleLike: () => void;
  handleDislike: () => void;
  likes: any[];
}

const LikeButton = ({ handleDislike, handleLike, likes }: IProps) => {
  const [alreadyLink, setAlreadyLink] = useState<boolean>(false);
  const [userAdd, setAddUser] = useState<userDetail | null>();
  const { userProfile } = useAuthStore();

  const filterLike = likes?.filter((item: any) => item._ref === userProfile?._id);

  useEffect(() => {
    if (filterLike?.length > 0) {
      setAlreadyLink(true);
    } else {
      setAlreadyLink(false);
    }
  }, [filterLike, likes]);

  useEffect(() => {
    setAddUser(userProfile);
  }, [userProfile]);

  return (
    <div className="gap-6">
      <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
        {alreadyLink ? (
          <div className="bg-primary rounded-full p-2 md:p-4 text-[#EA5666]" onClick={handleDislike}>
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ) : (
          <div className="bg-primary rounded-full p-2 md:p-4 " onClick={handleLike}>
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}
        <p className="text-md font-semibold ">{likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
