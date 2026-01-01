import ListSubheader from '@mui/material/ListSubheader';
import type { ReactNode } from 'react';
import BLListItem, { type BLListItemProps } from '../bl-list-item/BLListItem.tsx';
import { Divider } from '@mui/material';

export interface BLListItemGroupProps {
  listSubheader: ReactNode;
  listItems: BLListItemProps[];
}

const BLListItemGroup = ({listSubheader, listItems}: BLListItemGroupProps) => {
  return (
    <>
      <ListSubheader>{ listSubheader }</ListSubheader>
      {
        listItems.map((item, index, items) => <>
            <BLListItem
              key={ item.id }
              id={ item.id }
              primary={ item.primary }
              secondary={ item.secondary ?? '' }
              start={ item.start ?? '' }
              end={ item.end ?? '' }
              onClick={ item.onClick ?? (() => {
              }) }/>
            { index < items.length - 1 && <Divider/> }
          </>
        )
      }
    </>
  );
};

export default BLListItemGroup;
