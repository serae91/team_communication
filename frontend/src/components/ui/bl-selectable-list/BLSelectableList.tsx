import List from '@mui/material/List';
import BLListItemGroup, { type BLListItemGroupProps } from './bl-list-item-group/BLListItemGroup.tsx';
import BLListItem, { type BLListItemProps } from './bl-list-item/BLListItem.tsx';
import './BLSelectableList.scss';
import type { Dispatch, SetStateAction } from 'react';
import type { Selectable } from '../../../providers/multi-select/MultiSelectProvider.tsx';

interface BLSelectableListProps {
  singleItems?: BLListItemProps[];
  groups?: BLListItemGroupProps[];
  selected: Selectable[];
  setSelected: Dispatch<SetStateAction<Selectable[]>>;
}

const BLSelectableList = ({selected, setSelected, singleItems, groups}: BLSelectableListProps) => {

  const toggle = (selectable: Selectable) => {
    setSelected((prev) => {
        const ids = prev.map(value => value.id);
        return ids.includes(selectable.id)
          ? prev.filter((value) => value.id !== selectable.id)
          : [...prev, selectable];
      }
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
              selected={ selected.includes(item) }
              onClick={ () => {
                toggle(item);
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
              toggle={ toggle }
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
