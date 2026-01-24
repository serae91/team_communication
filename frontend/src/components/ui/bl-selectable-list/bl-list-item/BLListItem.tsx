import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import './BLListItem.scss';
import React, { type ReactNode } from 'react';

export interface BLListItemProps {
  id: number;
  primary: ReactNode;
  secondary?: ReactNode;
  start?: ReactNode;
  end?: (selected: boolean) => ReactNode;
  onClick?: () => void;
  selected: boolean;
}

const BLListItem = ({
                      primary,
                      secondary,
                      start,
                      end,
                      onClick,
                      selected = false,
                    }: BLListItemProps) => {
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
