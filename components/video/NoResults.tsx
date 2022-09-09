import React from 'react';

interface IProps {
  text: string;
}
const NoResults: React.FC<IProps> = ({ text }) => {
  return <div>NoResults</div>;
};

export default NoResults;
