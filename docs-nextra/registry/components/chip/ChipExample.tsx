import { CheckCircle2, Clock3, FileWarning } from 'lucide-react';
import { Chip } from '@moa-eth/moa-design-library';

export function ChipExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Chip tone="success" dot>
        In store
      </Chip>
      <Chip tone="info" icon={<Clock3 className="h-3.5 w-3.5" />}>
        Under inspection
      </Chip>
      <Chip tone="warning" dot>
        Pending verification
      </Chip>
      <Chip tone="danger" icon={<FileWarning className="h-3.5 w-3.5" />}>
        Rejected
      </Chip>
      <Chip tone="neutral" icon={<CheckCircle2 className="h-3.5 w-3.5" />}>
        Archived
      </Chip>
    </div>
  );
}
