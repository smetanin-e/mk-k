import React from 'react';
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui';
import { CartridgeDTO } from '../model/types';
import { useSelectetCartridgeStore } from '../model/store';
import { getStatusBadge } from './get-status-badge';
import { handleCartridgeSelect } from '../model/lib';
interface Props {
  className?: string;
  searchValue: string;
  availableForService: CartridgeDTO[];
}

export const SendingCartridgesList: React.FC<Props> = ({ availableForService, searchValue }) => {
  const { selectedCartridges, setSelectedCartridges } = useSelectetCartridgeStore();

  const filteredCartriges = availableForService.filter((cartridge) =>
    searchValue ? cartridge.label.toLowerCase().includes(searchValue.toLowerCase()) : true,
  );
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-12'></TableHead>
          <TableHead>Номер</TableHead>
          <TableHead>Модель</TableHead>
          <TableHead>Статус</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredCartriges.map((cartridge) => (
          <TableRow key={cartridge.id}>
            <TableCell>
              <Checkbox
                checked={selectedCartridges.includes(cartridge.id)}
                onCheckedChange={(checked) =>
                  handleCartridgeSelect(
                    selectedCartridges,
                    cartridge.id,
                    checked as boolean,
                    setSelectedCartridges,
                  )
                }
              />
            </TableCell>
            <TableCell className='font-medium'>{cartridge.label}</TableCell>
            <TableCell>{cartridge.model?.model}</TableCell>
            <TableCell>{getStatusBadge(cartridge.status)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
