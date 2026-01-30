import { CircularProgress, InputAdornment, TextField } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { type Dispatch, type ReactNode, type SetStateAction, useRef, useState } from 'react';
import BLScrollPortal from '../../../ui/bl-scroll-portal/BLScrollPortal.tsx';

interface SearchBarProps {
  placeholder?: string;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  isFetching: boolean;
  children: ReactNode;
}

const SearchBar = ({placeholder, query, setQuery, isFetching, children}: SearchBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={ 'search-system' }><TextField
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
    </div>);
};

export default SearchBar;