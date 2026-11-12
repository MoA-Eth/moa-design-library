import { useState } from 'react';
import { Input } from '@moa-eth/moa-design-library';

export function InputExample() {
  const [modelNo, setModelNo] = useState('M19-2026-0412');
  const [quantity, setQuantity] = useState('6');

  const parsedQty = Number(quantity);
  const quantityError = Number.isFinite(parsedQty) && parsedQty > 4 ? 'Only 4 units are available in the store ledger.' : undefined;

  return (
    <div className="grid max-w-md gap-4">
      <Input
        label="Model 19 No."
        hint="As printed on the official MoA IFMIS receiving form."
        placeholder="e.g. M19-2026-0412"
        value={modelNo}
        onChange={(event) => setModelNo(event.target.value)}
      />
      <Input
        label="Issued quantity"
        type="number"
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
        error={quantityError}
      />
      <Input label="Storekeeper ID" value="MOA-STR-019" disabled />
    </div>
  );
}
