import React from 'react';
import { Checkbox } from '@mui/material';
import { type BLListItemProps } from '../bl-list-item/BLListItem.tsx';
import BLSelectableList from '../BLSelectableList.tsx';
import type { BLListItemGroupProps } from '../bl-list-item-group/BLListItemGroup.tsx';
import {
  useBLSelectableUserMultiSelect
} from '../../../../providers/multi-select/bl-user-multi-select-provider/BLMultiSelectProvider.ts';

export interface BLSelectableUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  selected: boolean;
}

export interface BLSelectableUserGroup {
  id: number;
  groupName: string;
  users: BLSelectableUser[];
}

interface BLSelectableUserListProps {
  users: BLSelectableUser[];
  groups: BLSelectableUserGroup[];
}

const BLSelectableUserList = ({users, groups}: BLSelectableUserListProps) => {
  const {selected, setSelected} = useBLSelectableUserMultiSelect();

  const primary = (user: BLSelectableUser) => <div className={ 'flex items-center gap-2' }>
    <div className={ 'text-base font-medium text-[#181D27]' }>{ user.firstName } { user.lastName }</div>
    <div className={ 'text-base font-normal text-[#535862]' }>@{ user.username }</div>
  </div>;
  const end = (user: BLSelectableUser) => ({selected}: { selected: boolean }) => <Checkbox
    edge="end"
    sx={ {
      color: '#000',
      '&.Mui-checked': {
        color: '#7F56D9',
      },
    } } checked={ selected }
  />;

  const mapUser = (user: BLSelectableUser) => ({
    id: user.id,
    primary: primary(user),
    end: end(user)
  } as BLListItemProps);

  const mappedUsers = users.map(mapUser);

  const mappedGroups = groups.map(group => ({
    id: group.id,
    listSubheader: group.groupName,
    listItems: group.users.map(mapUser)
  } as BLListItemGroupProps));
  return (<BLSelectableList singleItems={ mappedUsers } groups={ mappedGroups } selected={ selected }
                            setSelected={ setSelected }/>);
};

export default BLSelectableUserList;