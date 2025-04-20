'use client';

import { validationRules } from '@/constants/validationRules';
import { MemeType } from '@/types/mems';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/modal';
import { Spinner } from '@heroui/spinner';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import axios from 'axios';

import { useCreateNewMeme, useUpdateMeme } from '@/hooks/useMems';
import { useShowFetchResultMessage } from '@/hooks/useShowUpdateResultMessage';

import ActionButton from '../ActionButton';
import InputItem from './formComponents/InputItem';
import { inputList } from './formComponents/inputList';

export type FormType = {
  name: string;
  pictureLink: string;
  likes?: string;
};

const HandleMemeModal = ({
  editMode,
  meme,
}: {
  editMode?: boolean;
  meme?: MemeType;
}) => {
  const {
    isOpen,
    onOpen,
    onOpenChange,
    onClose: outerOnClose,
  } = useDisclosure();

  const form = useForm<FormType>();

  const {
    mutate: createNewMeme,
    isPending: isCreateNewMemePending,
    isError: isCreateNewMemeError,
    error: createNewMemeError,
    isSuccess: isCreateNewMemeSuccess,
  } = useCreateNewMeme();

  const {
    mutate: updateMeme,
    isPending: isUpdateMemePending,
    isError: isUpdateMemeError,
    error: UpdateMemeError,
    isSuccess: isUpdateMemeSuccess,
  } = useUpdateMeme();

  const handleOpenModal = () => {
    if (meme) {
      form.reset({
        likes: String(meme.likes),
        name: meme.title,
        pictureLink: meme.imageURL,
      });
    }

    onOpen();
  };

  const onSubmit = (data: FormType) => {
    if (editMode) {
      if (!meme) return;

      const dirty = form.formState.dirtyFields;

      if (!Object.keys(dirty).length) {
        toast.dismiss();
        toast('No changes were provided', {
          icon: '⏹️',
        });

        return;
      }

      const dirtyFields: Partial<MemeType> = {
        title: dirty.name ? data.name : undefined,
        likes: dirty.likes ? Number(data.likes) : undefined,
        imageURL: dirty.pictureLink ? data.pictureLink : undefined,
      };

      const updatedFields = Object.entries(dirtyFields).reduce(
        (acc, [key, value], index) => {
          if (index === 0) {
            acc.id = meme.id;
          }
          if (value) {
            const typesKey = key as keyof MemeType;
            if (typesKey === 'likes') {
              acc[typesKey] = Number(value);
            } else {
              acc[typesKey] = String(value);
            }
          }

          return acc;
        },
        {} as Partial<MemeType>,
      );
      updateMeme(updatedFields);
    } else {
      const likesAmount = data.likes
        ? Number(data.likes)
        : Math.floor(
            Math.random() *
              (validationRules.likesMax - validationRules.likesMin + 1),
          ) + validationRules.likesMin;
      createNewMeme({
        title: data.name ?? '',
        imageURL: data.pictureLink ?? '',
        likes: likesAmount,
      });
    }
  };

  const handleCloseModal = () => {
    outerOnClose();
    form.reset();
  };

  useShowFetchResultMessage({
    isError: isCreateNewMemeError,
    isSuccess: isCreateNewMemeSuccess,
    closeFunction: handleCloseModal,
    customErrorMessage:
      axios.isAxiosError(createNewMemeError) &&
      `Adjustments is needed: 
      ${createNewMemeError.response?.data.error.map((item: string) => `• ${item}.`).join('\n')}`,
  });

  useShowFetchResultMessage({
    isError: isUpdateMemeError,
    isSuccess: isUpdateMemeSuccess,
    closeFunction: handleCloseModal,
    customErrorMessage:
      axios.isAxiosError(UpdateMemeError) &&
      `Adjustments is needed: 
      ${UpdateMemeError.response?.data.error.map((item: string) => `• ${item}.`).join('\n')}`,
  });

  return (
    <>
      <div className="flex justify-end px-[1rem]">
        <div className="w-[8rem] sm:w-[9rem] md:w-[10rem]">
          <ActionButton handleClick={handleOpenModal}>
            {editMode ? 'Update Meme' : 'Create new meme'}
          </ActionButton>
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create new meme
              </ModalHeader>
              <Form
                onSubmit={form.handleSubmit(onSubmit)}
                className="items-stretch"
              >
                <ModalBody>
                  {inputList.map((inputItem) => (
                    <InputItem
                      key={inputItem.name}
                      form={form}
                      inputItem={inputItem}
                    />
                  ))}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button type="submit">
                    {isCreateNewMemePending || isUpdateMemePending ? (
                      <Spinner size="sm" color="warning" />
                    ) : (
                      <>{editMode ? 'Update' : 'Create'}</>
                    )}
                  </Button>
                </ModalFooter>
              </Form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default HandleMemeModal;
