import React from 'react';
import useAuthStore from '../../store/authStore';
import { userDetail } from '../../Type/userDetail';
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

  const { userProfile } = useAuthStore();

  React.useEffect(() => {
    setAddUser(userProfile);
  }, [userProfile]);

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[F8F8F8] border-b-2 lg:pb-0  pb-[100px]">
      <div className="overflow-scroll lg:h-[475px]">{comments?.length ? <div>video</div> : <NoResults text="Empty Comments" />}</div>
      {userAdd && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10 m-auto">
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
