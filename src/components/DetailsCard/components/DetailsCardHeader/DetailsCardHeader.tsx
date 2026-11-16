import * as React from 'react';
import { memo } from 'react';
import { DetailsCardHeaderProps } from './types';
import { Button, ButtonVariant } from '@components/Button';
import { SaveIcon, TrashIcon, X } from 'lucide-react';
import { Icon } from '@components/Icon';

export const DetailsCardHeader = <T,>(props: DetailsCardHeaderProps<T>) => {
  const {
    title,
    icon,
    data,
    onClose,
    onSave,
    onDelete,
    saveAccess,
    deleteAccess,
    canAccess,
    customButtons = [],
  } = props;

  return (
    <div className="p-6">
      <div className="pb-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8 rounded-md">
            <Icon icon={icon} size={20} className="text-primary" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {title}
            </span>
          </div>
          <div className="flex items-end gap-2">
            {onDelete && (
              <Button
                onClick={() => onDelete(data ?? null)}
                leftIcon={<TrashIcon className="h-4 w-4" />}
                label="Delete"
                variant={ButtonVariant.DESTRUCTIVE}
                access={deleteAccess}
                canAccess={canAccess}
              />
            )}
            {customButtons.map((button) => (
              <Button
                key={button.label}
                onClick={() => button.onClick(data ?? null)}
                leftIcon={button.icon}
                label={button.label}
                variant={button.variant || ButtonVariant.PRIMARY}
                access={button.access}
                canAccess={button.canAccess ?? canAccess}
                loading={button.loading}
                disabled={button.disabled}
              />
            ))}
            {onSave && (
              <Button
                onClick={() => onSave(data ?? null)}
                leftIcon={<SaveIcon className="h-4 w-4" />}
                label="Save"
                variant={ButtonVariant.PRIMARY}
                access={saveAccess}
                canAccess={canAccess}
              />
            )}
            {onClose && (
              <Button
                onClick={onClose}
                leftIcon={<X className="h-4 w-4" />}
                label="Close"
                variant={ButtonVariant.PRIMARY}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(DetailsCardHeader) as <T>(
  props: DetailsCardHeaderProps<T>,
) => React.JSX.Element;
