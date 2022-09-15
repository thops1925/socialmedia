import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import axios from 'axios';
import { client } from '../utils/client';
import { SanityAssetDocument } from '@sanity/client';
import { topics } from '../utils/constants';
import useAuthStore from '../store/authStore';
import { BASE_URL } from './api/post';
import { userDetail } from '../Type/userDetail';

const Upload = () => {
  const router = useRouter();
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState(topics[0].name);
  const [save, setSave] = useState(false);
  const [userAdd, setAddUser] = useState<userDetail | null>();

  const { userProfile } = useAuthStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();
  const [WrongFileType, setWrongFileType] = useState<boolean>(false);

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileType = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/flv', 'video/mkv', 'video/webm', 'video/ogg'];
    if (selectedFile && fileType.includes(selectedFile.type)) {
      client.assets
        .upload('file', selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          isLoading && setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };

  const handlePost = async () => {
    if (caption && category && videoAsset?._id) {
      setSave(true);
      const document = {
        _type: 'post',
        caption,
        video: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: userProfile?._id,
        },
        topic: category,
      };
      await axios.post(`${BASE_URL}/api/post`, document);
      router.push('/');
    }
  };

  useEffect(() => {
    setAddUser(userProfile);
  }, [userProfile]);

  return (
    <>
      {userAdd && (
        <div className="flex h-full w-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-slate-300 justify-center">
          <div className="rounded-lg bg-white xl:h-[80vh] flex gap-6 flex-wrap justify-center items-center p-14 pt-6">
            <div className="">
              <div>
                <p className="text-2xl font-bold">Upload Video</p>
                <p className="text-md text-gray-400 mt-1">Post a video to your account</p>
              </div>
              <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-[#EA5666] hover:bg-gray-100 ">
                {isLoading ? (
                  <p>Uploading . . .</p>
                ) : (
                  <div>
                    {videoAsset ? (
                      <div>
                        <video src={videoAsset.url} loop controls className="rounded-xl h-[460px] mt-16 bg-black"></video>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <div className="flex flex-col items-center justify-center h-full">
                          <div className="flex flex-col items-center justify-center ">
                            <p className="font-bold text-xl">
                              <AiOutlineCloudUpload className="text-4xl" />
                            </p>
                            <p className="text-xl font-semibold ">Upload Video</p>
                          </div>
                          <p className="text-gray-400 mt-2 text-center">Drop your video here</p>
                          <p className="bg-[#EA5666] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none">Choose File</p>
                        </div>
                        <input type="file" name="uploadVideo" className="h-0 w-0 " onChange={uploadVideo} />
                      </label>
                    )}
                  </div>
                )}
                {WrongFileType && <p className="text-red-500 text-center text-xl font-semibold mt-4 w-[250px]">Select Video</p>}
              </div>
            </div>
            <div className="flex flex-col gap-3 pb-10 ">
              <label className="text-md font-medium"> Caption</label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="border-2 border-gray-200 rounded-lg p-2 outline-none text-md"
              />
              <label className="text-md font-medium">Choose Category</label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
              >
                {topics.map((topic) => (
                  <option key={topic.name} className="outline-none capitalize bg-slate-100 text-gray-700 text-md p-2 hover:bg-slate-300 ">
                    {topic.name}
                  </option>
                ))}
              </select>
              <div className="flex gap-6 mt-10 ">
                <button onClick={handlePost} className="bg-[#EA5666] text-white text-md font-medium p-2 w-52 outline-none rounded-lg">
                  Post
                </button>
                <button onClick={() => {}} className="bg-white text-black border-2 text-md font-medium p-2 w-52 outline-none rounded-lg">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Upload;
