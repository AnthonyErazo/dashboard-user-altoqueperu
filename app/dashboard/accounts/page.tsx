"use client";

import { useEffect, useState } from 'react';
import {
  Box, Typography, Button, TextField, Select, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, InputAdornment, Dialog, DialogActions, DialogContent, DialogTitle, Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Account } from '@/app/models/Account';
import { addAccountToAPI, deleteAccountFromAPI, getAccountsFromAPI } from './api/accountApi'; // Simulación de API

const banksList = ['BCP', 'Scotiabank', 'BanBif', 'BBVA', 'Interbank'];

export default function Accounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedAccountIndex, setSelectedAccountIndex] = useState<number | null>(null);
  const [newAccount, setNewAccount] = useState<Account>({ banco: '', cuenta: '', alias: '' });

  // Obtener cuentas de la "API simulada" al montar el componente
  useEffect(() => {
    const storedAccounts = getAccountsFromAPI();
    setAccounts(storedAccounts);
  }, []);

  // Función para agregar una nueva cuenta
  const handleAddAccount = () => {
    addAccountToAPI(newAccount); // Agregar a la "API simulada"
    setAccounts(getAccountsFromAPI()); // Actualizar el estado local con las cuentas actuales
    setOpenAddModal(false); // Cerrar el modal de agregar
    setNewAccount({ banco: '', cuenta: '', alias: '' }); // Resetear los valores del formulario
  };

  // Función para confirmar la eliminación de la cuenta seleccionada
  const confirmDelete = () => {
    if (selectedAccountIndex !== null) {
      deleteAccountFromAPI(selectedAccountIndex); // Eliminar de la "API simulada"
      setAccounts(getAccountsFromAPI()); // Actualizar el estado local con las cuentas actuales
      setSelectedAccountIndex(null); // Limpiar el índice seleccionado
      setOpenDeleteModal(false); // Cerrar el modal de eliminación
    }
  };

  // Manejar cambios en el campo de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);

  // Verificar si todos los campos del formulario están completos
  const isFormValid = newAccount.banco !== '' && newAccount.cuenta !== '' && newAccount.alias !== '';

  // Filtrar cuentas basadas en la búsqueda
  const filteredAccounts = accounts.filter((account) =>
    account.cuenta.includes(searchTerm) || account.alias.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={4} bgcolor="background.default" minHeight="100vh" width="100%">
      <Box maxWidth="lg" mx="auto" bgcolor="white" p={4} borderRadius={2} boxShadow={3}>
        {/* Encabezado */}
        <Grid container justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" color="primary">
            MIS CUENTAS BANCARIAS
          </Typography>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setOpenAddModal(true)}>
            AGREGAR CUENTA
          </Button>
        </Grid>

        {/* Campo de búsqueda */}
        <Grid container spacing={2} mb={4}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Buscar cuenta o alias"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </Grid>
        </Grid>

        {/* Tabla de cuentas */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>BANCO</TableCell>
                <TableCell>CUENTA</TableCell>
                <TableCell>ALIAS</TableCell>
                <TableCell align="center">ELIMINAR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAccounts.length > 0 ? (
                filteredAccounts.map((account, index) => (
                  <TableRow key={index}>
                    <TableCell>{account.banco}</TableCell>
                    <TableCell>{account.cuenta}</TableCell>
                    <TableCell>{account.alias}</TableCell>
                    <TableCell align="center">
                      <IconButton color="error" onClick={() => {
                        setSelectedAccountIndex(index);
                        setOpenDeleteModal(true);
                      }}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No se encontraron registros
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal para agregar cuenta */}
        <Dialog open={openAddModal} onClose={() => setOpenAddModal(false)}>
          <DialogTitle>Agregar nueva cuenta</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Banco"
                  fullWidth
                  select
                  value={newAccount.banco}
                  onChange={(e) => setNewAccount({ ...newAccount, banco: e.target.value })}
                >
                  {banksList.map((bank) => (
                    <MenuItem key={bank} value={bank}>
                      {bank}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Número de cuenta"
                  fullWidth
                  value={newAccount.cuenta}
                  onChange={(e) => setNewAccount({ ...newAccount, cuenta: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Alias"
                  fullWidth
                  value={newAccount.alias}
                  onChange={(e) => setNewAccount({ ...newAccount, alias: e.target.value })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddModal(false)} color="secondary" startIcon={<CloseIcon />}>
              Cancelar
            </Button>
            <Button onClick={handleAddAccount} color="primary" variant="contained" disabled={!isFormValid}>
              Agregar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Modal de confirmación de eliminación */}
        <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogContent>
            <Typography>¿Estás seguro de que deseas eliminar esta cuenta?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteModal(false)} color="secondary">
              Cancelar
            </Button>
            <Button onClick={confirmDelete} color="error" variant="contained">
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
