import { ResponsibleForm } from '@/entities/user/ui';
import { FormDate } from '@/shared/components/form';
import { FormTextarea } from '@/shared/components/form/form-textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { batchFormSchema, BatchFormType } from '../model/schemas/batch-form-schema';
import { convertDate } from '@/shared/lib';
import { Button } from '@/shared/components/ui';

interface Props {
  className?: string;
  selectedCartridges: number[];
  setSelectedCartridges: (ids: number[]) => void;
  batchId: string;
}

export const ReturnBatchForm: React.FC<Props> = ({
  batchId,
  selectedCartridges,
  setSelectedCartridges,
}) => {
  const form = useForm<BatchFormType>({
    resolver: zodResolver(batchFormSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      notes: '',
      responsible: '',
    },
  });

  const onSubmit = async (data: BatchFormType) => {
    try {
      data.date = convertDate(data.date);
      const payload = {
        ...data,
        batchId: batchId,
        cartridges: selectedCartridges,
      };

      console.log(payload);
      setSelectedCartridges([]);
      form.reset();
    } catch (error) {
      console.error('Error [Return_Batch_Form]', error);
    }
  };
  return (
    <FormProvider {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid grid-cols-2 gap-4'>
          <FormDate name='date' label='Дата приема' />
          <ResponsibleForm />
        </div>
        <div>
          <FormTextarea name='notes' label='Примечания' placeholder='Комментарий возврата...' />
        </div>

        <div className='flex items-center justify-end space-x-6'>
          <Button type='submit' disabled={selectedCartridges.length === 0}>
            Принять
            {selectedCartridges.length !== 0 ? ` (${selectedCartridges.length} шт.)` : ''}
          </Button>
          <Button type='button' variant='outline'>
            Отмена
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
