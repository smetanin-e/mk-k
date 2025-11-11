'use client';
import React from 'react';
import { Send } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui';
import { FormProvider, useForm } from 'react-hook-form';
import { convertDate } from '@/shared/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateBatchFormType, createBatchSchema } from '../model/schemas/create-batch-schema';
import { ResponsibleForm } from '@/entities/user/ui';
import { FormDate } from '@/shared/components/form';
import { FormTextarea } from '@/shared/components/form/form-textarea';
import { useSelectetCartridgeStore } from '@/entities/cartridge/model/store';
import { SendingCartridgeDetails } from '@/entities/cartridge/ui';
import { useGetCartridges } from '@/entities/cartridge/api/use-get-cartridges';
import { useBatchMutations } from '../model/hooks/use-batch-mutation';

interface Props {
  className?: string;
}

export const CreateBatchForm: React.FC<Props> = () => {
  const { create } = useBatchMutations();
  const { cartridges } = useGetCartridges();
  const { selectedCartridges, setSelectedCartridges } = useSelectetCartridgeStore();

  const form = useForm<CreateBatchFormType>({
    resolver: zodResolver(createBatchSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      notes: '',
      responsible: '',
    },
  });

  const onSubmit = async (data: CreateBatchFormType) => {
    try {
      data.date = convertDate(data.date);
      const payload = { ...data, cartridges: selectedCartridges };
      console.log(payload);
      await create.mutateAsync(payload);
      setSelectedCartridges([]);

      form.reset();
    } catch (error) {
      console.log('Error [CREATE_BATCH_FORM]', error);
    } finally {
    }
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className='min-h-[515px]'>
          <CardHeader>
            <CardTitle>Данные партии</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4 '>
              <FormDate name='date' label='Дата отправки' required />

              <div className='min-h-[55px]'>
                <ResponsibleForm />
              </div>

              <FormTextarea
                name='notes'
                label='Примечания'
                placeholder='Дополнительная информация...'
              />

              <div className='pt-4 border-t'>
                <div className='text-sm text-muted-foreground mb-4 min-h-25'>
                  <SendingCartridgeDetails cartridges={cartridges} />
                </div>
                <Button
                  type='submit'
                  className='w-full'
                  disabled={selectedCartridges.length === 0 || form.formState.isSubmitting}
                >
                  <Send className='h-4 w-4 mr-2' />
                  Отправить в сервис
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
};
