import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

export interface BLListItemProps {
  id: string;
  primary: string;
  secondary?: string;
  start?: React.ReactNode;
  end?: React.ReactNode;
  onClick?: () => void;
}

const BLListItem = ({
                      primary,
                      secondary,
                      start,
                      end,
                      onClick,
                    }: BLListItemProps) => {
  return (
    <ListItem onClick={ onClick }>
      { start && <ListItemIcon>{ start }</ListItemIcon> }

      <ListItemText
        primary={ primary }
        secondary={ secondary }
      />
      { end }
    </ListItem>
  );
};

export default BLListItem;
