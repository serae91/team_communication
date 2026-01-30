import ListSubheader from '@mui/material/ListSubheader';
import React, { type ReactNode } from 'react';
import BLListItem, { type BLListItemProps } from '../bl-list-item/BLListItem.tsx';
import { Divider } from '@mui/material';
import './BLListItemGroup.scss';
import type { Selectable } from '../../../../providers/multi-select/MultiSelectProvider.tsx';

export interface BLListItemGroupProps<T extends Selectable> {
  id: number;
  selected: Selectable[];
  toggle: (selectable: BLListItemProps<T>) => void;
  listSubheader: ReactNode;
  listItems: BLListItemProps<T>[];
}

const BLListItemGroup = <T extends Selectable>({
                                                 id,
                                                 selected,
                                                 toggle,
                                                 listSubheader,
                                                 listItems
                                               }: BLListItemGroupProps<T>) => {

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
            originalObject={ item.originalObject }
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
