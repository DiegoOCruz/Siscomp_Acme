import { useEffect, useState } from "react";
import {
  deleteCotacao,
  deleteRequisicaoDeCompra,
  getCotacao,
  getRequisicaoDeCompra,
} from "./Cotacoes";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "../../Components";
import {
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import DeleteIcon from "@mui/icons-material/Delete";
import IosShareIcon from "@mui/icons-material/IosShare";
import { saveAs } from "file-saver";
import { styled } from "@mui/material/styles";
import InfoIcon from "@mui/icons-material/Info";
//--------------------Accordion--------------------

// Definição dos componentes do Accordion
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

//-------------------------------------------------

export default function CotacoesList({ userLogin }) {
  const [requisicoesDeCompra, setRequisicoesDeCompra] = useState([]);
  const [cotacoesEmCotacao, setCotacoesEmCotacao] = useState([]);
  const [cotacoesFechada, setCotacoesFechada] = useState([]);

  const load = () => {
    loadRequisicoesdeCompra();
    loadCotacoesEmCotacao();
    loadCotacoesFechada();
  };

  const loadRequisicoesdeCompra = async () => {
    const dados = await getRequisicaoDeCompra();
    const dadoList = dados.filter(
      (dado) => dado.status === "aberta" && dado.solicitante.id === userLogin.id
    );
    setRequisicoesDeCompra(dadoList);
  };

  const loadCotacoesEmCotacao = async () => {
    const dados = await getCotacao();
    const dadoList = dados.filter(
      (dado) =>
        dado.status === "em cotacao" && dado.solicitante.id === userLogin.id
    );
    setCotacoesEmCotacao(dadoList);
  };

  const loadCotacoesFechada = async () => {
    const dados = await getCotacao();
    const dadoList = dados.filter(
      (dado) =>
        dado.status === "fechada" && dado.solicitante.id === userLogin.id
    );
    setCotacoesFechada(dadoList);
    console.log(dadoList);
  };

  useEffect(() => {
    load();
  }, []);

  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleDeleteRequisicaoDeCompra = async (id) => {
    await deleteRequisicaoDeCompra(id);
    load();
  };

  const handleDeleteCotacao = async (id) => {
    await deleteCotacao(id);
    load();
  };

  const exportToCsv = (row) => {
    const headers = [
      "DATA",
      "PRIORIDADE",
      "PRODUTO",
      "QUANTIDADE",
      "OBSERVAÇÕES",
      "OBSERVAÇÕES PARA COMPRA",
    ];
    const data = [
      row.data,
      row.prioridade,
      row.produto,
      row.quantidade,
      row.observacoes ? row.observacoes : "Não constam informações",
      row.obsAdmin ? row.obsAdmin : "Não constam informações",
    ];

    let csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      data.join(",");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "cotacao.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  //------Dialog----------------
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);

  const handleClickOpen = (row) => {
    setSelectedRow(row);
    console.log(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };
  //----------------------------

  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        width: "100%",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Lista de Cotações
      </Typography>

      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          width: "100%",
        }}
      >
        {/* Accordion de Requisições de Compra */}
        <Grid item sx={{ width: "100%" }}>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Box display="flex" alignItems="center">
                <Typography>Cotações status:</Typography>
                <Typography
                  sx={{ color: "#B22222", fontWeight: "bold", marginLeft: 1 }}
                >
                  EM ABERTO
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
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
                        PRIORIDADE
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        PRODUTO
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        QUANTIDADE
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        OBSERVAÇÕES DA REQUISIÇÃO
                      </TableCell>
                      <TableCell />
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {requisicoesDeCompra.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.data}</TableCell>
                        <TableCell>{row.prioridade}</TableCell>
                        <TableCell>{row.produto}</TableCell>
                        <TableCell>{row.quantidade}</TableCell>
                        <TableCell>
                          {row.observacoes
                            ? row.observacoes
                            : "Não constam informações"}
                        </TableCell>

                        <TableCell>
                          <Button
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            color="error"
                            onClick={() =>
                              handleDeleteRequisicaoDeCompra(row.id)
                            }
                          >
                            Excluir
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Accordion de Cotações em Cotação */}
        <Grid item sx={{ width: "100%", marginTop: "20px" }}>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <Box display="flex" alignItems="center">
                <Typography>Cotações status:</Typography>
                <Typography
                  sx={{ color: "#DAA520", fontWeight: "bold", marginLeft: 1 }}
                >
                  EM COTAÇÃO
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
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
                        PRIORIDADE
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        PRODUTO
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        QUANTIDADE
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        OBSERVAÇÕES
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        OBSERVAÇÕES PARA COMPRA
                      </TableCell>
                      <TableCell />
                      <TableCell />
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cotacoesEmCotacao.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.data}</TableCell>
                        <TableCell>{row.prioridade}</TableCell>
                        <TableCell>{row.produto}</TableCell>
                        <TableCell>{row.quantidade}</TableCell>
                        <TableCell>
                          {row.observacoes
                            ? row.observacoes
                            : "Não constam informações"}
                        </TableCell>
                        <TableCell>
                          {row.obsAdmin
                            ? row.obsAdmin
                            : "Não constam informações"}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            startIcon={<InfoIcon />}
                            color="secondary"
                            onClick={() => handleClickOpen(row)}
                          >
                            informações
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            color="error"
                            onClick={() => handleDeleteCotacao(row.id)}
                          >
                            Excluir
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            startIcon={<IosShareIcon />}
                            color="warning"
                            onClick={() => {
                              exportToCsv(row);
                            }}
                          >
                            Exportar para csv
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Accordion de Cotações Fechadas */}
        <Grid item sx={{ width: "100%", marginTop: "20px" }}>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              aria-controls="panel3d-content"
              id="panel3d-header"
            >
              <Box display="flex" alignItems="center">
                <Typography>Cotações status:</Typography>
                <Typography
                  sx={{ color: "#32CD32", fontWeight: "bold", marginLeft: 1 }}
                >
                  FECHADA
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
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
                        PRIORIDADE
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        PRODUTO
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        QUANTIDADE
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        OBSERVAÇÕES
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        OBSERVAÇÕES PARA COMPRA
                      </TableCell>
                      <TableCell />
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cotacoesFechada.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.data}</TableCell>
                        <TableCell>{row.prioridade}</TableCell>
                        <TableCell>{row.produto}</TableCell>
                        <TableCell>{row.quantidade}</TableCell>
                        <TableCell>
                          {row.observacoes
                            ? row.observacoes
                            : "Não constam informações"}
                        </TableCell>
                        <TableCell>
                          {row.obsAdmin
                            ? row.obsAdmin
                            : "Não constam informações"}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            startIcon={<InfoIcon />}
                            color="secondary"
                            onClick={() => handleClickOpen(row)}
                          >
                            informações
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            color="error"
                            onClick={() => handleDeleteCotacao(row.id)}
                          >
                            Excluir
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            startIcon={<IosShareIcon />}
                            color="warning"
                            onClick={() => {
                              exportToCsv(row);
                            }}
                          >
                            Exportar para csv
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>

          <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
            <DialogTitle>Cotações:</DialogTitle>
            <DialogContent>
              {selectedRow && selectedRow.cotacoes && (
                <>
                  <Table>
                    {/* Cabeçalho e corpo da tabela */}
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="left"
                          sx={{
                            fontWeight: "bold",
                          }}
                        >
                          Fornecedor
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            fontWeight: "bold",
                          }}
                        >
                          Produto
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            fontWeight: "bold",
                          }}
                        >
                          Quantidade
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            fontWeight: "bold",
                          }}
                        >
                          Valor Unitário
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            fontWeight: "bold",
                          }}
                        >
                          Total
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.values(selectedRow.cotacoes).map(
                        (cotacao, index) => (
                          <TableRow key={index}>
                            <TableCell align="left">
                              {cotacao.fornecedor}
                            </TableCell>
                            <TableCell align="left">
                              {selectedRow.produto}
                            </TableCell>
                            <TableCell align="left">
                              {cotacao.total / cotacao.preco}
                            </TableCell>
                            <TableCell align="left">
                              R$
                              {cotacao.preco !== null &&
                              cotacao.preco !== undefined
                                ? Number(cotacao.preco).toFixed(2)
                                : "0.00"}
                            </TableCell>
                            <TableCell align="left">
                              R$ {cotacao.total}
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="error" variant="outlined">
                Fechar
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </Grid>
  );
}
