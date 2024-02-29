import TwitterLayout from '@/components/Layout/TwitterLayout';
import type { NextPage } from 'next';

const UserProfile: NextPage = () => {
  return (
    <div>
      <TwitterLayout>
        <h1>User Profile</h1>
      </TwitterLayout>
    </div>
  );
};

export default UserProfile;
