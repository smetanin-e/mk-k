import { CartridgeDTO } from '@/entities/cartridge/model/types';
import { getStatusBadge } from '@/entities/cartridge/ui';
import { FormCustomSelect, FormDate } from '@/shared/components/form';
import { Badge, Button } from '@/shared/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ReplacementFormType, replacementSchema } from '../model/schemas/replacement-schema';
import { convertDate } from '@/shared/lib';

interface Props {
  className?: string;
}

export const ReplacementForm: React.FC<Props> = () => {
  const form = useForm<ReplacementFormType>({
    resolver: zodResolver(replacementSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      installedCartridge: null,
      removedCartridge: null,
    },
  });

  const onSubmit = async (data: ReplacementFormType) => {
    try {
      data.date = convertDate(data.date);
      console.log(data);
      form.reset();
    } catch (error) {
      console.log('Error [REPLACEMENT_FORM]', error);
    } finally {
    }
  };

  return (
    <FormProvider {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        <FormDate name='date' required />
        <FormCustomSelect<Departament>
          name={'departamentId'}
          label='Подразделение'
          required
          error='Нужно указать подразделение'
          items={departaments}
          placeholder='Укажите подразделение'
          getKey={(c) => c.id}
          getLabel={(c) => c.name}
          renderValue={(c) => c.name}
          renderItem={(c) => c.name}
          onAdd={
            <Button
              type='button'
              variant={'outline'}
              size={'sm'}
              onClick={() => setOpenModal(true)}
            >
              <Plus className='h-4 w-4 mr-2' />
              Добавить
            </Button>
          }
        />

        <FormCustomSelect<CartridgeDTO>
          name={'installedCartridge'}
          label='Установленный картридж'
          items={avaibleCartridges}
          placeholder='---'
          getKey={(c) => c.id}
          getLabel={(c) => c.label}
          renderValue={(c) => (
            <div className='flex gap-2 items-center flex-1'>
              <span>{c.label}</span>
              <Badge variant='secondary'>{c.model?.model}</Badge>
              {getStatusBadge(c.status)}
            </div>
          )}
          renderItem={(c) => (
            <div className='grid grid-cols-[auto_1fr_auto] items-center gap-2 w-full'>
              <div>{c.label}</div>
              <Badge variant='outline'>
                <strong>{c.model?.model}</strong>
              </Badge>
              <div>{getStatusBadge(c.status)}</div>
            </div>
          )}
        />

        <FormCustomSelect<CartridgeDTO>
          name={'removedCartridge'}
          label='Снятый картридж'
          items={workingCartridges}
          placeholder='---'
          getKey={(c) => c.id}
          getLabel={(c) => c.label}
          renderValue={(c) => (
            <div className='flex gap-2 items-center flex-1'>
              <span>{c.label}</span>
              <Badge variant='secondary'>{c.model?.model}</Badge>
              {getStatusBadge(c.status)}
            </div>
          )}
          renderItem={(c) => (
            <div className='grid grid-cols-[auto_1fr_auto] items-center gap-2 w-full'>
              <div>{c.label}</div>
              <Badge variant='outline'>
                <strong>{c.model?.model}</strong>
              </Badge>
              <div>{getStatusBadge(c.status)}</div>
            </div>
          )}
        />

        {/* <ResponsibleForm /> */}

        <Button type='submit'>Подтвердить</Button>
      </form>
    </FormProvider>
  );
};
