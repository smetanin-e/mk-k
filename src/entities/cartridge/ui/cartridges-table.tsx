import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui';
import { CartridgeDTO } from '../model/types';
import { getStatusBadge } from './get-status-badge';

interface Props {
  className?: string;
  count: number;
  items: CartridgeDTO[];
}

export const CartridgesTable: React.FC<Props> = ({ count, items }) => {
  return (
    <div className='h-[625px] overflow-auto overflow-y-scroll'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Номер</TableHead>
            <TableHead>Модель</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead className='text-right'>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {count === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className='text-center py-8 text-muted-foreground'>
                Картриджи не найдены
              </TableCell>
            </TableRow>
          ) : (
            <>
              {items.map((cartridge) => (
                <TableRow key={cartridge.id}>
                  <TableCell className='font-medium'>{cartridge.label}</TableCell>
                  <TableCell>{cartridge.model?.model}</TableCell>
                  <TableCell>{getStatusBadge(cartridge.status)}</TableCell>
                  <TableCell className='flex items-center justify-end gap-6'>
                    {/* <CartridgeActions id={cartridge.id} currentStatus={cartridge.status} />
                    <DeleteCartridge id={cartridge.id} /> */}
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
