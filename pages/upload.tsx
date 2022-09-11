import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import axios from 'axios';
import { client } from '../utils/client';
import { SanityAssetDocument } from '@sanity/client';

const Upload = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();
  const [WrongFileType, setWrongFileType] = useState<boolean>(false);
  console.log(videoAsset);
  const uploadVideo = async (e: any) => {
    e.preventDefault();
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

  return (
    <div className="flex h-full w-full">
      <div className="rounded-lg">
        <div>
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
        </div>
      </div>
    </div>
  );
};

export default Upload;
