import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { topics } from '../utils/constants';

const Discover = () => {
  const router = useRouter();
  const topic = router.asPath.split('/')[2];
  const activeTopicStyle =
    'flex items-center  justify-center xl:border-2 border-2 xl:border-[#EA5666] border-[#EA5666]  hover:bg-primary gap-2 p-4 rounded xl:rounded-md  cursor-pointer font-semibold text-[#EA5666] xl:text-[#EA5666]';
  const topicStyle =
    'flex items-center gap-3 hover:bg-primary p-4 justify-center xl:justify-start cursor-pointer font-semibold text-[#EA5666] rounded';

  return (
    <div className="xl:border-b-2 xl:border-gray-200 pb-6 ">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">Popular Topics</p>
      <div className="flex gap-3 flex-wrap">
        {topics.map((item) => (
          <Link href={`/?topic/${item.name}`} key={item.name}>
            <div className={topic === item.name ? activeTopicStyle : topicStyle}>
              <span className="font-bold text-2xl xl:text-md">{item.icon}</span>
              <span className="font-medium text-md hidden xl:block ">{item.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
