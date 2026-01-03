import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import './BLListItem.scss';
import React from 'react';

export interface BLListItemProps {
  id: number;
  primary: React.ReactNode;
  secondary?: React.ReactNode;
  start?: React.ReactNode;
  end?: ({selected}: { selected: boolean }) => React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
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
    <ListItem onClick={ onClick }>
      { start && <ListItemIcon>{ start }</ListItemIcon> }

      <ListItemText
        primary={ primary }
        secondary={ secondary }
      />
      { end?.({selected}) }
    </ListItem>
  );
};

export default BLListItem;
