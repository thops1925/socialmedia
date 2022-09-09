import type { NextPage } from 'next';
import axios from 'axios';
import { video } from '../Type/videoProps';
import VideoCard from '../components/video/VideoCard';
import { NoResults } from '../components/video/NoResults';

interface IProps {
  videos: video[];
}

const Home: React.FC<IProps> = ({ videos }) => {
  return (
    <div className="flex  flex-col gap-10 video h-full">
      {videos.length ? videos.map((video: video) => <VideoCard post={video} key={video._id} />) : <NoResults text={'No videos'} />}
    </div>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(`http://localhost:3000/api/post`);
  return {
    props: { videos: data },
  };
};

export default Home;
