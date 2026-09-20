import type { BlogItem } from '~/types/data'

/**
 * Articles published off-site, on Medium. Tags are display spellings shared
 * with note frontmatter -- `utils/tags.ts` slugs them, so "Python" here and
 * "Python" in a note land on the same /tags page.
 */
export const BLOG_METADATA: BlogItem[] = [
  {
    id: 5,
    title: 'Exploring Metaprogramming in Python',
    link: 'https://medium.com/stackademic/exploring-metaprogramming-in-python-6c14cf757805',
    date: new Date('2023-08-04'),
    tags: ['Python', 'Metaprogramming'],
  },
  {
    id: 4,
    title: 'Exploring Coroutines in Python: Harnessing Concurrency and Asynchronous Programming',
    link: 'https://medium.com/stackademic/exploring-coroutines-in-python-harnessing-concurrency-and-asynchronous-programming-814d8a80cbe8',
    date: new Date('2023-08-06'),
    tags: ['Python', 'Concurrency', 'Async'],
  },
  {
    id: 3,
    title:
      'Exploring the Magic of Generators in Python: A Beginner’s Guide with Six Real-Life Examples',
    link: 'https://blog.stackademic.com/exploring-the-magic-of-generators-in-python-a-beginners-guide-with-six-real-life-examples-f3a949db45aa',
    date: new Date('2023-08-06'),
    tags: ['Python', 'Generators'],
  },
  {
    id: 2,
    title:
      'Deep Dive into The Fascinating Journey of ChatGPT’s Training Process: Unveiling the Magic of Language Generation',
    link: 'https://medium.com/@darshit7/deep-dive-into-the-fascinating-journey-of-chatgpts-training-process-unveiling-the-magic-of-c5b70b47e3c4',
    date: new Date('2023-08-18'),
    tags: ['AI/ML', 'LLMs'],
  },
  {
    id: 1,
    title: 'Beyond the GIL: Future of Parallel Computing in Python',
    link: 'https://medium.com/python-in-plain-english/beyond-the-gil-future-of-parallel-computing-in-python-38ef2a80555c',
    date: new Date('2024-08-15'),
    tags: ['Python', 'Concurrency', 'Performance'],
  },
  {
    id: 6,
    title: 'Riding the Wave! Running DeepSeek Locally',
    link: 'https://medium.com/@darshit7/riding-the-deepseek-wave-running-it-locally-a012cebadac3',
    date: new Date('2025-01-29'),
    tags: ['AI/ML', 'LLMs', 'Local Inference'],
  },
  {
    id: 7,
    title: 'Is This Our Great Depression Moment or Just a Reskilling Phase?',
    link: 'https://medium.com/@darshit7/is-this-our-great-depression-moment-or-just-a-reskilling-phase-58a0d3894ed1?sk=b7321d6e45c88e06e605c634bb4d255b',
    date: new Date('2026-04-26'),
    tags: ['AI/ML', 'Careers'],
  },
  {
    id: 8,
    title: 'The builder’s trap: the work you enjoy is rarely the work that matters',
    link: 'https://medium.com/@darshit7/the-builders-trap-the-work-you-enjoy-is-rarely-the-work-that-matters-0b3407f33a3a?sharedUserId=darshit7',
    date: new Date('2026-09-20'),
    tags: ['Careers', 'Practice'],
  },
]
