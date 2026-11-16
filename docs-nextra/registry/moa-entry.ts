// Docs-only re-export of @moa-eth/moa-design-library's public surface.
// Mirrors src/index.ts without the `import './styles.css'` side-effect because Next.js
// Pages Router only allows global CSS imports in pages/_app.jsx.

export * from '../../src/components/Autocomplete';
export * from '../../src/components/Avatar';
export * from '../../src/components/BaseModal';
export * from '../../src/components/BaseTable';
export * from '../../src/components/BoardCard';
export * from '../../src/components/Button';
export * from '../../src/components/Card';
export * from '../../src/components/Chart';
export * from '../../src/components/Checkbox';
export * from '../../src/components/Chip';
export * from '../../src/components/DatePicker';
export * from '../../src/components/DetailsCard';
export * from '../../src/components/DropDown';
export * from '../../src/components/Form';
export * from '../../src/components/Icon';
export * from '../../src/components/Image';
export * from '../../src/components/Input';
export * from '../../src/components/Logo';
export * from '../../src/components/NavMenu';
export * from '../../src/components/OnboardingChecklist';
export * from '../../src/components/Page';
export * from '../../src/components/Search';
export * from '../../src/components/SideBar';
export * from '../../src/components/StatCard';
export * from '../../src/components/Text';
export * from '../../src/components/TextArea';
export * from '../../src/components/Toast';
export * from '../../src/components/Toggle';
export * from '../../src/components/TopBar';

export * from '../../src/hooks/useDebounce';
export * from '../../src/hooks/useFormHandlers';
export * from '../../src/hooks/useSearchPagination';

export * from '../../src/lib/access-provider';
export * from '../../src/lib/access-types';
export * from '../../src/lib/use-access-resolver';
export * from '../../src/lib/view-edit-access';
export * from '../../src/lib/pagination';
export { cn } from '../../src/lib/utils';

export const version: string =
  typeof __MOA_DESIGN_LIBRARY_VERSION__ !== 'undefined' ? __MOA_DESIGN_LIBRARY_VERSION__ : '0.0.0';
