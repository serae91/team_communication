import './MultiSelectProvider.scss';
import { createContext, type Dispatch, type ReactNode, type SetStateAction, useContext, useState } from 'react';
import { useDebounce } from '../../services/useDebounce.ts';
import { useQuery } from '@tanstack/react-query';

export interface Selectable {
  id: number;
}

type MultiSelectProviderProps<T> = {
  children: ReactNode;

  fetchOptions: (query: string) => Promise<T[]>;
  filter: (option: T, query: string) => boolean;

  minQueryLength?: number;
  debounceMs?: number;
}

type MultiSelectContextType<T extends Selectable> = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>,
  selected: Selectable[],
  setSelected: Dispatch<SetStateAction<Selectable[]>>,
  filteredOptions: T[],
  isFetching: boolean;
};

const createMultiSelectProvider = <T extends Selectable>() => {
  const MultiSelectContext = createContext<MultiSelectContextType<T> | null>(null);

  const MultiSelectProvider = ({
                                 children,
                                 fetchOptions,
                                 filter,
                                 minQueryLength = 2,
                                 debounceMs = 400
                               }: MultiSelectProviderProps<T>) => {
    const [query, setQuery] = useState<string>('');
    const [selected, setSelected] = useState<Selectable[]>([]);


    const debouncedQuery = useDebounce(query, debounceMs);

    const {data: options = [], isFetching} = useQuery({
      queryKey: ['multiselect', debouncedQuery],
      queryFn: () => fetchOptions(debouncedQuery),
      enabled: debouncedQuery.length >= minQueryLength,
      staleTime: 60_000,
    });

    const filteredOptions = options.filter((option) => filter(option, query));

    const value = {query, setQuery, selected, setSelected, filteredOptions, isFetching};

    return (
      <MultiSelectContext.Provider value={ value }>
        { children }

      </MultiSelectContext.Provider>);
  };

  const useMultiSelect = () => {
    const context = useContext(MultiSelectContext);
    if (!context) {
      throw new Error('useMultiSelect must be used inside the MultiSelectProvider');
    }
    return context;
  };

  return {MultiSelectProvider, useMultiSelect};
};

export default createMultiSelectProvider;
