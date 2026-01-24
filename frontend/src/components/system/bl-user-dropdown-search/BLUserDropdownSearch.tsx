import BLSelectableUserList, {
  type BLSelectableUser,
  type BLSelectableUserGroup
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
    <BLSelectableUserList users={ users } groups={ groups } selected={ } setSelected={ }/>
  </BLSelectableUserMultiSelectProvider>);

};

const users = [
  {id: 1, firstName: 'Gerald', lastName: 'Hopf', username: 'userName'},
  {id: 2, firstName: 'Gerald', lastName: 'Hopf', username: 'userName'}
] as BLSelectableUser[];

const groups = [
  {
    id: 1,
    groupName: 'group A',
    users: [
      {id: 3, firstName: 'Gerald', lastName: 'Hopf', username: 'userName'},
      {id: 4, firstName: 'Gerald', lastName: 'Hopf', username: 'userName'}
    ]
  },
  {
    id: 2,
    groupName: 'group B',
    users: [
      {id: 5, firstName: 'Gerald', lastName: 'Hopf', username: 'userName'},
      {id: 6, firstName: 'Gerald', lastName: 'Hopf', username: 'userName'}
    ]
  }
] as BLSelectableUserGroup[];


export default BLUserDropdownSearch;

