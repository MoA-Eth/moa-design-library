import { Printer } from 'lucide-react';
import { Button, Card, Chip } from '@moa-eth/moa-design-library';

export function CardExample() {
  return (
    <div className="grid max-w-lg gap-4">
      <Card
        title="Model 19 — Fertilizer Dispatch"
        description="Bale Agricultural Inputs Store · Voucher #M19-2026-0412"
        actions={
          <Chip tone="success" dot>
            In store
          </Chip>
        }
        footer={
          <>
            <Button variant="outline" size="sm" leftIcon={<Printer className="h-3.5 w-3.5" />}>
              Print Voucher
            </Button>
            <Button size="sm">Approve Receipt</Button>
          </>
        }
      >
        <dl className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <dt className="text-muted-foreground">Commodity</dt>
            <dd className="mt-0.5 font-medium text-foreground">NPS+B Blended Fertilizer</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Quantity Received</dt>
            <dd className="mt-0.5 font-medium text-foreground">120 Quintals</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Supplier</dt>
            <dd className="mt-0.5 font-medium text-foreground">Ethiopian Agricultural Inputs Corp.</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Inspector</dt>
            <dd className="mt-0.5 font-medium text-foreground">Abebe Bikila</dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}
