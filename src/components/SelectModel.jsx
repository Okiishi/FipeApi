import { useContext, useEffect } from "react";
import { VehicleContext } from "../contexts/VehicleContext";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SelectModel = () => {
  const { state, dispatch } = useContext(VehicleContext);

  useEffect(() => {
    if (state.selectedBrand) {
      fetch(
        `https://parallelum.com.br/fipe/api/v1/${state.vehicleType}/marcas/${state.selectedBrand}/modelos`
      )
        .then((res) => res.json())
        .then((data) =>
          dispatch({ type: "SET_MODELS", payload: data.modelos })
        );
    }
  }, [state.vehicleType, state.selectedBrand]);

  const handleChange = (e) => {
    dispatch({ type: "SET_SELECTED_MODEL", payload: e.target.value });
  };

  return (
    <FormControl
      fullWidth
      margin="normal"
      sx={{ mb: 2 }}
      disabled={!state.selectedBrand}
    >
      <InputLabel>Modelo</InputLabel>
      <Select
        value={state.selectedModel}
        onChange={handleChange}
        label="Modelo"
      >
        {state.models.map((model) => (
          <MenuItem key={model.codigo} value={model.codigo}>
            {model.nome}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectModel;
