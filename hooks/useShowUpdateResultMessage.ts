import { useEffect } from 'react';
import toast from 'react-hot-toast';

export const useShowFetchResultMessage = ({
  isError,
  isSuccess,
  closeFunction = () => {},
  customErrorMessage,
  customMessage,
}: {
  isError: boolean;
  isSuccess: boolean;
  closeFunction?: () => void;
  customErrorMessage?: string | false;
  customMessage?: string;
}) => {
  useEffect(() => {
    if (isError) {
      toast.dismiss();

      if (customErrorMessage) {
        toast.error(customErrorMessage);
        return;
      }

      toast.error('Something went wrong. Try again later.');
      return;
    }

    if (isSuccess) {
      if (customMessage) {
        toast.success(customMessage);
        closeFunction();

        return;
      }

      toast.dismiss();

      toast.success('Success!');
      closeFunction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);
};
