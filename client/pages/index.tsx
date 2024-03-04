import FeedCard from '@/components/FeedCard';
import TwitterLayout from '@/components/Layout/TwitterLayout';
import { useGetAllTweets, useCreateTweet } from '@/hooks/tweet';
import { useCurrentUser } from '@/hooks/user';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { BiImageAlt } from 'react-icons/bi';

export interface Tweet {
  id: number;
  content: string;
  imageURL: string;
  author: { firstName: string; lastName: string; profileImageUrl: string };
}

export default function Home() {
  const { user } = useCurrentUser();
  const { tweets } = useGetAllTweets();
  const { mutate } = useCreateTweet();

  const [content, setContent] = useState('');
  const handleCreateTweet = useCallback(() => {
    return mutate({ content });
  }, [content, mutate]);

  const handleSelectImage = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
  }, []);

  return (
    <TwitterLayout>
      <div>
        <div className='border border-gray-800 border-r-0 border-l-0 border-b-0 p-5 hover:bg-slate-900 cursor-pointer transition-all'>
          <div className='grid grid-cols-12 gap-3'>
            <div className='col-span-1'>
              <Image
                className='rounded-full'
                width={50}
                height={50}
                alt='avatar'
                src={
                  user?.profileImageURL
                    ? user?.profileImageURL
                    : 'https://avatars.githubusercontent.com/u/81460273?v=4'
                }
              />
            </div>
            <div className='col-span-11'>
              <textarea
                name='tweet'
                value={content}
                onChange={(event) => setContent(event.target.value)}
                id='tweet'
                className='w-full rounded-lg px-3 pt-1 bg-transparent border border-slate-700'
                placeholder="What's happening?"
                rows={3}
              ></textarea>

              <div className='mt-2 flex justify-between items-center'>
                <BiImageAlt onClick={handleSelectImage} className='text-xl' />
                <button
                  onClick={handleCreateTweet}
                  className='text-sm font-semibold bg-[#1d9bf0] px-4 py-1 rounded-full'
                >
                  Tweet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {tweets &&
        tweets.map((tweet: Tweet) => {
          return <FeedCard key={tweet.id} tweet={tweet} />;
        })}
    </TwitterLayout>
  );
}
