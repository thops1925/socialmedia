import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../utils/mitch.png';
import UserLogin from './UserLogin';
import { CgSearchLoading } from 'react-icons/cg';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');
  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (search === '') {
      return;
    } else if (search !== '') {
      router.push(`/search/${search}`);
    }
  };
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-1 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <>
            <Image src={logo} alt="logo" className="cursor-pointer" layout="responsive" />
          </>
        </div>
      </Link>

      <div className="relative hidden md:block">
        <form onSubmit={handleSearch} className="absolute md:static top-10 -left-20 my-2 bg-white">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="bg-primary p-2 md:text-md font-medium border-2 border-gray-10 focus:outline-none focus:border-2 focus:border-gray-300 rounded-full md:top-0 w-[300px] md:w-[400px]"
          />
          <button
            type="submit"
            className="absolute md:right-5 right-4 top-4 border-l-2 border-gray-300 pl-4 text-3xl text-gray-400"
            onClick={() => handleSearch}
          >
            <CgSearchLoading />
          </button>
        </form>
      </div>
      <UserLogin />
    </div>
  );
};

export default Navbar;
