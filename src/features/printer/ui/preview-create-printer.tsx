'use client';
import { useGetModels } from '@/entities/cartridge-model/api/use-get-mogels';
import {
  Badge,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
  className?: string;
}

export const PreviewCreatePrinter: React.FC<Props> = () => {
  const form = useFormContext();
  const { data } = useGetModels();
  return (
    <div>
      <Label className='font-semibold'>Предварительный просмотр:</Label>
      <div className='max-w-[462px]'>
        <Table>
          <TableHeader className='bg-muted/50'>
            <TableRow>
              <TableHead>Название принтера</TableHead>
              <TableHead className='text-center'>Совместимые модели</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className='font-medium bg-gray-200'>{form.watch('name') || '—'}</TableCell>
              <TableCell className='bg-gray-200'>
                <div className='flex flex-wrap gap-1'>
                  {form.watch('models')?.length > 0 ? (
                    form.watch('models').map((id: number) => {
                      const model = data.find((m) => m.id === id);
                      if (!model) return null;
                      return (
                        <Badge key={model.id} variant='secondary' className='flex flex-wrap gap-1'>
                          {model.model}
                        </Badge>
                      );
                    })
                  ) : (
                    <span className='text-gray-500 text-sm'>модели не выбраны</span>
                  )}
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
