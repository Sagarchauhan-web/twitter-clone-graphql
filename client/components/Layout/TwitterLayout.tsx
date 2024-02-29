import { graphQLClient } from '@/clients/api';
import { verifyUserGoogleTokenQuery } from '@/graphql/query/user';
import { useCurrentUser } from '@/hooks/user';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import Image from 'next/image';
import React, { useCallback } from 'react';
import toast from 'react-hot-toast';
import { BiHash, BiHomeCircle, BiMoney, BiUser } from 'react-icons/bi';
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from 'react-icons/bs';
import { SlOptions } from 'react-icons/sl';

interface TwitterLayoutProps {
  children: React.ReactNode;
}

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

const TwitterLayout: React.FC<TwitterLayoutProps> = (props) => {
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
    <div className='grid grid-cols-12 h-screen w-screen lg:px-32 md:px-10'>
      <div className='col-span-2 sm:col-span-3 pt-8 flex flex-col items-center sm:items-start relative'>
        <div
          className='text-2xl h-fit w-fit
         hover:bg-gray-600 rounded-full p-4
          cursor-pointer transition-all'
        >
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
                <span className='hidden sm:inline'>
                  {sidebarMenuItem.title}
                </span>
              </li>
            ))}
          </ul>
          <div className='mt-5 sm:pr-10'>
            <button className='hidden sm:inline text-sm font-semibold bg-[#1d9bf0] p-4 py-3 rounded-full w-full'>
              Tweet
            </button>
            <button className='sm:hidden flex flex-col items-center text-sm font-semibold bg-[#1d9bf0] p-4 py-3 rounded-full w-full'>
              <BsTwitter />
            </button>
          </div>
        </div>

        {user && (
          <div
            className='hidden sm:flex absolute bottom-5 right-2
       rounded-lg gap-2 mt-auto w-full items-center bg-slate-900 hover:bg-slate-800 p-2'
          >
            <Image
              className='rounded-full'
              src={user.profileImageURL ? user.profileImageURL : '/favicon.ico'}
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
      <div className='col-span-10 sm:col-span-6 border-r-[1px] h-screen no-scrollbar overflow-scroll border-l-[1px] border border-gray-800 '>
        {props.children}
      </div>
      <div className='col-span-3 hidden sm:block p-5'>
        {!user && (
          <div className='border p-5 bg-slate-700 rounded-lg'>
            <GoogleLogin onSuccess={handleLoginWithGoogle} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TwitterLayout;
