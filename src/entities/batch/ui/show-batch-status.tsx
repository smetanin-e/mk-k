import { BATCH_STATUS } from '@/shared/constants/cartridge-status';
import { BatchStatus } from '@prisma/client';
import { Badge } from '@/shared/components/ui';

interface Props {
  status: BatchStatus;
}

export const ShowBatchStatusBadge: React.FC<Props> = ({ status }) => {
  const config = BATCH_STATUS[status];
  const Icon = config.icon;
  return (
    <Badge className={`${config.color} text-white flex items-center gap-1`}>
      <Icon className='h-3 w-3' />
      {config.label}
    </Badge>
  );
};
