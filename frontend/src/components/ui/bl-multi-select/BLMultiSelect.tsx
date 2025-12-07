import * as React from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

export default function BLMultiSelect() {
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleChange = (event: any) => {
    setSelected(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="multi-select-label">Fruits</InputLabel>
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
}
