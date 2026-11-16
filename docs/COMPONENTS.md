# Components

## Button

Runs an action. One `primary` button per page or dialog, for its main action; others are `secondary` or `outline`.
`destructive` is only for delete, reject or cancel.

```tsx
<Button onClick={save}>Save</Button>
<Button variant="outline" leftIcon={<Printer />}>Print</Button>
<Button variant="destructive" loading={rejecting}>Reject</Button>
<Button asChild variant="link"><a href="/reports">Reports</a></Button>
```

| Prop      | Type                                                         | Default   |
| --------- | ------------------------------------------------------------ | --------- |
| variant   | `primary` `secondary` `outline` `ghost` `destructive` `link` | `primary` |
| size      | `sm` `md` `lg` `icon`                                        | `md`      |
| loading   | boolean: spinner, disabled, `aria-busy`                      | `false`   |
| leftIcon  | ReactNode                                                    |           |
| rightIcon | ReactNode                                                    |           |
| asChild   | boolean: the child element gets the button's look            | `false`   |

An icon-only button (`size="icon"`) needs an `aria-label`.

## Input

A text field with its label, hint and error, tied together for screen readers.

```tsx
<Input label="Model 19 No." hint="As printed on the IFMIS form" />
<Input label="Quantity" type="number" error="Only 4 are in store" />
```

| Prop  | Type                                                  |
| ----- | ----------------------------------------------------- |
| label | string: shown above, and the field's name             |
| hint  | ReactNode under the field                             |
| error | string: marks it invalid, is announced, replaces hint |

## Chip

A short status label. The words carry the meaning; the colour supports it.

```tsx
<Chip tone="success">In store</Chip>
<Chip tone="warning" dot>Pending</Chip>
<Chip tone="danger">Rejected</Chip>
```

| Prop | Type                                          | Default   |
| ---- | --------------------------------------------- | --------- |
| tone | `success` `info` `warning` `danger` `neutral` | `neutral` |
| dot  | boolean                                       | `false`   |
| icon | ReactNode                                     |           |

## Card

A panel grouping related content. With a `title`, it is a region named by it.

```tsx
<Card title="Item" description="As received on Model 19" actions={<Chip tone="success">In store</Chip>} footer={<Button>Save</Button>}>
  …
</Card>
```

| Prop        | Type      |
| ----------- | --------- |
| title       | ReactNode |
| description | ReactNode |
| actions     | ReactNode |
| footer      | ReactNode |


## Autocomplete

Searchable combobox with debounced async queries, pagination, and keyboard navigation.

```tsx
<Autocomplete name="assignee" value={userId} onSelectOption={setUser} searchOptions={fetchUsers} />
```

## Avatar

Displays a user avatar image or computed initials fallback.

```tsx
<Avatar src="/avatars/abebe.jpg" alt="Abebe Bikila" size="md" />
```

## BaseModal

Accessible dialog overlay with title, description, and action buttons.

```tsx
<BaseModal isOpen={open} onClose={() => setOpen(false)} title="Confirm Transfer">Proceed?</BaseModal>
```

## BaseTable

Configurable data table built on TanStack Table with pagination, sorting, and cell formatters.

```tsx
<BaseTable data={farmers} columns={columns} loading={loading} />
```

## BoardCard

Task or item card for kanban boards and workflow queues.

```tsx
<BoardCard title="Inspect Fertilizer Batch" tags={["Quality", "Urgent"]} />
```

## Chart

Data visualization wrapper around Recharts supporting line, bar, area, and pie charts.

```tsx
<Chart variant={ChartVariant.BAR} data={cropYields} config={yieldConfig} />
```

## Checkbox

Accessible dual-state or indeterminate checkbox input.

```tsx
<Checkbox checked={agreed} onCheckedChange={setAgreed} label="Accept Terms" />
```

## DatePicker

Calendar date picker with accessible popover and format localization.

```tsx
<DatePicker value={harvestDate} onChange={setHarvestDate} label="Harvest Date" />
```

## DetailsCard

Card displaying a list of labeled key-value metadata fields.

```tsx
<DetailsCard title="Farm Summary" items={[{ label: "Woreda", value: "Ada'a" }]} />
```

## DropDown

Select dropdown menu built on Radix UI Select with keyboard navigation.

```tsx
<DropDown options={regionOptions} value={region} onChange={setRegion} label="Region" />
```

## Form

Form shell integrating with React Hook Form, Zod validation, and error summaries.

```tsx
<Form onSubmit={handleSubmit}><FormField name="name" label="Name" /><FormSubmit>Save</FormSubmit></Form>
```

## FormField

Form field container providing label, helper text, and validation error binding.

```tsx
<FormField name="licenseNo" label="License No"><Input /></FormField>
```

## FormSubmit

Submit button with automatic loading state and form submission binding.

```tsx
<FormSubmit>Register Farmer</FormSubmit>
```

## Icon

Unified SVG icon wrapper based on Lucide with consistent sizing and colors.

```tsx
<Icon name="check" size={16} className="text-primary" />
```

## Image

Responsive image wrapper with loading placeholder and fallback on error.

```tsx
<Image src="/images/teff.jpg" alt="Teff Field" aspectRatio="16/9" />
```

## Logo

Ministry of Agriculture official branding logo with responsive variations.

```tsx
<Logo size="md" variant="default" />
```

## NavMenu

Horizontal navigation menu with submenus and keyboard accessibility.

```tsx
<NavMenu items={[{ label: "Crops", href: "/crops" }]} />
```

## OnboardingChecklist

Interactive step-by-step checklist tracking user setup completion.

```tsx
<OnboardingChecklist steps={steps} onStepClick={handleStep} />
```

## Page

Standard page container layout with header, title, breadcrumbs, actions, and content slot.

```tsx
<Page title="Grain Warehouses" actions={<Button>Add Warehouse</Button>}>Page content</Page>
```

## Search

Search bar input with instant or debounced submission and clear button.

```tsx
<Search value={query} onChange={setQuery} onSubmit={handleSearch} />
```

## SideBar

Collapsible application sidebar navigation with grouped links, icons, and badges.

```tsx
<SideBar items={navItems} isCollapsed={collapsed} onToggleCollapse={toggle} />
```

## StatCard

KPI stat metric card displaying a number, trend percentage, icon, and description.

```tsx
<StatCard label="Total Cooperatives" value="1,240" trend={{ value: 12, isPositive: true }} />
```

## Text

Typography component rendering semantic text elements with design token sizes.

```tsx
<Text as="h2" size="xl" weight="semibold">Registered Warehouses</Text>
```

## TextArea

Multi-line text input field with character count, auto-resize, and validation errors.

```tsx
<TextArea label="Inspection Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
```

## Toaster

Notification toast provider and viewport built on Sonner.

```tsx
<Toaster position="top-right" />
```

## Toggle

Accessible switch toggle for binary on/off settings.

```tsx
<Toggle checked={notifications} onCheckedChange={setNotifications} label="SMS Alerts" />
```

## TopBar

Application top bar header with logo, search trigger, notifications, and user avatar.

```tsx
<TopBar user={{ name: "Dr. Girma" }} actions={<Button size="sm">Export</Button>} />
```
