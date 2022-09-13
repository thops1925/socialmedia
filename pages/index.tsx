import type { NextPage } from 'next';
import axios from 'axios';
import { video } from '../Type/videoProps';
import VideoCard from '../components/video/VideoCard';
import NoResults from '../components/video/NoResults';
import { BASE_URL } from './api/post';

interface IProps {
  videos: video[];
}

const Home: NextPage<IProps> = ({ videos }) => {
  return (
    <div className="flex  flex-col gap-10 video h-full">
      {videos.length ? videos.map((video: video) => <VideoCard post={video} key={video._id} />) : <NoResults text={'No videos'} />}
    </div>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/post`);
  return {
    props: { videos: data },
  };
};

export default Home;
