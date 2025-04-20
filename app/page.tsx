import { Spinner } from '@heroui/spinner';

import { Suspense } from 'react';

import MainPage from '@/components/pages/MainPage';

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <Suspense fallback={<Spinner size="lg" color="warning" />}>
        <MainPage />
      </Suspense>
    </section>
  );
}
