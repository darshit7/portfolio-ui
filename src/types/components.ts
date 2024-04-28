import type readingTime from 'reading-time';
import type { ImageProps as NextImageProps } from 'next/image';
import { ReactNode } from 'react';

export interface PageTitleProps {
  children: React.ReactNode
}

export interface ImageProps extends NextImageProps {
  shouldOpenLightbox?: boolean;
}

export interface ImageLightBoxProps extends Pick<NextImageProps, 'src'> {
  closeLightbox: () => void;
}

export type TwemojiProps = {
  emoji: string;
  size?: string;
  className?: string;
};


export type ReadingTime = ReactNode;

export interface BlogMetaProps {
  date: string;
  slug: string;
  readingTime: ReadingTime;
}

export interface ViewCounterProps {
  slug: string;
  className?: string;
}