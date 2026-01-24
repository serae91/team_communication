import { CircularProgress, InputAdornment, TextField } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import './MultiSelectProvider.scss';
import { createContext, type Dispatch, type ReactNode, type SetStateAction, useContext, useState } from 'react';
import { useDebounce } from '../../services/useDebounce.ts';
import { useQuery } from '@tanstack/react-query';

type MultiSelectProviderProps<T> = {
  placeholder?: string;
  children: ReactNode;

  fetchOptions: (query: string) => Promise<T[]>;

  selectedOptions: T[];

  filter: (option: T) => boolean;

  minQueryLength?: number;
  debounceMs?: number;
}

type MultiSelectContextType<T> = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>,
  selected: T[],
  setSelected: Dispatch<SetStateAction<T[]>>,
  filteredOptions: T[],
};

const createMultiSelectProvider = <T, >() => {
  const MultiSelectContext = createContext<MultiSelectContextType<T> | null>(null);

  const MultiSelectProvider = ({
                                 placeholder,
                                 selectedOptions,
                                 children,
                                 fetchOptions,
                                 filter,
                                 minQueryLength = 2,
                                 debounceMs = 400
                               }: MultiSelectProviderProps<T>) => {
    const [query, setQuery] = useState<string>('');
    const [selected, setSelected] = useState<T[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const debouncedQuery = useDebounce(query, debounceMs);

    const {data: options = [], isFetching} = useQuery({
      queryKey: ['multiselect', debouncedQuery],
      queryFn: () => fetchOptions(debouncedQuery),
      enabled: debouncedQuery.length >= minQueryLength,
      staleTime: 60_000,
    });

    const filteredOptions = options.filter(filter);


    const value = {query, setQuery, selected, setSelected, filteredOptions};

    return (
      <MultiSelectContext.Provider value={ value }>
        <div className={ 'search-system' }>
          <TextField
            value={ query }
            onChange={ (e) => setQuery(e.target.value) }
            className={ 'search-bar' }
            placeholder={ placeholder ?? '' }
            fullWidth

            slotProps={ {
              input: {
                startAdornment: (
                  <InputAdornment position="start"
                                  onFocus={ () => setIsOpen(true) }
                                  onBlur={ () => setIsOpen(false) }>
                    <SearchOutlined color="action"/>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    { isFetching && <CircularProgress size={ 16 }/> }
                  </InputAdornment>
                ),
              },
            } }
          />
          { children }
        </div>
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
