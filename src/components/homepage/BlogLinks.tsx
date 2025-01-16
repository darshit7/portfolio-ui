import Link from '@/components/Link';
import Twemoji from '@/components/Twemoji';

const BlogLinks = () => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Link href="/blog" className="hover:underline">
        <Twemoji emoji="memo" />
        <span data-umami-event="home-link-blog" className="ml-1.5">
          My writings
        </span>
      </Link>
      <Link href="/notes" className="hover:underline">
        <Twemoji emoji="dna" />
        <span data-umami-event="home-link-notes" className="ml-1.5">
          My Notes
        </span>
      </Link>
      <Link href="/about" className="hover:underline">
        <Twemoji emoji="face-with-monocle" />
        <span data-umami-event="home-link-about" className="ml-1.5">
          More about me & myself
        </span>
      </Link>
      <Link href="/resume" className="hover:underline">
        <Twemoji emoji="briefcase" />
        <span data-umami-event="home-link-resume" className="ml-1.5">
          My career
        </span>
      </Link>
      <Link href="#" className="hover:underline">
        <Twemoji emoji="bar-chart" />
        <span data-umami-event="home-link-analytics" className="ml-1.5">
          Traffic & engagement of this site
        </span>
      </Link>
    </div>
  );
};

export default BlogLinks;