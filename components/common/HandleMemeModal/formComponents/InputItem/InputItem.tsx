import { Input } from '@heroui/input';

import { Controller, UseFormReturn } from 'react-hook-form';

import { FormType } from '../../HandleMemeModal';
import { InputListType } from '../inputList';
import { validations } from '../validations';

const InputItem = ({
  inputItem,
  form,
}: {
  inputItem: InputListType;
  form: UseFormReturn<FormType, any, FormType>;
}) => {
  const { name, placeholder, type, label } = inputItem;

  const {
    control,
    formState: { errors },
  } = form;
  return (
    <Controller
      name={name}
      control={control}
      rules={validations[name]}
      render={({ field }) => (
        <Input
          value={field.value ?? ''}
          labelPlacement="outside"
          label={label}
          isInvalid={!!errors[name]}
          errorMessage={errors[name] ? errors[name].message : ''}
          placeholder={placeholder}
          isClearable
          onValueChange={(value) =>
            field.onChange(
              type === 'number' ? value.replace(/[^\d.]/g, '') : value,
            )
          }
        />
      )}
    />
  );
};

export default InputItem;
