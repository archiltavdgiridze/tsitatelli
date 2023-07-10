import React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectedNames) {
  return {
    fontWeight: selectedNames.includes(name) ? "medium" : "regular",
  };
}

const MultipleSelectChip = ({ title, names, selectedNames, onChange }) => {
  const handleChange = (event) => {
    const { value } = event.target;
    onChange(value);
  };

  // console.log(selectedNames);

  return (
    <FormControl sx={{ m: 0.5, width: 350 }}>
      <InputLabel id={`chip-label`}>{title}</InputLabel>
      <Select
        labelId={`chip-label-id`}
        id={`chipselector`}
        multiple
        value={selectedNames}
        onChange={handleChange}
        input={<OutlinedInput id={`select-chip`} label={title} />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
              />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--accentColor)", // Customize the outline color
          },
          "& .MuiInputBase-input": {
            fontSize: "16px", // Customize the font size
          },
        }}
      >
        {names.map((name) => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, selectedNames)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelectChip;
