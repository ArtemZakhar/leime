'use client';

import { handleLoadingState } from '@/helpers/handleLoadingState';
import { Pagination } from '@heroui/pagination';

import { useMemo, useState } from 'react';

import { useMemsContext } from '@/context/MemsContext';

import ListItem from './ListItem';

const ListPage = () => {
  const { memesData, isError, isLoading } = useMemsContext();
  const [page, setPage] = useState(1);
  const itemsPerPage = 16;

  const pages = Math.ceil(memesData ? memesData.length / itemsPerPage : 0);

  const items = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return memesData?.slice(start, end);
  }, [page, memesData]);

  const result = handleLoadingState({ isError, isLoading });

  if (result) {
    return result;
  }

  return (
    <>
      <div className="w-[18rem] sm:w-[30rem] md:w-[40rem] lg:w-[50rem] xl:w-[70rem] grid grid-cols-6 xl:grid-cols-12 gap-x-2 gap-y-1 sm:gap-x-4 sm:gap-y-2 auto-rows-auto">
        {items?.map((meme, index) => (
          <ListItem meme={meme} index={index} key={meme.id} />
        ))}
      </div>

      <Pagination
        isCompact
        showControls
        showShadow
        color="secondary"
        page={page}
        total={pages}
        onChange={(page: number) => setPage(page)}
      />
    </>
  );
};

export default ListPage;
