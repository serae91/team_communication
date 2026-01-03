import ListSubheader from '@mui/material/ListSubheader';
import React, { type ReactNode } from 'react';
import BLListItem, { type BLListItemProps } from '../bl-list-item/BLListItem.tsx';
import { Divider } from '@mui/material';
import './BLListItemGroup.scss';

export interface BLListItemGroupProps {
  listSubheader: ReactNode;
  listItems: BLListItemProps[];
}

const BLListItemGroup = ({listSubheader, listItems}: BLListItemGroupProps) => {
  return (
    <div className={ 'bl-list-item-group' }>
      <Divider/>
      <ListSubheader>{ listSubheader }</ListSubheader>
      <div className={ 'items' }>{
        listItems.map((item) =>
          <BLListItem
            key={ item.id }
            id={ item.id }
            primary={ item.primary }
            secondary={ item.secondary ?? '' }
            start={ item.start ?? '' }
            selected={ item.selected ?? false }
            end={ item.end ?? (() => undefined) }
            onClick={ item.onClick ?? (() => {
            }) }/>
        )
      }</div>
    </div>
  );
};

export default BLListItemGroup;
