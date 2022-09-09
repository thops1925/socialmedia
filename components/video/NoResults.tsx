import { NextPage } from 'next';
import React from 'react';

interface IProps {
  text: string;
}
const NoResults: NextPage<IProps> = ({ text }) => {
  return (
    <div>
      <p>{text}</p>
    </div>
  );
};

export default NoResults;
