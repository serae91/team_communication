import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import './BLListItem.scss';
import React, { type ReactNode } from 'react';
import type { Selectable } from '../../../../providers/multi-select/MultiSelectProvider.tsx';

export interface BLListItemProps<T extends Selectable> {
  id: number;
  primary: ReactNode;
  secondary?: ReactNode;
  start?: ReactNode;
  end?: (selected: boolean) => ReactNode;
  onClick?: () => void;
  selected: boolean;
  originalObject: T;
}

const BLListItem = <T extends Selectable>({
                                            primary,
                                            secondary,
                                            start,
                                            end,
                                            onClick,
                                            selected = false,
                                            originalObject,
                                          }: BLListItemProps<T>) => {
  return (
    <div className={ `bl-list-item${ selected ? '--selected' : '' }` }>
      <ListItem onClick={ onClick }>
        { start && <ListItemIcon>{ start }</ListItemIcon> }

        <ListItemText
          primary={ primary }
          secondary={ secondary }
        />
        { end?.(selected) }
      </ListItem>
    </div>
  );
};

export default BLListItem;
