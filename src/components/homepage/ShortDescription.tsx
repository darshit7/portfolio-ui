import siteMetadata from '@/data/siteMetadata';
import { Twemoji } from '@/components/Twemoji'

const ShortDescription = () => {
    return (
      <div className="mb-4 mt-5">
        <p className="mb-2">I’m {siteMetadata.fullName} - a full-stack developer with a strong focus on backend development,
          over a decade of experience in the Python <Twemoji emoji="python"/> ecosystem.</p>
        <p className="mb-2">I’m enthusiastic about emerging technologies,
          intricacies of the universe <Twemoji emoji="ringed-planet" /> and our ever-evolving understanding of it.</p>
        <p className="mb-2">Outside of work, you’ll often find me enjoying time in
          nature <Twemoji emoji="snow-capped-mountain" />,
          hanging out with my wife <Twemoji emoji="winking-face" /> or
          following my favorite sports like
          cricket <Twemoji emoji="cricket"/>, swimming <Twemoji emoji="man-swimming"/>&nbsp;
          and badminton <Twemoji emoji="badminton" />.</p>
      </div>
    );
  };
  
  export default ShortDescription;