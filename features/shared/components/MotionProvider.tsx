'use client';

import { LazyMotion } from 'framer-motion';

const loadFeatures = () =>
  import('./MotionFeatures').then((mod) => mod.default);

const MotionProvider = ({ children }: { children: React.ReactNode }) => (
  <LazyMotion features={loadFeatures}>{children}</LazyMotion>
);

export default MotionProvider;
