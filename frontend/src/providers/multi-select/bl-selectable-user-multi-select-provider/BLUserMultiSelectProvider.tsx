import createMultiSelectProvider from '../MultiSelectProvider.tsx';
import type { BLUserDto } from '../../../dtos/BLUserDto.ts';
import { getFilteredUser } from '../../../services/UserService.ts';
import type { ReactNode } from 'react';

const {
  MultiSelectProvider,
  useMultiSelect,
} = createMultiSelectProvider<BLUserDto>();

interface BLUserMultiSelectProviderProps {
  children: ReactNode;
}

export const useBLUserMultiSelect = useMultiSelect;

export const BLUserMultiSelectProvider = ({children}: BLUserMultiSelectProviderProps) => {
  const filter = (user: BLUserDto, query: string) => {
    const noBlankLowerCaseQuery = query.replaceAll(' ', '').toLowerCase();
    if (`${ user.firstName }${ user.lastName }`.toLowerCase().includes(noBlankLowerCaseQuery)) return true;
    if (`${ user.lastName }${ user.firstName }`.toLowerCase().includes(noBlankLowerCaseQuery)) return true;
    return user.username.toLowerCase().includes(noBlankLowerCaseQuery);
  };
  return (<MultiSelectProvider filter={ filter } fetchOptions={ getFilteredUser }>{ children }</MultiSelectProvider>);
};
