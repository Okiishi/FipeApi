import { VehicleProvider } from "./contexts/VehicleContext";
import SelectBrand from "./components/SelectBrand";
import SelectModel from "./components/SelectModel";
import SelectYear from "./components/SelectYear";
import VehicleResult from "./components/VehicleResult";
import { Container, Typography } from "@mui/material";

function App() {
  return (
    <VehicleProvider>
      <Container
        maxWidth="sm"
        sx={{ mt: 4, p: 4, bgcolor: "#f9f9f9", borderRadius: 2, boxShadow: 3 }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Consulta Tabela FIPE
        </Typography>
        <SelectBrand />
        <SelectModel />
        <SelectYear />
        <VehicleResult />
      </Container>
    </VehicleProvider>
  );
}

export default App;
