import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../utils/mitch.png';
import UserLogin from './UserLogin';

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-1 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <Image src={logo} alt="logo" className="cursor-pointer" layout="responsive" />
        </div>
      </Link>
      <div>Search</div>
      <UserLogin />
    </div>
  );
};

export default Navbar;
