import { createNewMeme, getAllMemes, updateMeme } from '@/services/memsService';
import { MemeType } from '@/types/mems';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const QUERY_KEY = 'mems';

export const useGetAllMemes = () =>
  useQuery({ queryKey: [QUERY_KEY], queryFn: getAllMemes });

export const useCreateNewMeme = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<MemeType, 'id'>) => createNewMeme(data),
    onSuccess: () => client.invalidateQueries({ queryKey: [QUERY_KEY] }),
    onError: (error) => error,
  });
};

export const useUpdateMeme = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<MemeType>) => updateMeme(data),
    onSuccess: () => client.invalidateQueries({ queryKey: [QUERY_KEY] }),
    onError: (error) => error,
  });
};
