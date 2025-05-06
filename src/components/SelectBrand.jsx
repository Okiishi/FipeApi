import { useContext, useEffect } from "react";
import { VehicleContext } from "../contexts/VehicleContext";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SelectBrand = () => {
  const { state, dispatch } = useContext(VehicleContext);

  useEffect(() => {
    fetch(`https://parallelum.com.br/fipe/api/v1/${state.vehicleType}/marcas`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "SET_BRANDS", payload: data }));
  }, [state.vehicleType]);

  const handleChange = (e) => {
    dispatch({ type: "SET_SELECTED_BRAND", payload: e.target.value });
  };

  return (
    <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
      <InputLabel>Marca</InputLabel>
      <Select value={state.selectedBrand} onChange={handleChange} label="Marca">
        {state.brands.map((brand) => (
          <MenuItem key={brand.codigo} value={brand.codigo}>
            {brand.nome}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectBrand;
