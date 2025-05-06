import { useContext } from "react";
import { VehicleContext } from "../contexts/VehicleContext";
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";

const VehicleResult = () => {
  const { state, dispatch } = useContext(VehicleContext);

  const handleSearch = async () => {
    dispatch({ type: "SET_ERROR", payload: "" });

    if (!state.selectedBrand || !state.selectedModel || !state.selectedYear) {
      dispatch({
        type: "SET_ERROR",
        payload: "Preencha todos os campos antes de consultar.",
      });
      return;
    }

    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const res = await fetch(
        `https://parallelum.com.br/fipe/api/v1/${state.vehicleType}/marcas/${state.selectedBrand}/modelos/${state.selectedModel}/anos/${state.selectedYear}`
      );

      if (!res.ok) throw new Error("Erro ao consultar a API.");

      const data = await res.json();
      dispatch({ type: "SET_RESULT", payload: data });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <>
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSearch}
          disabled={state.loading}
        >
          {state.loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Consultar Valor"
          )}
        </Button>
      </Box>

      {state.error && (
        <Box mt={2}>
          <Alert severity="error">{state.error}</Alert>
        </Box>
      )}

      {state.result && !state.loading && (
        <Box mt={3} p={3} bgcolor="#ffffff" borderRadius={2} boxShadow={2}>
          <Typography variant="h6" gutterBottom>
            {state.result.Modelo}
          </Typography>
          <Typography>Marca: {state.result.Marca}</Typography>
          <Typography>Ano Modelo: {state.result.AnoModelo}</Typography>
          <Typography>Combustível: {state.result.Combustivel}</Typography>
          <Typography fontWeight="bold">Valor: {state.result.Valor}</Typography>
        </Box>
      )}
    </>
  );
};

export default VehicleResult;
