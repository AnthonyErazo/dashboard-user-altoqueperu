"use client";

import { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import {
  Box,
  Button,
  Card,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  CardContent,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { DeleteIcon } from 'lucide-react';

export default function MyInfo() {
  return (
    <Box p={4} bgcolor="background.default" minHeight="100vh">
      <Card variant="outlined" sx={{ maxWidth: 1200, mx: "auto", p: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h5" component="h2">
            Datos Personales
          </Typography>
          <Typography variant="body2" color="textSecondary">
            03/08/2023
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} >
            <Grid container spacing={2} mb={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre(*)"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Apellido(*)"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="E-Mail(*)"
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} mb={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Tipo de Documento(*)</InputLabel>
                  <Select label="Tipo de Documento(*)">
                    <MenuItem value="DNI">DNI</MenuItem>
                    <MenuItem value="Pasaporte">Pasaporte</MenuItem>
                    <MenuItem value="CE">CE</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="N° Documento(*)"
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} mb={3}>
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>País(*)</InputLabel>
                  <Select label="País(*)">
                    <MenuItem value="Peru">Peru</MenuItem>
                    <MenuItem value="Otro">Otro</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Departamento(*)"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Provincia(*)"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Distrito(*)"
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="contained" color="primary" startIcon={<SaveIcon />}>
                Guardar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>

      <DocumentUpload />
    </Box>
  );
}

function DocumentUpload() {
  const [files, setFiles] = useState([
    {
      name: "DNI_anverso.jpg",
      size: "56.2 KB",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      name: "DNI_reverso.jpg",
      size: "58.4 KB",
      imageUrl: "https://via.placeholder.com/150",
    },
  ]);

  const handleDelete = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  return (
    <Box mt={4}>
      <Card variant="outlined" sx={{ maxWidth: 1200, mx: "auto", p: 4 }}>
        <Typography variant="h6" mb={2}>
          Documento de Identidad (*)
        </Typography>

        <Box display="flex" alignItems="start" gap={2} p={2} bgcolor="blue.50" borderRadius="8px" mb={4}>
          <FaInfoCircle color="blue" />
          <Typography variant="body2" color="blue">
            Cargue las imágenes del anverso y reverso del DNI, en formato jpg/jpeg con un peso menor a 500Kb.
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {files.map((file, index) => (
            <Grid item xs={12} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body2" noWrap>
                        {file.name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {file.size}
                      </Typography>
                    </Box>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => handleDelete(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Box>
  );
}
