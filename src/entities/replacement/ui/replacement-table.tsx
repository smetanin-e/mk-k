import React from 'react';
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui';
import { ReplacementDTO } from '../model/types';
import { useGetCartridges } from '@/entities/cartridge/api/use-get-cartridges';

interface Props {
  className?: string;
  items: ReplacementDTO[];
}

export const ReplacementTable: React.FC<Props> = ({ items }) => {
  //получаем модель картриджа для отображения рядом с номером
  const { data } = useGetCartridges();
  const cartridges = data ? data : [];
  const currentModel = (number: string) => {
    return cartridges.find((cartrige) => cartrige.label === number)?.model?.model;
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Дата</TableHead>
          <TableHead>Подразделение</TableHead>
          <TableHead>Установлен</TableHead>
          <TableHead>Снят</TableHead>
          <TableHead>Ответственный</TableHead>
          <TableHead className='text-center'>Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((rep) => (
          <TableRow key={rep.id} className=''>
            <TableCell>{rep.date}</TableCell>
            <TableCell>{rep.departament.name}</TableCell>
            <TableCell>
              {rep.installedCartridgeLabel ? (
                <Badge variant='outline' className=' text-green-500 text-md'>
                  <p>
                    {rep.installedCartridgeLabel}
                    <span className='text-primary'>
                      {' - '}({currentModel(rep.installedCartridgeLabel)})
                    </span>
                  </p>
                </Badge>
              ) : (
                <Badge variant='outline' className='bg-secondary  text-md'>
                  <span>Отсутствует</span>
                </Badge>
              )}
            </TableCell>
            <TableCell>
              <Badge variant='outline' className=' text-red-500 text-md'>
                {rep.removedCartridgeLabel ? (
                  <p>
                    {rep.removedCartridgeLabel}
                    <span className='text-primary'>
                      {' - '}({currentModel(rep.removedCartridgeLabel)})
                    </span>
                  </p>
                ) : (
                  `Отсутствует`
                )}
              </Badge>
            </TableCell>
            <TableCell>{rep.responsible}</TableCell>
            <TableCell>{/* <DeleteReplace id={rep.id} /> */}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
