'use client';

import { handleLoadingState } from '@/helpers/handleLoadingState';
import { MemeType } from '@/types/mems';

import HandleMemeModal from '@/components/common/HandleMemeModal';
import TableStyled from '@/components/common/TableStyled';

import { useMemsContext } from '@/context/MemsContext';

const MainPage = () => {
  const { memesData, isError, isLoading } = useMemsContext();

  const actionButton = (meme: MemeType) => (
    <div className="w-[10rem]">
      <HandleMemeModal meme={meme} editMode />
    </div>
  );

  const result = handleLoadingState({ isError, isLoading });

  if (result) {
    return result;
  }

  return (
    <>
      {memesData && (
        <TableStyled
          headerColumns={[
            { key: 'title', label: 'Name' },
            { key: 'likes', label: 'Likes' },
            { key: 'actions', label: 'Actions' },
          ]}
          rows={memesData}
          actionButton={actionButton}
        />
      )}
    </>
  );
};

export default MainPage;
