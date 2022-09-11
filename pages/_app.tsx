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

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_SANITY_GOOGLE_CLIENT_ID}`}>
      <Navbar />
      <div className="flex gap-6 md:gap-20">
        <div className="h-[94vh] overflow-hidden xl:hover:overflow-auto">
          <SideBar />
        </div>
        <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
          <Component {...pageProps} />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default MyApp;
