import { useContext, useEffect } from "react";
import { VehicleContext } from "../contexts/VehicleContext";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SelectYear = () => {
  const { state, dispatch } = useContext(VehicleContext);

  useEffect(() => {
    if (state.selectedBrand && state.selectedModel) {
      fetch(
        `https://parallelum.com.br/fipe/api/v1/${state.vehicleType}/marcas/${state.selectedBrand}/modelos/${state.selectedModel}/anos`
      )
        .then((res) => res.json())
        .then((data) => dispatch({ type: "SET_YEARS", payload: data }));
    }
  }, [state.selectedBrand, state.selectedModel]);

  const handleChange = (e) => {
    dispatch({ type: "SET_SELECTED_YEAR", payload: e.target.value });
  };

  return (
    <FormControl fullWidth margin="normal" disabled={!state.selectedModel}>
      <InputLabel>Ano</InputLabel>
      <Select value={state.selectedYear} onChange={handleChange} label="Ano">
        {state.years.map((year) => (
          <MenuItem key={year.codigo} value={year.codigo}>
            {year.nome}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectYear;
