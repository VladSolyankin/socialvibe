import { DesktopLayout } from '@/layout/DesktopLayout';
import { MobileLayout } from '@/layout/MobileLayout';
import { useState } from 'react';

export const News = () => {
  const [windowWidth] = useState(window.innerWidth);
  return windowWidth > 786 ? (
    <DesktopLayout></DesktopLayout>
  ) : (
    <MobileLayout></MobileLayout>
  );
};
