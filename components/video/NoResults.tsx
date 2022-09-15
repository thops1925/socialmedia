import { NextPage } from 'next';
import React from 'react';
import { MdInsertComment, MdOutlineVideocamOff } from 'react-icons/md';
interface IProps {
  text: string;
}
const NoResults: NextPage<IProps> = ({ text }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <p className="text-8xl">{text === 'Empty Comments' ? <MdInsertComment /> : <MdOutlineVideocamOff />}</p>
      <p className="text-2xl">{text}</p>
    </div>
  );
};

export default NoResults;
