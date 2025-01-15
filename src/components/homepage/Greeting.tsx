import clsx from 'clsx';

const Greeting = () => {
  const className = clsx(
    'bg-gradient-to-r from-gray-500 to-slate-400 dark:bg-gradient-to-l dark:from-blue-800 dark:to-primary',
    'bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-4xl'
  );

  return (
    <div className={className}>
      Hello, folks! <i className="twa twa-waving-hand"></i><span className="font-bold"></span>
    </div>
  );
};

export default Greeting;