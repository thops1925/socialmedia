interface postedBy {
  image: string;
  userName: string;
  _id: string;
  _key: number;
}

interface likes {
  _key: number;
  _ref: string;
  _type: string;
}

interface comments {
  comment: string;
  postedBy: postedBy;
}

interface asset {
  url: string;
  _id: string;
}

export interface video {
  caption: string;
  comments: comments[];
  likes: likes[];
  postedBy: postedBy;
  userId: number;
  video: { asset: asset };
  _id: string;
}
