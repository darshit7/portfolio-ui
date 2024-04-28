import React from 'react';
import Typed from 'typed.js';

import Twemoji from '@/components/Twemoji';

const TypedBios = () => {
  const el = React.useRef(null);
  const typed = React.useRef(null);

  React.useEffect(() => {
    typed.current = new Typed(el.current, {
      stringsElement: '#bios',
      typeSpeed: 40,
      backSpeed: 10,
      loop: true,
      backDelay: 1000,
    });
    return () => typed.current.destroy();
  }, []);

  return (
    <div>
      <ul id="bios" className="hidden">
        <li>
          I&apos;m also known as <b className="font-medium"><Twemoji emoji="d"/><Twemoji emoji="p"/></b>.
        </li>
        <li>
          Currently I live in <b className="font-medium">Bengaluru, India</b>.
        </li>
        <li>
          First programming language I learned was <b className="font-medium">C</b>,
          <span className="ml-1"><br/>but now in <Twemoji emoji="heart" /> with <b className="font-medium">Python</b></span>
        </li>
        <li>
          I work mostly with <b className="font-medium">Python, Go and React.</b>
        </li>
        <li>
          I&apos;m a sporty-guy. I love<span className="ml-1"> <Twemoji emoji="man-swimming" /></span>,<Twemoji emoji="cricket" />.
        </li>
        <li>
          I love listening classical <b className="font-medium">music and songs.</b>
        </li>
      </ul>
      <span ref={el} className="text-neutral-900 dark:text-neutral-200" />
    </div>
  );
};

export default TypedBios;