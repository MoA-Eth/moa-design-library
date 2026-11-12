import { useState } from 'react';
import { Printer, Save, Trash2 } from 'lucide-react';
import { Button } from '@moa-eth/moa-design-library';

export function ButtonExample() {
  const [rejecting, setRejecting] = useState(false);

  const handleReject = () => {
    setRejecting(true);
    setTimeout(() => setRejecting(false), 900);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button leftIcon={<Save className="h-4 w-4" />} onClick={() => undefined}>
        Save
      </Button>
      <Button variant="secondary" size="sm">
        Save draft
      </Button>
      <Button variant="outline" leftIcon={<Printer className="h-4 w-4" />}>
        Print Model 19
      </Button>
      <Button variant="ghost">Cancel</Button>
      <Button variant="destructive" leftIcon={<Trash2 className="h-4 w-4" />} loading={rejecting} onClick={handleReject}>
        Reject
      </Button>
      <Button variant="link" asChild>
        <a href="#api-reference">Reports</a>
      </Button>
      <Button size="icon" variant="outline" aria-label="Print receipt">
        <Printer className="h-4 w-4" />
      </Button>
    </div>
  );
}
