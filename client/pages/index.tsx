import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from 'react-icons/bs';
import { BiHash, BiHomeCircle, BiMoney, BiUser } from 'react-icons/bi';
import { SlOptions } from 'react-icons/sl';
import FeedCard from '@/components/FeedCard';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { graphQLClient } from '@/clients/api';
import { verifyUserGoogleTokenQuery } from '@/graphql/query/user';
import { useCurrentUser } from '@/hooks/user';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const sidebarMenuItems: TwitterSidebarButton[] = [
  {
    title: 'Home',
    icon: <BiHomeCircle />,
  },
  {
    title: 'Explore',
    icon: <BiHash />,
  },
  {
    title: 'Notifications',
    icon: <BsBell />,
  },
  {
    title: 'Messages',
    icon: <BsEnvelope />,
  },
  {
    title: 'Bookmarks',
    icon: <BsBookmark />,
  },
  {
    title: 'Twitter Blue',
    icon: <BiMoney />,
  },
  {
    title: 'Profile',
    icon: <BiUser />,
  },
  {
    title: 'More',
    icon: <SlOptions />,
  },
];

export default function Home() {
  const { user } = useCurrentUser();

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) {
        toast.error(`Google Token not found`);
      }
      const verifyGoogleToken = await graphQLClient.request(
        verifyUserGoogleTokenQuery,
        {
          token: googleToken,
        },
      );

      toast.success('Verified Success');

      if (verifyGoogleToken) {
        window.localStorage.setItem('token', JSON.stringify(verifyGoogleToken));
      }
    },
    [],
  );

  return (
    <div>
      <div className='grid grid-cols-12 h-screen w-screen px-56'>
        <div className='col-span-3 pt-8 relative'>
          <div className='text-2xl h-fit w-fit hover:bg-gray-600 rounded-full p-4 cursor-pointer transition-all'>
            <BsTwitter />
          </div>
          <div className='mt-2 text-l px-4'>
            <ul>
              {sidebarMenuItems.map((sidebarMenuItem) => (
                <li
                  key={sidebarMenuItem.title}
                  className='flex justify-start mt-2 items-center gap-4 hover:bg-gray-800 rounded-full px-4 py-1.5 w-fit cursor-pointer'
                >
                  <span className='text-xl'>{sidebarMenuItem.icon}</span>
                  <span>{sidebarMenuItem.title}</span>
                </li>
              ))}
            </ul>
            <div className='mt-5 pr-10'>
              <button className='text-sm font-semibold bg-[#1d9bf0] p-4 py-3 rounded-full w-full'>
                Tweet
              </button>
            </div>
          </div>

          {user && (
            <div
              className='flex absolute bottom-5 right-1
             rounded-lg gap-2 mt-auto w-full items-center bg-slate-900 hover:bg-slate-800 p-2'
            >
              <Image
                className='rounded-full'
                src={
                  user.profileImageURL ? user.profileImageURL : '/favicon.ico'
                }
                alt='user Profile image'
                height={40}
                width={40}
              />
              <h1 className='font-semibold text-[.8rem]'>
                {user.firstName + ' ' + user.lastName}
              </h1>
            </div>
          )}
        </div>
        <div className='col-span-6 border-r-[1px] h-screen no-scrollbar overflow-scroll border-l-[1px] border border-gray-800 '>
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className='col-span-3 p-5'>
          {!user && (
            <div className='border p-5 bg-slate-700 rounded-lg'>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
