import ListSubheader from '@mui/material/ListSubheader';
import React, { type ReactNode } from 'react';
import BLListItem, { type BLListItemProps } from '../bl-list-item/BLListItem.tsx';
import { Divider } from '@mui/material';
import './BLListItemGroup.scss';

export interface BLListItemGroupProps {
  id: number;
  selected: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
  listSubheader: ReactNode;
  listItems: BLListItemProps[];
}

const BLListItemGroup = ({id, selected, setSelected, listSubheader, listItems}: BLListItemGroupProps) => {

  const toggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };
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
            selected={ selected.includes(item.id) }
            end={ item.end ?? (() => undefined) }
            onClick={ () => {
              toggle(item.id);
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
