import './SearchSystem.scss';
import { InputAdornment, TextField } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';

interface SearchSystemPorps {
  placeholder?: string;
}

const SearchSystem = ({placeholder}: SearchSystemPorps) => {
  return (
    <div className={ 'search-system' }>
      <TextField
        className={ 'search-bar' }
        placeholder={ placeholder ?? '' }
        fullWidth

        slotProps={ {
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined color="action"/>
              </InputAdornment>
            ),
          },
        } }
      />
      { /*<BLSelectableList/>*/ }
    </div>);
};

export default SearchSystem;