import React, { useEffect, useState } from "react";
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
  HomeButton,
} from "../../Components"; 
import { getRequisicoes } from "./Requisicoes";
import AprovadoIcon from "../../Components/Icons/Aprovado";
import ReprovadoIcon from "../../Components/Icons/Reprovado";
import HomeIcon from "@mui/icons-material/Home";

export default function Requisicoes() {
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);

  const dB = async () => {
    const requisicoes = await getRequisicoes();
    const list = requisicoes.map((requisicao) => {
      return {
        id: requisicao.id,
        data: requisicao.data,
        cotacaoId: requisicao.cotacaoId,
        fornecedor: requisicao.fornecedor,
        produto: requisicao.produto,
        quantidade: requisicao.quantidade,
        precoUnitario: requisicao.preco,
        total: requisicao.total,
      };
    });
    setRows(list);
  };

  useEffect(() => {
    dB();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = rows.filter(
    (requisicao) =>
      (requisicao.cotacaoId
        ? requisicao.cotacaoId.toString().includes(searchQuery)
        : false) ||
      (requisicao.produto
        ? requisicao.produto.toLowerCase().includes(searchQuery.toLowerCase())
        : false) ||
      (requisicao.data
        ? requisicao.data.toString().includes(searchQuery)
        : false) ||
      (requisicao.fornecedor
        ? requisicao.fornecedor.includes(searchQuery)
        : false) ||
      (requisicao.data ? requisicao.data.includes(searchQuery) : false)
  );

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

  const handleClick = (id) => {
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
            label="Buscar Cotação"
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
                      DATA
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      COTAÇÃO ID
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      FORNECEDOR
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      PRODUTO
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      QUANTIDADE
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      VALOR UNITÁRIO
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      VALOR TOTAL
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        width: "5px",
                      }}
                    >
                      APROVAR
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        width: "5px",
                      }}
                    >
                      REPROVAR
                    </TableCell>
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
                          onClick={(event) => handleClick(row.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onClick={() => handleClick(row.id)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" align="left">
                            {row.data}
                          </TableCell>
                          <TableCell>{row.cotacaoId}</TableCell>
                          <TableCell align="left">{row.fornecedor}</TableCell>
                          <TableCell align="center">{row.produto}</TableCell>
                          <TableCell align="center">{row.quantidade}</TableCell>
                          <TableCell align="center">
                            {row.precoUnitario}
                          </TableCell>
                          <TableCell align="center">R$ {row.total}</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color="success"
                              onClick={() => {
                                alert("Aprovado");
                              }}
                            >
                              <AprovadoIcon />
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => {
                                alert("Reprovado");
                              }}                              
                            >
                              <ReprovadoIcon />
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
      </Grid>
    </Grid>
  );
}
