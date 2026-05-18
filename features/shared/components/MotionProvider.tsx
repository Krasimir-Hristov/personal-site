'use client';

import { LazyMotion, domAnimation } from 'framer-motion';

const MotionProvider = ({ children }: { children: React.ReactNode }) => (
  <LazyMotion features={domAnimation}>{children}</LazyMotion>
);

export default MotionProvider;
