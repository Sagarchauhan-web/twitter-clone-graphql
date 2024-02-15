import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from 'react-icons/bs';
import { Inter } from 'next/font/google';
import { BiHash, BiHomeCircle, BiUser } from 'react-icons/bi';

const inter = Inter({ subsets: ['latin'] });

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
    title: 'Profile',
    icon: <BiUser />,
  },
];
export default function Home() {
  return (
    <div className={inter.className}>
      <div className='grid grid-cols-12 h-screen w-screen px-56'>
        <div className='col-span-3 pt-8'>
          <div className='text-3xl h-fit w-fit hover:bg-gray-600 rounded-full p-4 cursor-pointer transition-all'>
            <BsTwitter />
          </div>
          <div className='mt-4 text-l font-semibold px-4'>
            <ul>
              {sidebarMenuItems.map((sidebarMenuItem) => (
                <li
                  key={sidebarMenuItem.title}
                  className='flex justify-start mt-2 items-center gap-4 hover:bg-gray-800 rounded-full px-4 py-1.5 w-fit cursor-pointer'
                >
                  <span>{sidebarMenuItem.icon}</span>
                  <span>{sidebarMenuItem.title}</span>
                </li>
              ))}
            </ul>
            <div className='mt-5 pr-10'>
              <button className='text-sm font-semibold bg-[#1d9bf0] p-4 rounded-full w-full'>
                Tweet
              </button>
            </div>
          </div>
        </div>
        <div className='col-span-6 border-r-[1px] border-l-[1px] border-gray-400'></div>
        <div className='col-span-3'></div>
      </div>
    </div>
  );
}
