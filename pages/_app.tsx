import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { useEffect, useState } from 'react';
import SideBar from '../components/navbar/SideBar';
import Navbar from '../components/navbar/Navbar';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [ssr, setSsr] = useState(true);
  useEffect(() => setSsr(false), []);
  if (ssr) null;

  const [showSideBar, setShowSideBar] = useState<boolean>(false);

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_SANITY_GOOGLE_CLIENT_ID}`}>
      <div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh]">
        <Navbar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
        <div className="flex gap-1 md:gap-20">
          <div className="mt-4 flex flex-col overflow-auto h-[88vh] videos flex-1 px-4">
            <Component {...pageProps} />
          </div>
          <div className="h-[94vh] overflow-hidden xl:hover:overflow-auto scrollbar-hide">
            <SideBar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default MyApp;
