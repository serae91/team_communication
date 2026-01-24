import ListSubheader from '@mui/material/ListSubheader';
import React, { type ReactNode } from 'react';
import BLListItem, { type BLListItemProps } from '../bl-list-item/BLListItem.tsx';
import { Divider } from '@mui/material';
import './BLListItemGroup.scss';
import type { Selectable } from '../../../../providers/multi-select/MultiSelectProvider.tsx';

export interface BLListItemGroupProps {
  id: number;
  selected: Selectable[];
  toggle: (selectable: Selectable) => void;
  listSubheader: ReactNode;
  listItems: BLListItemProps[];
}

const BLListItemGroup = ({id, selected, toggle, listSubheader, listItems}: BLListItemGroupProps) => {

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
            selected={ selected.includes(item) }
            end={ item.end ?? (() => undefined) }
            onClick={ () => {
              toggle(item);
              if (item.onClick) {
                item.onClick();
              }
            } }/>
        )
      }</div>
    </div>
  );
};

export default BLListItemGroup;
