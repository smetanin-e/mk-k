import { Departament, Replacement } from '@prisma/client';

export type ReplacementDTO = Replacement & {
  departament: Departament;
};
