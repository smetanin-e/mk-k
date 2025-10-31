'use client';
import { FormCheckbox } from '@/shared/components/form';
import { Card, CardContent, Label } from '@/shared/components/ui';
import React from 'react';
import { useGetModels } from '../api/use-get-mogels';
import { ButtonRegisterModel } from './button-register-model';

interface Props {
  className?: string;
}

export const CheckModels: React.FC<Props> = () => {
  const { data } = useGetModels();
  if (!data) return null;
  return (
    <div>
      <Label className='font-semibold'>Выберите совместимые модели картриджей</Label>
      <Card className='mt-2 max-w-[462px] p-4'>
        <CardContent className='p-0'>
          <div className='grid grid-cols-4 gap-3 mb-6'>
            {data.map((model) => (
              <div key={model.id} className='flex items-center space-x-2'>
                <FormCheckbox name='models' label={model.model} value={model.id} />
              </div>
            ))}
          </div>
          <div className='text-right'>
            <ButtonRegisterModel />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
