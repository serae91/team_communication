/*import * as React from "react";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface BLMultiSelectProps {
  label: string;
}

export interface BLMenuItem {
  label: string;
  value: any;
}

export const BLMultiSelect = ({label}: BLMultiSelectProps)=> {
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleChange = (event: any) => {
    setSelected(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={label}>{label}</InputLabel>
      <Select
        labelId="multi-select-label"
        multiple
        value={selected}
        onChange={handleChange}
        label="Fruits"
        renderValue={(selected) => selected.join(", ")}
      >
        <MenuItem value="Apple">Apple</MenuItem>
        <MenuItem value="Banana">Banana</MenuItem>
        <MenuItem value="Orange">Orange</MenuItem>
        <MenuItem value="Grape">Grape</MenuItem>
      </Select>
    </FormControl>
  );
}*/

import { type ReactElement } from "react";
import {
  Box,
  Checkbox,
  Chip,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  type SelectChangeEvent,
  useTheme,
} from '@mui/material';
import LabelIcon from '@mui/icons-material/Label';

// Label Typ
export type GmailLabel = {
  id: string;
  name: string;
  color: string; // Hex oder MUI Theme Color
  icon?: ReactElement;
};

type Props = {
  labels: GmailLabel[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
};

export default function BLMultiSelect({
                                        labels,
                                        value,
                                        onChange,
                                        placeholder = "Select labels...",
                                      }: Props) {
  const theme = useTheme();

  const handleChange = (e: SelectChangeEvent<typeof value>) => {
    onChange(e.target.value as string[]);
  };

  return (
    <Select
      multiple
      displayEmpty
      fullWidth
      value={ value }
      onChange={ handleChange }
      renderValue={ (selected) => {
        if (selected.length === 0) {
          return (
            <Box sx={ {color: theme.palette.text.disabled} }>
              { placeholder }
            </Box>
          );
        }

        return (
          <Box sx={ {display: "flex", flexWrap: "wrap", gap: 0.5} }>
            { selected.map((id) => {
              const lbl = labels.find((l) => l.id === id);
              if (!lbl) return null;

              return (
                <Chip
                  key={ id }
                  label={ lbl.name }
                  size="small"
                  icon={ lbl.icon ?? <LabelIcon/> }
                  sx={ {
                    background: lbl.color,
                    color: theme.palette.getContrastText(lbl.color),
                    "& .MuiChip-icon": {color: "inherit !important"},
                  } }
                />
              );
            }) }
          </Box>
        );
      } }
      MenuProps={ {
        PaperProps: {
          sx: {
            maxHeight: 300,
          },
        },
      } }
    >
      { labels.map((lbl) => (
        <MenuItem
          key={ lbl.id }
          value={ lbl.id }
          sx={ {
            display: "flex",
            alignItems: "center",
            gap: 2,
          } }
        >
          <Checkbox checked={ value.includes(lbl.id) }/>

          <ListItemIcon>
            { lbl.icon ?? (
              <LabelIcon
                sx={ {color: lbl.color} }
              />
            ) }
          </ListItemIcon>

          <ListItemText primary={ lbl.name }/>
        </MenuItem>
      )) }
    </Select>
  );
}

