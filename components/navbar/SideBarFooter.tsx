import React from 'react';
import { ListProps } from '../../Type/Footer';
import { footerList1, footerList2, footerList3 } from '../../utils/constants';

const List: React.FC<ListProps> = ({ items, mt }) => (
  <div className={`flex flex-wrap gap-2 mt-5 ${mt && 'mt-5'}`}>
    {items.map((item) => (
      <p key={item} className="text-gray-500 font-semibold hover:underline cursor-pointer text-sm">
        {item}
      </p>
    ))}
  </div>
);

const SideBarFooter = () => {
  return (
    <div className="mt-6 hidden xl:block">
      <List items={footerList1} mt={false} />
      <List items={footerList2} mt />
      <List items={footerList3} mt />
      <p className="flex justify-start items-center mt-5">
        <span className="text-gray-500 font-semibold text-sm ">© {new Date().getFullYear()} Mitch</span>
      </p>
    </div>
  );
};

export default SideBarFooter;
