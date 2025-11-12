import { getCartridgeReturnInfo } from '@/entities/cartridge/model/lib';
import { BatchCartridge } from '@/entities/cartridge/model/types';
import React from 'react';
import { BatchDTO } from '../../model/types';
import { Badge, TableCell, TableRow } from '@/shared/components/ui';
import { Calendar } from 'lucide-react';

interface Props {
  className?: string;
  cartridge: BatchCartridge;
  batch: BatchDTO;
}

export const ShowBatchTable: React.FC<Props> = ({ batch, cartridge }) => {
  const returnInfo = getCartridgeReturnInfo(batch, cartridge.id);
  return (
    <TableRow key={cartridge.label}>
      <TableCell>{cartridge.label}</TableCell>
      <TableCell>{cartridge.model.model}</TableCell>

      <TableCell>
        <Badge variant={cartridge.returned ? 'success' : 'outline'}>
          {cartridge.returned ? 'Возвращен' : 'В сервисе'}
        </Badge>
      </TableCell>
      <TableCell>
        {returnInfo?.returnDate ? (
          <div className='flex items-center gap-1 text-sm'>
            <Calendar className='h-3 w-3' />
            {returnInfo.returnDate}
          </div>
        ) : (
          <span className='text-muted-foreground text-sm'>—</span>
        )}
      </TableCell>
      <TableCell>
        {cartridge.returnResponsible ? (
          cartridge.returnResponsible
        ) : (
          <span className='text-muted-foreground text-sm'>—</span>
        )}
      </TableCell>
      <TableCell className='max-w-[200px] truncate whitespace-normal break-words'>
        {cartridge.returnNotes ? (
          <div className='text-xs max-w-[250px]'>{cartridge.returnNotes}</div>
        ) : (
          <span className='text-muted-foreground text-sm'>—</span>
        )}
      </TableCell>
    </TableRow>
  );
};
