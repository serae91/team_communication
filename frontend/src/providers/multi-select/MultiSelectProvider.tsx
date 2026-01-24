import { CircularProgress, InputAdornment, TextField } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import './MultiSelectProvider.scss';
import { createContext, type Dispatch, type ReactNode, type SetStateAction, useContext, useRef, useState } from 'react';
import { useDebounce } from '../../services/useDebounce.ts';
import { useQuery } from '@tanstack/react-query';
import BLScrollPortal from '../../components/ui/bl-scroll-portal/BLScrollPortal.tsx';

export interface Selectable {
  id: number;
}

type MultiSelectProviderProps<T> = {
  placeholder?: string;
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
};

const createMultiSelectProvider = <T extends Selectable>() => {
  const MultiSelectContext = createContext<MultiSelectContextType<T> | null>(null);

  const MultiSelectProvider = ({
                                 placeholder,
                                 children,
                                 fetchOptions,
                                 filter,
                                 minQueryLength = 2,
                                 debounceMs = 400
                               }: MultiSelectProviderProps<T>) => {
    const [query, setQuery] = useState<string>('');
    const [selected, setSelected] = useState<Selectable[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const debouncedQuery = useDebounce(query, debounceMs);

    const {data: options = [], isFetching} = useQuery({
      queryKey: ['multiselect', debouncedQuery],
      queryFn: () => fetchOptions(debouncedQuery),
      enabled: debouncedQuery.length >= minQueryLength,
      staleTime: 60_000,
    });

    const filteredOptions = options.filter((option) => filter(option, query));

    const value = {query, setQuery, selected, setSelected, filteredOptions};

    const inputRef = useRef<HTMLInputElement>(null);
    return (
      <MultiSelectContext.Provider value={ value }>
        <div className={ 'search-system' }>
          <TextField
            ref={ inputRef }
            value={ query }
            onChange={ (e) => setQuery(e.target.value) }
            className={ 'search-bar' }
            placeholder={ placeholder ?? '' }
            fullWidth
            onFocus={ () => setIsOpen(true) }
            onBlur={ () => {
              setTimeout(() => setIsOpen(false), 100);
            } }

            slotProps={ {
              input: {
                startAdornment: (
                  <InputAdornment position="start">
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
          { isOpen && (<BLScrollPortal anchorRef={ inputRef }>{ children }</BLScrollPortal>) }
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
