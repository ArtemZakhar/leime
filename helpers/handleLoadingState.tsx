import { Spinner } from '@heroui/spinner';

export const handleLoadingState = ({
  isError,
  isLoading,
  blockHeight,
  errorText,
}: {
  isLoading: boolean;
  isError: boolean;
  blockHeight?: string;
  errorText?: string;
}) => {
  const heightClass = blockHeight ? `h-[${blockHeight}]` : 'h-[50vh]';

  if (isLoading) {
    return (
      <div className={`flex justify-center items-center ${heightClass}`}>
        <Spinner size="lg" color="warning" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`flex justify-center items-center ${heightClass}`}>
        <h2>{errorText ?? 'Something went wrong'}</h2>
      </div>
    );
  }

  return null;
};
