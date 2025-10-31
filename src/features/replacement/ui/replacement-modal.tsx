'use client';
import React from 'react';

import { Edit, Package } from 'lucide-react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui';
import { ReplacementForm } from './replacement-form';
import { CartridgeDTO } from '@/entities/cartridge/model/types';

interface Props {
  className?: string;
  avaibleCartridges: CartridgeDTO[];
  workingCartridges: CartridgeDTO[];
}

export const ReplacementModal: React.FC<Props> = ({ avaibleCartridges, workingCartridges }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='flex items-center gap-2'>
          <Edit className='h-4 w-4' />
          Замена картриджа
        </Button>
      </DialogTrigger>
      <DialogContent className='space-y-4'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Package className='h-5 w-5' />
            Замена картриджа
          </DialogTitle>
        </DialogHeader>

        <div>
          <ReplacementForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};
