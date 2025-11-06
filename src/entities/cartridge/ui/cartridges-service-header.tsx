import { CardHeader, CardTitle, Checkbox, Input, Label } from '@/shared/components/ui';
import React from 'react';
import { handleSelectAllCartridges } from '../model/lib';
import { Search } from 'lucide-react';
import { ClearButton } from '@/shared/components';
import { useSelectetCartridgeStore } from '../model/store';
import { CartridgeDTO } from '../model/types';

interface Props {
  className?: string;
  searchValue: string;
  setSearchValue: (value: string) => void;
  availableForService: CartridgeDTO[];
  checkedReserve: boolean;
  setCheckedReserve: (checkedReserve: boolean) => void;
}

export const CartridgesServiceHeader: React.FC<Props> = ({
  searchValue,
  setSearchValue,
  availableForService,
  checkedReserve,
  setCheckedReserve,
}) => {
  const { selectedCartridges, setSelectedCartridges } = useSelectetCartridgeStore();

  const isAllSelected =
    availableForService.length > 0 && selectedCartridges.length === availableForService.length;

  //Отображаем или не отображаем резервные картриджи
  const handleCheckedReserve = (checked: boolean) => {
    const isChecked = checked === true;
    setCheckedReserve(isChecked);

    if (!isChecked) {
      setSelectedCartridges([]);
    }
  };
  return (
    <CardHeader>
      <div className='flex items-center justify-between'>
        <CardTitle>Доступные для отправки ({availableForService.length})</CardTitle>
        <div className='flex gap-10'>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='select-reserve'
              checked={checkedReserve}
              onCheckedChange={handleCheckedReserve}
            />
            <Label htmlFor='select-reserve' className='text-sm'>
              Резерв
            </Label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='select-all'
              checked={isAllSelected}
              onCheckedChange={(checked) =>
                handleSelectAllCartridges(
                  availableForService,
                  checked === true,
                  setSelectedCartridges,
                )
              }
            />
            <Label htmlFor='select-all' className='text-sm'>
              Выбрать все
            </Label>
          </div>
        </div>
      </div>
      <div className='relative mt-2'>
        <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
        <Input
          placeholder='Поиск по номеру картриджа...'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className='pl-10'
        />
        {searchValue && <ClearButton onClick={() => setSearchValue('')} />}
      </div>
    </CardHeader>
  );
};
