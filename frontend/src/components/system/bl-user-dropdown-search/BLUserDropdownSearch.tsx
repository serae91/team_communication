import BLSelectableUserList, {
  type BLSelectableUser,
  type BLSelectableUserGroup
} from '../../ui/bl-selectable-list/bl-selectable-user-list/BLSelectableUserList.tsx';
import {
  BLSelectableUserMultiSelectProvider
} from '../../../providers/multi-select/bl-user-multi-select-provider/BLMultiSelectProvider.ts';

const BLUserDropdownSearch = () => {

  return (<BLSelectableUserMultiSelectProvider fetchOptions={ } selectedOptions={ }>
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

