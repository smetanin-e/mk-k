import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui';
import { Eye } from 'lucide-react';
import { BatchCartridges } from '@/entities/cartridge/model/types';

interface Props {
  className?: string;
  cartridges: BatchCartridges[];
  date: string;
  responsible: string;
  notes: string;
}

export const ShowBatch: React.FC<Props> = ({ cartridges, date, responsible, notes }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          <Eye className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Партия от {date}</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='grid grid-cols-2 gap-4 text-sm'>
            <div>
              <strong>Количество:</strong> {cartridges.length} шт.
            </div>
            <div>
              <strong>Ответственный:</strong> {responsible}
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Номер</TableHead>
                <TableHead>Модель</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartridges.map((c) => (
                <TableRow key={c.label}>
                  <TableCell>{c.label}</TableCell>
                  <TableCell>{c.model.model}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {notes && (
          <div>
            <div className='text-sm text-muted-foreground'>Комментарий к партии:</div>

            <div className='text-sm text-secondary-foreground'>{` ${notes}`}</div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
