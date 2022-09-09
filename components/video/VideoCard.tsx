import React from 'react';
import { video } from '../../Type/videoProps';

interface IProps {
  post: video;
}
const VideoCard: React.FC<IProps> = ({ post }) => {
  return <div>VideoCard</div>;
};

export default VideoCard;
