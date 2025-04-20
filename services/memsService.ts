import { apiPath } from '@/constants/apiPath';
import { MemeType } from '@/types/mems';
import axiosInstance from '@/utilities/axiosInstance';

export const getAllMemes = async () =>
  (await axiosInstance.get<MemeType[]>(apiPath.mems)).data;

export const createNewMeme = async (data: Omit<MemeType, 'id'>) =>
  (await axiosInstance.put<MemeType>(apiPath.mems, data)).data;

export const updateMeme = async (data: Partial<MemeType>) => {
  if (!('id' in data)) {
    return;
  }

  return (
    await axiosInstance.patch<MemeType>(`${apiPath.mems}/${data.id}`, data)
  ).data;
};
