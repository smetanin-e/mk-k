import React from 'react';

import { TableCell, TableRow } from '@/shared/components/ui';
import { ShowBatchStatusBadge } from './show-batch-status';
import { BatchStatus } from '@prisma/client';
import { BatchDTO } from '../model/types';
import { ShowBatchForReturn } from './show-batch-for-return';

interface Props {
  className?: string;
  batch: BatchDTO;
}

export const ReturningBatch: React.FC<Props> = ({ batch }) => {
  const getAvailableCartridges = (batch: BatchDTO) => {
    return batch.cartridges.filter((c) => !c.returned);
  };

  const getReturnedCartridges = (batch: BatchDTO) => {
    return batch.cartridges.filter((c) => c.returned);
  };

  return (
    <TableRow key={batch.id}>
      <TableCell>{batch.date}</TableCell>
      <TableCell>
        <ShowBatchStatusBadge status={batch.status} />
      </TableCell>
      <TableCell>
        <div className='flex flex-col text-sm'>
          <span>Всего: {batch.cartridges.length}</span>
          {batch.status === BatchStatus.PARTIAL_RETURN && (
            <>
              <span className='text-green-600'>
                Вернулось: {getReturnedCartridges(batch).length}
              </span>
              <span className='text-orange-600'>
                Осталось: {getAvailableCartridges(batch).length}
              </span>
            </>
          )}
        </div>
      </TableCell>
      <TableCell>{batch.responsible}</TableCell>
      <TableCell className='text-right'>
        <div className='flex gap-2 justify-end'>
          <ShowBatchForReturn
            date={batch.date}
            responsible={batch.responsible}
            status={<ShowBatchStatusBadge status={batch.status} />}
            cartridges={batch.cartridges}
            batch={batch}
          />
          {/* <CartridgesReturn
                            batchId={batch.id}
                            date={batch.date}
                            responsible={batch.responsible}
                            status={getBatchStatusBadge(batch.status)}
                            cartridges={batch.cartridges}
                          /> */}
        </div>
      </TableCell>
    </TableRow>
  );
};
