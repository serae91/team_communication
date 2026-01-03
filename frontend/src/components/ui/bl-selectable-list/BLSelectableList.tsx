import { useState } from 'react';
import List from '@mui/material/List';
import BLListItemGroup, { type BLListItemGroupProps } from './bl-list-item-group/BLListItemGroup.tsx';
import BLListItem, { type BLListItemProps } from './bl-list-item/BLListItem.tsx';
import './BLSelectableList.scss';

interface BLSelectableListProps {
  singleItems?: BLListItemProps[];
  groups?: BLListItemGroupProps[];
}

const BLSelectableList = ({singleItems, groups}: BLSelectableListProps) => {
  const [selected, setSelected] = useState<number[]>([]);

  const toggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  return (
    <div className={ 'bl-selectable-list' }>
      <List>
        {
          singleItems?.map(item =>
            <BLListItem
              key={ item.id }
              id={ item.id }
              primary={ item.primary }
              secondary={ item.secondary }
              start={ item.start }
              end={ item.end ?? (() => undefined) }
              selected={ selected.includes(item.id) }
              onClick={ () => {
                toggle(item.id);
                if (item.onClick) {
                  item.onClick();
                }
              } }
            />)
        }
        {
          groups?.map(group =>
            <BLListItemGroup
              selected={ selected }
              setSelected={ setSelected }
              key={ group.id }
              id={ group.id }
              listSubheader={ group.listSubheader }
              listItems={ group.listItems }
            />)
        }
      </List>
    </div>
  );
};

export default BLSelectableList;
