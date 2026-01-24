import BLSelectableUserList, {
  type BLSelectableUser
} from '../../ui/bl-selectable-list/bl-selectable-user-list/BLSelectableUserList.tsx';
import {
  BLSelectableUserMultiSelectProvider
} from '../../../providers/multi-select/bl-user-multi-select-provider/BLMultiSelectProvider.ts';
import { getFilteredUser } from '../../../services/UserService.ts';

const BLUserDropdownSearch = () => {

  const filter = (user: BLSelectableUser, query: string) => {
    if (`${ user.firstName } ${ user.lastName }`.toLowerCase().includes(query.toLowerCase())) return true;
    if (`${ user.firstName }${ user.lastName }`.toLowerCase().includes(query.toLowerCase())) return true;
    if (`${ user.lastName } ${ user.firstName }`.toLowerCase().includes(query.toLowerCase())) return true;
    if (`${ user.lastName }${ user.firstName }`.toLowerCase().includes(query.toLowerCase())) return true;
    if (user.username.toLowerCase().includes(query.toLowerCase())) return true;
    return false;
  };
  return (<BLSelectableUserMultiSelectProvider fetchOptions={ getFilteredUser } placeholder={ 'Search for a member' }
                                               filter={ filter }>
    <BLSelectableUserList/>
  </BLSelectableUserMultiSelectProvider>);

};

export default BLUserDropdownSearch;

