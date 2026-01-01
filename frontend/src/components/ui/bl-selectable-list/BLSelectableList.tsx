import { useState } from 'react';
import List from '@mui/material/List';
import BLListItemGroup, { type BLListItemGroupProps } from './bl-list-item-group/BLListItemGroup.tsx';
import BLListItem, { type BLListItemProps } from './bl-list-item/BLListItem.tsx';

const items = [
  {id: 1, label: 'Apfel'},
  {id: 2, label: 'Banane'},
  {id: 3, label: 'Orange'},
];

interface BLSelectableListProps {
  singleItems: BLListItemProps[];
  groups: BLListItemGroupProps[];
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
    <List>
      {/* items.map((item) => (
        <ListItem
          key={ item.id }
          disablePadding
          secondaryAction={
            <Checkbox
              edge="end"
              sx={ {
                color: '#FFFFFF',
                '&.Mui-checked': {
                  color: '#7F56D9',
                },
              } }
              checked={ selected.includes(item.id) }
              onChange={ () => toggle(item.id) }
            />
          }
        >
          <ListItemButton onClick={ () => toggle(item.id) }>
            <ListItemText sx={ {color: '#000'} } primary={ item.label }/>
          </ListItemButton>
        </ListItem>
      )) */ }
      <>{
        singleItems.map(item =>
          <BLListItem
            key={ item.id }
            id={ item.id }
            primary={ item.primary }
            secondary={ item.secondary ?? '' }
            start={ item.start ?? '' }
            end={ item.end ?? '' }
            onClick={ item.onClick ?? (() => {
            }) }/>)
      }</>
      <>{
        groups.map(group =>
          <BLListItemGroup
            key={ group.listItems[0]?.id }
            listSubheader={ group.listSubheader }
            listItems={ group.listItems }
          />)
      }</>
    </List>
  );
};

export default BLSelectableList;
