import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { GoVerified } from 'react-icons/go';
import useAuthStore from '../../store/authStore';
import { userDetail } from '../../Type/userDetail';
import SuggestedAccounts from '../navbar/SuggestedAccounts';
import NoResults from '../video/NoResults';

interface IProps {
  isPostingComment: boolean;
  comment: string;
  comments: Icomments[];
  setComment: React.Dispatch<React.SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
}

interface Icomments {
  comment: string;
  lenght?: number;
  _key?: string;
  postedBy: {
    _ref: string;
    _id?: string;
  };
}

const CommentSection = ({ comment, comments, setComment, addComment, isPostingComment }: IProps) => {
  const [userAdd, setAddUser] = React.useState<userDetail | null>();

  const { userProfile, allUsers } = useAuthStore();

  React.useEffect(() => {
    setAddUser(userProfile);
  }, [userProfile]);

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[F8F8F8] border-b-2 lg:pb-0  pb-[100px]">
      <div className="overflow-scroll lg:h-[475px]">
        {comments?.length ? (
          <div>
            {comments.map((comment, idx) => (
              <div key={idx}>
                {allUsers.map(
                  (item) =>
                    item._id === (comment.postedBy._id || comment.postedBy._ref) && (
                      <div className="p-2 items-center cursor-pointer" key={idx}>
                        <Link href={`/profile/${item._id}`}>
                          <div className="flex gap-3 items-center">
                            <div className="w-8 h-8">
                              <>
                                <Image src={item.image} alt="user" className=" rounded-full" height={34} width={34} layout="responsive" />
                              </>
                            </div>
                            <div className="hidden xl:block">
                              <p className="flex gap-1 items-center text-md font-bold text-primary lowercase ">
                                {item.userName.replaceAll(' ', '')}
                                <GoVerified className="text-blue-400" />
                              </p>
                              <p>
                                <span className="text-gray-400 capitalize text-xs">{item.userName}</span>
                              </p>
                            </div>
                          </div>
                        </Link>
                        <div className="flex items-center w-auto mx-2 my-5">
                          <p className="text-gray-500 text-sm">{comment.comment}</p>
                        </div>
                      </div>
                    )
                )}
              </div>
            ))}
          </div>
        ) : (
          <NoResults text="Empty Comments" />
        )}
      </div>
      {userAdd && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10 m-auto w-[250px]">
          <form onSubmit={addComment} className="flex gap-4">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className=" bg-primary  px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-200 rounded-full  focus:outline-none focus:border-[#EA5666] flex-1 "
              type="text"
              placeholder="Add a comment"
            />
            <button onClick={addComment} className="bg-[#EA5666] text-white font-medium text-md px-6 py-4  w-32 rounded-full" type="submit">
              {isPostingComment ? 'Posting...' : 'Post'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
