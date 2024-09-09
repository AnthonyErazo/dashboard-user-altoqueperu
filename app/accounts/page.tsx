"use client";

import { useState } from 'react';
import { Box, Typography, Button, TextField, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

export default function Accounts() {
  const [accounts, setAccounts] = useState([
    {
      banco: 'BCP',
      cuenta: '191-12345678-0-12',
      titular: 'Juan Pérez',
      moneda: 'Soles',
    },
    {
      banco: 'Interbank',
      cuenta: '309-87654321-0-98',
      titular: 'María González',
      moneda: 'Dólares',
    },
    {
      banco: 'BBVA',
      cuenta: '0011-98765432-1-23',
      titular: 'Carlos Ruiz',
      moneda: 'Soles',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currencyFilter, setCurrencyFilter] = useState('Ambos');

  const handleDelete = (index) => {
    const updatedAccounts = accounts.filter((_, i) => i !== index);
    setAccounts(updatedAccounts);
  };

  const handleAddAccount = () => {
    const newAccount = {
      banco: 'Scotiabank',
      cuenta: '421-11112222-3-34',
      titular: 'Lucía Fernández',
      moneda: 'Dólares',
    };
    setAccounts([...accounts, newAccount]);
  };

  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch = account.cuenta.includes(searchTerm) || account.titular.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCurrency = currencyFilter === 'Ambos' || account.moneda === currencyFilter;
    return matchesSearch && matchesCurrency;
  });

  return (
    <Box p={4} bgcolor="background.default" minHeight="100vh">
      <Box maxWidth="lg" mx="auto" bgcolor="white" p={4} borderRadius={2} boxShadow={3}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" color="primary">
            MIS CUENTAS BANCARIAS
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddAccount}
          >
            AGREGAR CUENTA
          </Button>
        </Box>

        {/* Filtros */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
          {/* Buscar por cuenta o titular */}
          <TextField
            label="Buscar cuenta o titular"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: { xs: '100%', sm: '45%' } }}
          />

          {/* Filtro por tipo de moneda */}
          <Box display="flex" alignItems="center">
            <Typography variant="subtitle1" color="primary" mr={2}>
              Seleccione tipo de Moneda:
            </Typography>
            <Select
              value={currencyFilter}
              onChange={(e) => setCurrencyFilter(e.target.value)}
              variant="outlined"
              sx={{ width: 200 }}
            >
              <MenuItem value="Ambos">Ambos</MenuItem>
              <MenuItem value="Soles">Soles</MenuItem>
              <MenuItem value="Dólares">Dólares</MenuItem>
            </Select>
          </Box>
        </Box>

        {/* Tabla de cuentas */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>BANCO</TableCell>
                <TableCell>CUENTA</TableCell>
                <TableCell>TITULAR</TableCell>
                <TableCell>MONEDA</TableCell>
                <TableCell align="center">ELIMINAR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAccounts.length > 0 ? (
                filteredAccounts.map((account, index) => (
                  <TableRow key={index}>
                    <TableCell>{account.banco}</TableCell>
                    <TableCell>{account.cuenta}</TableCell>
                    <TableCell>{account.titular}</TableCell>
                    <TableCell>{account.moneda}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No se encontraron registros
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
