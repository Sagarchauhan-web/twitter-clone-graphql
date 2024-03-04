import FeedCard from '@/components/FeedCard';
import TwitterLayout from '@/components/Layout/TwitterLayout';
import { useCurrentUser, useGetUserById } from '@/hooks/user';
import type { NextPage } from 'next';
import Image from 'next/image';
import { BsArrowLeftShort } from 'react-icons/bs';
import { Tweet } from '.';
import { useRouter } from 'next/router';

const UserProfile: NextPage = () => {
  const router = useRouter();
  const { user } = useGetUserById(router.query.id as string);

  console.log(user, 'user');

  if (!user)
    return (
      <div>
        <TwitterLayout>
          <h1 className='flex items-center justify-center w-full h-full'>
            No User Found
          </h1>
        </TwitterLayout>
      </div>
    );
  return (
    <div>
      <TwitterLayout>
        <div>
          <nav className='flex items-center gap-3 py-3 px-3'>
            <BsArrowLeftShort className='text-2xl' />
            <div>
              <h1 className='text-2xl font-bold'>
                {user?.firstName} {user?.lastName}
              </h1>
              <h1 className='text-md font-bold text-slate-500'>
                {user?.tweets.length} Tweets
              </h1>
            </div>
          </nav>
          <div className='p-4'>
            <Image
              src={
                user?.profileImageURL
                  ? user?.profileImageURL
                  : 'https://avatars.githubusercontent.com/u/81460273?v=4'
              }
              alt='user-image'
              className='rounded-full'
              width={100}
              height={100}
            />
            <h1 className='text-2xl font-bold'>
              {' '}
              {user?.firstName} {user?.lastName}
            </h1>
          </div>
          <div>
            {user?.tweets?.map((tweet: Tweet) => (
              <FeedCard tweet={tweet} key={tweet.id} />
            ))}
          </div>
        </div>
      </TwitterLayout>
    </div>
  );
};

export default UserProfile;
