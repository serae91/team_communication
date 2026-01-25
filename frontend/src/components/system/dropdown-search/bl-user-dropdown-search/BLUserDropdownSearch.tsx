import BLSelectableUserList from '../../../ui/bl-selectable-list/bl-selectable-user-list/BLSelectableUserList.tsx';
import {
  useBLUserMultiSelect
} from '../../../../providers/multi-select/bl-selectable-user-multi-select-provider/BLUserMultiSelectProvider.tsx';
import SearchBar from '../search-bar/SearchBar.tsx';

const BLUserDropdownSearch = () => {
  const {query, setQuery, isFetching} = useBLUserMultiSelect();
  return (
    <SearchBar placeholder={ 'Search for a member' } query={ query } setQuery={ setQuery } isFetching={ isFetching }>
      <BLSelectableUserList/>
    </SearchBar>);

};

export default BLUserDropdownSearch;

