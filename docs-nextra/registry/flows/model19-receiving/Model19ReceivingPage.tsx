import { useState } from 'react';
import { CheckCircle2, ClipboardCheck, PackageCheck } from 'lucide-react';
import { Button, Card, Chip, Input } from '@moa-eth/moa-design-library';

export function Model19ReceivingPage() {
  const [voucherNo, setVoucherNo] = useState('M19-2026-0412');
  const [quantity, setQuantity] = useState('120');
  const [inspector, setInspector] = useState('Abebe Bikila');
  const [status, setStatus] = useState<'pending' | 'approved'>('pending');
  const [saving, setSaving] = useState(false);

  const numericQty = Number(quantity);
  const qtyError = !Number.isFinite(numericQty) || numericQty <= 0 ? 'Enter a received quantity greater than zero.' : undefined;

  const handleApprove = () => {
    if (qtyError) return;
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setStatus('approved');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background p-4 text-foreground md:p-8">
      <div className="mx-auto grid max-w-4xl gap-6">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Ministry of Agriculture · Store Receiving
            </p>
            <h1 className="mt-1 text-xl font-bold tracking-tight text-foreground">Model 19 Inspection &amp; Stock Receipt</h1>
          </div>
          {status === 'approved' ? (
            <Chip tone="success" dot>
              Posted to ledger
            </Chip>
          ) : (
            <Chip tone="warning" dot>
              Pending approval
            </Chip>
          )}
        </header>

        <div className="grid gap-6 md:grid-cols-5">
          <div className="md:col-span-3">
            <Card
              title="Receipt Details"
              description="Verify supplier delivery figures against the physical store count."
              actions={
                <Chip tone="info" icon={<ClipboardCheck className="h-3.5 w-3.5" />}>
                  IFMIS Sync
                </Chip>
              }
              footer={
                <>
                  <Button variant="outline" size="sm" onClick={() => setStatus('pending')}>
                    Reset
                  </Button>
                  <Button
                    size="sm"
                    loading={saving}
                    disabled={Boolean(qtyError) || status === 'approved'}
                    leftIcon={<PackageCheck className="h-4 w-4" />}
                    onClick={handleApprove}
                  >
                    {status === 'approved' ? 'Approved' : 'Approve Receipt'}
                  </Button>
                </>
              }
            >
              <div className="grid gap-4">
                <Input
                  label="Model 19 Voucher No."
                  hint="Official serial number printed on the warehouse copy."
                  value={voucherNo}
                  onChange={(e) => setVoucherNo(e.target.value)}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Received Quantity (Quintals)"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    error={qtyError}
                  />
                  <Input label="Inspected By" value={inspector} onChange={(e) => setInspector(e.target.value)} />
                </div>
              </div>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card
              title="Allocation Summary"
              description="Regional agricultural inputs warehouse"
              actions={<CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />}
            >
              <dl className="grid gap-3 text-xs">
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <dt className="text-muted-foreground">Commodity</dt>
                  <dd className="font-medium text-foreground">NPS+B Fertilizer</dd>
                </div>
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <dt className="text-muted-foreground">Voucher</dt>
                  <dd className="font-mono font-medium text-foreground">{voucherNo || '—'}</dd>
                </div>
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <dt className="text-muted-foreground">Total Units</dt>
                  <dd className="font-medium text-foreground">{quantity || '0'} Quintals</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Inspector</dt>
                  <dd className="font-medium text-foreground">{inspector || '—'}</dd>
                </div>
              </dl>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
