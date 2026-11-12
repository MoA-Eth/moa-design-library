import Link from 'next/link';
import { ArrowRight, BookOpen, Layers3, Palette } from 'lucide-react';
import { Button, Card, Chip, Input } from '@moa-eth/moa-design-library';
import { SiteHeader } from '../docs-nextra/components/SiteHeader';
import { SITE_NAV_ITEMS } from '../docs-nextra/components/siteNavigation';

export default function HomeLandingPage() {
  return (
    <div className="moa-home">
      <SiteHeader items={SITE_NAV_ITEMS} />
      <main className="moa-home-main">
        <section className="moa-hero">
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="success" dot>
              MoA-Eth Design System
            </Chip>
            <Chip tone="neutral">Tailwind v4 · React · Radix</Chip>
          </div>

          <h1>Accessible UI components &amp; themes for Ministry of Agriculture apps.</h1>

          <p className="moa-hero-subtitle">
            Built with MoA green (<code>#00843d</code>), national gold accents (<code>#fcdd09</code>), predictable CSS theme tokens, and
            machine-readable component contracts under <code>ai/contracts/</code>.
          </p>

          <div className="moa-hero-actions">
            <Button asChild rightIcon={<ArrowRight className="h-4 w-4" />}>
              <Link href="/components/">Browse Components</Link>
            </Button>
            <Button asChild variant="outline" leftIcon={<Palette className="h-4 w-4" />}>
              <Link href="/THEMING/">Explore Themes</Link>
            </Button>
            <Button asChild variant="ghost" leftIcon={<BookOpen className="h-4 w-4" />}>
              <Link href="/INSTALLATION/">Installation</Link>
            </Button>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <Card
            title="Live Token Preview"
            description="Switch themes or dark mode in the header bar to watch these components update live."
            actions={<Chip tone="info">Interactive</Chip>}
          >
            <div className="grid gap-4">
              <Input label="Model 19 Voucher" hint="Ministry of Agriculture official stock receipt" defaultValue="M19-2026-0412" />
              <div className="flex flex-wrap gap-2">
                <Button size="sm">Save Entry</Button>
                <Button size="sm" variant="outline">
                  Print Copy
                </Button>
                <Button size="sm" variant="destructive">
                  Reject
                </Button>
              </div>
            </div>
          </Card>

          <Card
            title="Contract-First Delivery"
            description="Every exported component pairs TypeScript APIs with JSON contracts and live previews."
            actions={<Layers3 className="h-4 w-4 text-primary" aria-hidden="true" />}
          >
            <ul className="grid gap-2 text-sm text-muted-foreground">
              <li>
                • Tree-shakeable ESM package with <code>preserveModules</code>
              </li>
              <li>• Runtime theme stylesheets &amp; dark mode parity</li>
              <li>• Resizable flow iframe previews &amp; Shiki code tabs</li>
              <li>
                • Validated by <code>pnpm validate:contracts</code> in CI
              </li>
            </ul>
          </Card>
        </section>
      </main>
    </div>
  );
}
