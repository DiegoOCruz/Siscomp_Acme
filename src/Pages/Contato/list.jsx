import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Checkbox,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  HomeButton,
  AddButton,
} from "../../Components";

import { DeleteIcon, EditIcon } from "../../Components/Icons";

import { useEffect, useState } from "react";

import {
  getContato,
  updateContato,
  getFornecedor,
  deleteContato,
} from "./Contato";

export default function ContatoList() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para a consulta de busca
  const [open, setOpen] = useState(false);
  const [selectedContato, setSelectedContato] = useState(null);
  const [fornecedor, setFornecedor] = useState("");
  const [fornecedores, setFornecedores] = useState([]);

  const handleFornecedor = (event) => {
    setFornecedor(event.target.value);
  };

  const handleClickOpen = (contato) => {
    setSelectedContato(contato);
    setFornecedor(contato.fornecedor || "");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedContato(null);
  };

  const handleDelete = async (id) => {
    await deleteContato(id);
    db(); //Atualiza a lista de produtos após a exclusão
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const updatedContato = {
      id: formJson.id,
      nome: formJson.nome,
      email: formJson.email,
      telefone: formJson.telefone,
      fornecedor: fornecedor, // Usar o estado fornecedor atualizado
    };

    await updateContato(updatedContato);
    handleClose();
    db(); //Atualiza a lista de produtos após a edição
  };

  const db = async () => {
    const tempRows = await getContato();
    const newRow = tempRows.map((row) => ({
      id: row.id,
      nome: row.nome,
      email: row.email,
      telefone: row.telefone,
      fornecedor: row.fornecedor,
    }));
    setRows(newRow);
  };

  const fetchFornecedores = async () => {
    const tempFornecedores = await getFornecedor();
    setFornecedores(tempFornecedores);
    //console.log(fornecedores)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleSearchChange = (event) => {
    // Função para atualizar a consulta de busca
    setSearchQuery(event.target.value);
  };

  // Filtrar rows com base na consulta de busca
  const filteredRows = rows.filter(
    (row) =>
      row.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.telefone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.fornecedor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    db();
    fetchFornecedores(); // Carregar fornecedores quando o componente for montado
  }, []);

  return (
    <Grid
      xs={12}
      container={true}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        height: "100vh",
        gap: "10px",
        padding: "20px",
      }}
    >
      <Typography variant="h3">Lista de Contatos</Typography>

      <Grid item={true} xs={12}>
        <Grid
          container
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "20px",
            with: "80%",
          }}
        >
          <TextField
            label="Localizar Contato"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              width: "80%",
            }}
          />
        </Grid>
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper
            sx={{
              width: "80%",
            }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={
                          selected.length > 0 && selected.length < rows.length
                        }
                        checked={
                          rows.length > 0 && selected.length === rows.length
                        }
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      NOME
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      E-MAIL
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      TELEFONE
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      FORNECEDOR
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const isItemSelected = isSelected(row.id);
                      return (
                        <TableRow
                          key={row.id}
                          hover
                          onClick={(event) => handleClick(event, row.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isItemSelected} />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.nome}
                          </TableCell>
                          <TableCell align="left">{row.email}</TableCell>
                          <TableCell align="center">{row.telefone}</TableCell>
                          <TableCell align="center">{row.fornecedor}</TableCell>
                          <TableCell
                            sx={{
                              width: "10px",
                            }}
                          >
                            <Button
                              onClick={() => handleClickOpen(row)}
                              variant="outlined"
                            >
                              <EditIcon />
                            </Button>
                          </TableCell>

                          <Dialog
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                              component: "form",
                              onSubmit: handleEditSubmit,
                            }}
                          >
                            <DialogTitle>Editar</DialogTitle>
                            <DialogContent>
                              <DialogContentText>
                                Altere os campos abaixo para editar seu
                                conteúdo.
                              </DialogContentText>
                              {selectedContato && (
                                <>
                                  <TextField
                                    required
                                    margin="dense"
                                    id="id"
                                    name="id"
                                    label="ID"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    InputProps={{
                                      readOnly: true,
                                    }}
                                    defaultValue={selectedContato.id}
                                  />
                                  <TextField
                                    required
                                    margin="dense"
                                    id="nome"
                                    name="nome"
                                    label="Nome"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    defaultValue={selectedContato.nome}
                                  />
                                  <TextField
                                    required
                                    margin="dense"
                                    id="email"
                                    name="email"
                                    label="E-mail"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    defaultValue={selectedContato.email}
                                  />
                                  <TextField
                                    required
                                    margin="dense"
                                    id="telefone"
                                    name="telefone"
                                    label="Telefone"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    defaultValue={selectedContato.telefone}
                                  />
                                  <FormControl
                                    sx={{
                                      width: "100%",
                                      marginTop: "5px",
                                    }}
                                  >
                                    <InputLabel id="Fornecedor">
                                      Fornecedor
                                    </InputLabel>
                                    <Select
                                      value={fornecedor}
                                      onChange={handleFornecedor}
                                      label="Fornecedor"
                                    >
                                      {fornecedores.map((fornecedor, index) => (
                                        <MenuItem
                                          key={index}
                                          value={fornecedor.razaoSocial}
                                        >
                                          {fornecedor.razaoSocial}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </>
                              )}
                            </DialogContent>
                            <DialogActions>
                              <Button
                                variant="outlined"
                                color="error"
                                onClick={handleClose}
                              >
                                Cancelar
                              </Button>
                              <Button 
                                variant="outlined"
                                type="submit">Salvar</Button>
                            </DialogActions>
                          </Dialog>

                          <TableCell
                            sx={{
                              width: "10px",
                            }}
                          >
                            <Button
                              onClick={() => handleDelete(row.id)}
                              variant="outlined"
                              color="error"
                            >
                              <DeleteIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredRows.length} // Atualizar a contagem com base nas linhas filtradas
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Box>
          <HomeButton />
        </Box>
        <Box>
          <AddButton to="/contato/form">Adicionar novo contato</AddButton>
        </Box>
      </Grid>
    </Grid>
  );
}
