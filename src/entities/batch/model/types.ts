import { BatchCartridges } from '@/entities/cartridge/model/types';
import { CreateBatchFormType } from '@/features/batch/model/schemas/create-batch-schema';

export type BatchForService = CreateBatchFormType & { cartridges: number[] };
export type BatchDTO = {
  id: string;
  date: string;
  responsible: string;
  notes: string;
  partialReturnDate: string | null;
  cartridges: BatchCartridges[];
};
