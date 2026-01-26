import List from '@mui/material/List';
import BLListItemGroup, { type BLListItemGroupProps } from './bl-list-item-group/BLListItemGroup.tsx';
import BLListItem, { type BLListItemProps } from './bl-list-item/BLListItem.tsx';
import './BLSelectableList.scss';
import type { Dispatch, SetStateAction } from 'react';
import type { Selectable } from '../../../providers/multi-select/MultiSelectProvider.tsx';

interface BLSelectableListProps<T extends Selectable> {
  singleItems?: BLListItemProps<T>[];
  groups?: BLListItemGroupProps<T>[];
  selected: Selectable[];
  setSelected: Dispatch<SetStateAction<Selectable[]>>;
}

const BLSelectableList = <T extends Selectable>({
                                                  selected,
                                                  setSelected,
                                                  singleItems,
                                                  groups
                                                }: BLSelectableListProps<T>) => {

  const toggle = (item: BLListItemProps<T>) => {
    setSelected((prev) => {
        const ids = prev.map(value => value.id);
        return ids.includes(item.id)
          ? prev.filter((value) => value.id !== item.id)
          : [...prev, item.originalObject];
      }
    );
  };

  return (
    <div className={ 'bl-selectable-list' } onMouseDown={ (e) => e.preventDefault() }>
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
              selected={ selected.map(s => s.id).includes(item.id) }
              originalObject={ item.originalObject }
              onClick={ () => {
                toggle(item);
                item.onClick?.();
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
