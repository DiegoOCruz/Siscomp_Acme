import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduct, getProducts, updateProducts } from "./Product";
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
  HomeButton,
  AddButton,
} from "../../Components";

import { DeleteIcon, EditIcon } from "../../Components/Icons";

export default function ProdutosList() {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const db = async () => {
    const products = await getProducts();
    const list = products.map((product) => ({
      id: product.id,
      nome: product.nome,
      descricao: product.descricao,
      ncm: product.ncm,
    }));
    setRows(list);
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
    setSearchQuery(event.target.value);
  };

  const handleClickOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const updatedProduct = {
      id: formJson.id,
      nome: formJson.nome,
      descricao: formJson.descricao,
      ncm: formJson.ncm,
    };
    await updateProducts(updatedProduct);
    handleClose();
    db(); //Atualiza a lista de produtos após a edição
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    db(); //Atualiza a lista de produtos após a exclusão
  };

  const filteredRows = rows.filter(
    (row) =>
      row.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.descricao.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.ncm.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    db();
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
      <Typography variant="h3">Lista de Produtos</Typography>

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
            label="Buscar Produto"
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
                      ID
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      PRODUTO
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      DESCRIÇÃO
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      NCM
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        width: "5px",
                      }}
                    ></TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        width: "5px",
                      }}
                    ></TableCell>
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
                          <TableCell component="th" scope="row" align="left">
                            {row.id}
                          </TableCell>
                          <TableCell>{row.nome}</TableCell>
                          <TableCell align="left">{row.descricao}</TableCell>
                          <TableCell align="center">{row.ncm}</TableCell>
                          <TableCell>
                            <Button 
                              variant="outlined"
                              onClick={() => handleClickOpen(row)}>
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
                              {selectedProduct && (
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
                                    defaultValue={selectedProduct.id}
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
                                    defaultValue={selectedProduct.nome}
                                  />
                                  <TextField
                                    required
                                    margin="dense"
                                    id="descricao"
                                    name="descricao"
                                    label="Descrição"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    defaultValue={selectedProduct.descricao}
                                  />
                                  <TextField
                                    required
                                    margin="dense"
                                    id="ncm"
                                    name="ncm"
                                    label="NCM"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    defaultValue={selectedProduct.ncm}
                                  />
                                </>
                              )}
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={handleClose}
                                variant="outlined"
                                color="error"
                              >
                                Cancelar
                              </Button>
                              <Button type="submit">Salvar</Button>
                            </DialogActions>
                          </Dialog>

                          <TableCell>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => handleDelete(row.id)}
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
              count={filteredRows.length}
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
          <AddButton>
            <Link to="/produtos/form">adicionar novo produto</Link>
          </AddButton>
        </Box>
      </Grid>
    </Grid>
  );
}
