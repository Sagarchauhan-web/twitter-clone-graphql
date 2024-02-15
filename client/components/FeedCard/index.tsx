import Image from 'next/image';
import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiMessageRounded, BiUpload } from 'react-icons/bi';
import { FaRetweet } from 'react-icons/fa';

const FeedCard: React.FC = () => {
  return (
    <div className='border border-gray-800 border-r-0 border-l-0 border-b-0 p-5 hover:bg-slate-900 cursor-pointer transition-all'>
      <div className='grid grid-cols-12 gap-3'>
        <div className='col-span-1'>
          <Image
            className='rounded-full'
            width={50}
            height={50}
            alt='avatar'
            src={'https://avatars.githubusercontent.com/u/81460273?v=4'}
          />
        </div>
        <div className='col-span-11'>
          <h5>Sagar</h5>

          <p>
            Is it just me or everyone else? Do you feel the code quality
            decrease as the size increses? Just refactored a lot of bad code
            #codinglife
          </p>

          <div className='flex justify-between mt-5 text-xl items-center pr-10 w-[90%]'>
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <FaRetweet />
            </div>
            <div>
              <AiOutlineHeart />
            </div>
            <div>
              <BiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
