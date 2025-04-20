import { localStorageProperties } from '@/constants/localStorageProperties';
import { setDataToLocalStorage } from '@/services/localStorageService';
import { MemeType } from '@/types/mems';

import { ReactNode, createContext, useContext } from 'react';

import { useGetAllMemes } from '@/hooks/useMems';

type MemsContextType = {
  memesData: MemeType[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

const MemsContext = createContext<MemsContextType | undefined>(undefined);

export const MemsProvider = ({ children }: { children: ReactNode }) => {
  const { data: memesData, isLoading, isError, error } = useGetAllMemes();

  if (memesData) {
    setDataToLocalStorage(localStorageProperties.memes, memesData);
  }

  if (isError) {
    console.error(error);
  }

  return (
    <MemsContext.Provider
      value={{
        memesData: memesData,
        isError,
        isLoading,
      }}
    >
      {children}
    </MemsContext.Provider>
  );
};

export const useMemsContext = () => {
  const context = useContext(MemsContext);

  if (context === undefined) {
    throw new Error('useMemsData must be used within an MemsProvider');
  }

  return context;
};
