import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [ssr, setSsr] = useState(true);
  useEffect(() => setSsr(false), []);
  if (ssr) null;

  return (
    <div>
      <Navbar />
      <div className="flex gap-6 md:gap-20">
        <div className="h-[94vh] overflow-hidden xl:hover:overflow-auto">
          <SideBar />
        </div>
        <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
};

export default MyApp;
