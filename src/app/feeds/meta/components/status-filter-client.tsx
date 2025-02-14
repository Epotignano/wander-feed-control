'use client';

import { Dispatch, SetStateAction } from 'react';
import { StatusFilter } from './faceted-filter';

interface StatusFilterClientProps {
  title: string;
  options: (string | null)[];
  value: string[];
  onSelectionChange: Dispatch<SetStateAction<string[]>>;
}

export function StatusFilterClient({ 
  title, 
  options, 
  value, 
  onSelectionChange 
}: StatusFilterClientProps) {
  return (
    <StatusFilter
      title={title}
      options={options}
      value={value}
      onChange={onSelectionChange}
    />
  );
} 