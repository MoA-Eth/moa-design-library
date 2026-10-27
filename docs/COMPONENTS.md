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
