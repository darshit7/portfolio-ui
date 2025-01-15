'use client'
import Snowfall from 'react-snowfall';
import Avatar from '@/components/homepage/Avatar';
import Greeting from '@/components/homepage/Greeting';
import ShortDescription from '@/components/homepage/ShortDescription';

export default function HomePage() {
  return (
    <div className="relative">
      <Snowfall
        snowflakeCount={60}
        style={{
          zIndex: -1,
          position: 'fixed',
          width: '100vw',
          height: '100vh',
        }}
      />
      <div className="mt-8 dark:divide-gray-700 md:mt-8">
        <Greeting />
        <div className="flex flex-col justify-between md:my-4 md:pb-8 xl:flex-row">
          <Avatar />
          <div className="flex flex-col text-lg leading-8 text-gray-600 dark:text-gray-400 ml-10">
            <ShortDescription />
          </div>
        </div>
      </div>
    </div>
  );
}