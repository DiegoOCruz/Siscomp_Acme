import { useEffect, useState } from "react";
import {
  addCotacao,
  getCotacao,
  getRequisicaoDeCompra,
  updateCotacao,
  updateRequisicaoDeCompra,
} from "./Cotacoes";
import {
  Grid,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Typography,
  Paper,
  TableCell,
  TableBody,
  Box,
  AddButton,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "../../Components";
//--------Accordion-----------------
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import PapperComponent from "../../Components/Paper";
//-------------------------
import { getFornecedor, getProducts } from "./Cotacoes";


export default function CotacoesForm() {
  const [requisicaoDeCompra, setRequisicaoDeCompra] = useState([]);
  const [open, setOpen] = useState(false);
  const [cotacaoAberta, setCotacaoAberta] = useState({});

  const dBRequisicoes = async () => {
    const dados = await getRequisicaoDeCompra();
    setRequisicaoDeCompra([...dados]);
  };

  //---------------------- UseEffect para carregar os produtos e fornecedores -------------------//
  const [produtoList, setProdutoList] = useState([]);
  const [fornecedorList, setFornecedorList] = useState([]);

  const loadProdutos = async () => {
    const produtos = await getProducts();
    setProdutoList(produtos);
    //console.log(produtos);
  };

  const loadFornecedores = async () => {
    const fornecedores = await getFornecedor();
    setFornecedorList(fornecedores);
    //console.log(fornecedores);
  };

  useEffect(() => {
    dBRequisicoes();
    loadProdutos();
    loadFornecedores();
    //console.log(requisicaoDeCompra);
  }, []);

  //--------Carregar Cotaçoes----------------
  const [cotacoes, setCotacoes] = useState([]);

  const loadCotacoes = async () => {
    const dados = await getCotacao();
    setCotacoes(dados);
    //console.log(cotacoes);
  };
  useEffect(() => {
    loadCotacoes();
  }, []);

  //-----------------------------------------

  //--------Accordion-----------------
  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&::before": {
      display: "none",
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
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

  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  //-----------------------------

  //------Dialog---------------
  const handleClickOpen = (cotacao) => {
    setCotacaoAberta(cotacao);
    //console.log(cotacaoAberta.id);
    setOpen(true);
    //console.log(cotacao);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //---------------------------

  //---------Objeto para envio-------------------
  const [fornecedor, setFornecedor] = useState("");
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [precoUni, setPrecoUni] = useState("");
  const [total, setTotal] = useState("");
  const [cotacoesList, setCotacoesList] = useState([]);

  const handleFornecedorChange = (e) => {
    setFornecedor(e.target.value);
  };
  const handleProdutoChange = (e) => {
    setProduto(e.target.value);
  };
  const handleQuantidadeChange = (e) => {
    setQuantidade(e.target.value);
  };
  const handlePrecoUniChange = (e) => {
    setPrecoUni(e.target.value);
  };
  useEffect(() => {
    setTotal((parseFloat(quantidade) * parseFloat(precoUni)).toFixed(2));
  }, [quantidade, precoUni]);

  const handleInserir = () => {
    if (cotacoesList.length < 3) {
      const dados = {
        fornecedor: fornecedor,
        produto: produto,
        quantidade: quantidade,
        precoUni: precoUni,
        valorTotal: total,
      };
      setCotacoesList([...cotacoesList, dados]);
      setFornecedor("");
      setProduto("");
      setQuantidade("");
      setPrecoUni("");
      //console.log(cotacoesList);
      //TODO: alterar status do pedido compra para em aberto
    } else {
      alert("Limite de cotações atingido");
    }
  };

  const handleSubmit = () => {
    if (!upDate) {
      const status = cotacoesList.length === 3 ? "fechada" : "em cotacao";
      const dados = {
        data: cotacaoAberta.data,
        prioridade: cotacaoAberta.prioridade,
        produto: cotacaoAberta.produto,
        quantidade: cotacaoAberta.quantidade,
        observacoes: cotacaoAberta.observacoes,
        solicitante: cotacaoAberta.solicitante,
        status: status,
        obsAdmin: obsAdmin,
        cotacoes: converterObject(cotacoesList),
      };
      addCotacao(dados);
      dBRequisicoes();
      updateRequisicaoDeCompra(cotacaoAberta);
      setCotacaoAberta("");
      setCotacoesList([]);
      loadCotacoes();
      setOpen(false);
      console.log(dados);
    } else {
      const status = cotacoesList.length === 3 ? "fechada" : "em cotacao";
      const dados = {
        obsAdmin: obsAdmin,
        idCotacao: cotacaoAberta.id,
        cotacoes: converterObject(cotacoesList),
        status: status,
      };
      updateCotacao(dados);
      loadCotacoes();
      dBRequisicoes();
      setCotacaoAberta("");
      setCotacoesList([]);
      console.log(dados);
      setUpdate(false);
      setOpen(false);
    }
  };

  const converterObject = (fields) => {
    let cotacoesObj = {};
    fields.forEach((field, index) => {
      cotacoesObj[`fornecedor_${index}`] = {
        fornecedor: field.fornecedor,
        preco: field.precoUni,
        total: field.valorTotal,
      };
    });
    return cotacoesObj;
  };
  //----------------------------------------------
  //------Dialog2---------------
  const [upDate, setUpdate] = useState(false);
  const handleClickOpen2 = (row) => {
    setCotacaoAberta(row);
    console.log(row);
    // Acessar as cotações do fornecedor diretamente a partir do objeto row
    const fornecedores = Object.keys(row.cotacoes).map((key) => {
      const fornecedor = row.cotacoes[key];
      return {
        produto: row.produto,
        fornecedor: fornecedor.fornecedor,
        quantidade: parseFloat(fornecedor.total / fornecedor.preco),
        precoUni: fornecedor.preco,
        valorTotal: fornecedor.total,
      };
    });

    // Atualizar o estado com a lista de cotações
    setCotacoesList(fornecedores);

    console.log(fornecedores);
    setUpdate(true);
    setOpen(true);
  };

  //----------------------------------------------
  const [observacoes, setObservacoes] = useState(false);
  const [obsAdmin, setObsAdmin] = useState("");
  const handleObservacoes = () => {
    if (cotacoesList.length > 1) {
      //console.log(observacoes);
      setObservacoes(true);
  }
};

  return (
    <>
      <Grid
        xs={12}
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <Grid item>
          <Typography variant="h4" sx={{ marginBottom: "20px" }}>
            Cotações
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <Grid item>
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
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <PapperComponent>
                  <TableContainer>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="left"
                          sx={{
                            fontWeight: "bold",
                          }}
                        >
                          DATA
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            fontWeight: "bold",
                          }}
                        >
                          PRIORIDADE
                        </TableCell>
                        <TableCell
                          align="left"
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
                          QUANTIDADE
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            fontWeight: "bold",
                          }}
                        >
                          OBSERVAÇÕES
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            fontWeight: "bold",
                          }}
                        >
                          SOLICITANTE
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {requisicaoDeCompra.map((row, index) => {
                        if (row.status === "aberta") {
                          return (
                            <TableRow key={index}>
                              <TableCell align="left">{row.data}</TableCell>
                              <TableCell align="left">
                                {row.prioridade}
                              </TableCell>
                              <TableCell align="left">{row.produto}</TableCell>
                              <TableCell align="left">
                                {row.quantidade}
                              </TableCell>
                              <TableCell align="left">
                                {row.observacoes}
                              </TableCell>
                              <TableCell align="left">
                                {row.solicitante.nome}
                              </TableCell>
                              <TableCell align="left">
                                <AddButton
                                  onClick={() => {
                                    handleClickOpen(row);
                                  }}
                                >
                                  Adicionar cotação
                                </AddButton>
                              </TableCell>
                            </TableRow>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </TableBody>
                  </TableContainer>
                </PapperComponent>
              </Grid>
            </AccordionDetails>
          </Accordion>
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
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <PapperComponent>
                  <TableContainer>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="left"
                          sx={{
                            fontWeight: "bold",
                          }}
                        >
                          DATA
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            fontWeight: "bold",
                          }}
                        >
                          PRIORIDADE
                        </TableCell>
                        <TableCell
                          align="left"
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
                          QUANTIDADE
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            fontWeight: "bold",
                          }}
                        >
                          OBSERVAÇÕES
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            fontWeight: "bold",
                          }}
                        >
                          SOLICITANTE
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            fontWeight: "bold",
                          }}
                        ></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cotacoes.map((row, index) => {
                        if (row.status === "em cotacao") {
                          return (
                            <TableRow key={index}>
                              <TableCell align="left">{row.data}</TableCell>
                              <TableCell align="left">
                                {row.prioridade}
                              </TableCell>
                              <TableCell align="left">{row.produto}</TableCell>
                              <TableCell align="left">
                                {row.quantidade}
                              </TableCell>
                              <TableCell align="left">
                                {row.observacoes}
                              </TableCell>
                              <TableCell align="left">
                                {row.solicitante.nome}
                              </TableCell>
                              <TableCell align="left">
                                <AddButton
                                  onClick={() => {
                                    handleClickOpen2(row);
                                  }}
                                >
                                  Continuar cotação
                                </AddButton>
                              </TableCell>
                            </TableRow>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </TableBody>
                  </TableContainer>
                </PapperComponent>
              </Grid>
            </AccordionDetails>
          </Accordion>
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
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <PapperComponent>
                  <TableContainer>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="left"
                          sx={{
                            fontWeight: "bold",
                          }}
                        >
                          DATA
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            fontWeight: "bold",
                          }}
                        >
                          PRIORIDADE
                        </TableCell>
                        <TableCell
                          align="left"
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
                          QUANTIDADE
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            fontWeight: "bold",
                          }}
                        >
                          OBSERVAÇÕES
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            fontWeight: "bold",
                          }}
                        >
                          SOLICITANTE
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cotacoes.map((row, index) => {
                        if (row.status === "fechada") {
                          return (
                            <TableRow key={index}>
                              <TableCell align="left">{row.data}</TableCell>
                              <TableCell align="left">
                                {row.prioridade}
                              </TableCell>
                              <TableCell align="left">{row.produto}</TableCell>
                              <TableCell align="left">
                                {row.quantidade}
                              </TableCell>
                              <TableCell align="left">
                                {row.observacoes}
                              </TableCell>
                              <TableCell align="left">
                                {row.solicitante.nome}
                              </TableCell>
                            </TableRow>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </TableBody>
                  </TableContainer>
                </PapperComponent>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
      {
        <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
          <DialogTitle>Informações pedido de compra:</DialogTitle>
          <DialogContent>
            {cotacaoAberta && (
              <>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    padding: "16px",
                    borderRadius: "4px",
                    marginBottom: "16px",
                  }}
                >
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
                    defaultValue={cotacaoAberta.id}
                  />
                  <TextField
                    required
                    margin="dense"
                    id="Produto"
                    name="Produto"
                    label="Produto"
                    type="text"
                    fullWidth
                    variant="standard"
                    InputProps={{
                      readOnly: true,
                    }}
                    defaultValue={cotacaoAberta.produto}
                  />
                  <TextField
                    required
                    margin="dense"
                    id="quantidade"
                    name="quantidade"
                    label="quantidade"
                    type="text"
                    fullWidth
                    variant="standard"
                    InputProps={{
                      readOnly: true,
                    }}
                    defaultValue={cotacaoAberta.quantidade}
                  />
                  <TextField
                    required
                    margin="dense"
                    id="Observações"
                    name="Observações"
                    type="text"
                    fullWidth
                    variant="standard"
                    label="Observações"
                    multiline
                    rows={1}
                    InputProps={{
                      readOnly: true,
                    }}
                    defaultValue={cotacaoAberta.observacoes}
                  />
                </Box>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    padding: "16px",
                    borderRadius: "4px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography>Insira as Cotações: </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: "10px",
                    }}
                  >
                    <FormControl
                      sx={{
                        flex: 1,
                      }}
                    >
                      <InputLabel id="fornecedor-select-label">
                        Fornecedor
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="fornecedor-select-label"
                        id="fornecedor-select"
                        label="Fornecedor"
                        value={fornecedor} // Valor selecionado
                        onChange={handleFornecedorChange} // Função de mudança
                      >
                        {fornecedorList.map((fornecedor, index) => (
                          <MenuItem key={index} value={fornecedor.razaoSocial}>
                            {fornecedor.razaoSocial}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl
                      sx={{
                        flex: 1,
                      }}
                    >
                      <InputLabel id="produto-select-label">Produto</InputLabel>
                      <Select
                        fullWidth
                        labelId="produto-select-label"
                        id="produto-select"
                        label="Produto"
                        value={produto} // Valor selecionado
                        onChange={handleProdutoChange} // Função de mudança
                      >
                        {produtoList.map((produto, index) => (
                          <MenuItem key={index} value={produto.nome}>
                            {produto.nome}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      sx={{ flex: 1 }}
                      type="number"
                      label="Quantidade"
                      value={quantidade}
                      onChange={handleQuantidadeChange}
                      fullWidth
                    />
                    <TextField
                      sx={{ flex: 1 }}
                      type="number"
                      label="Valor Unitário"
                      value={precoUni}
                      onChange={handlePrecoUniChange}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">R$</InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      sx={{ flex: 1 }}
                      type="number"
                      label="Total"
                      fullWidth
                      value={total}
                      InputProps={{
                        readOnly: true,
                        startAdornment: (
                          <InputAdornment position="start">R$</InputAdornment>
                        ),
                      }}
                    />
                    <AddButton
                      onClick={() => {
                        handleInserir();
                        handleObservacoes();
                      }}
                    >
                      Adicionar
                    </AddButton>
                  </Box>
                </Box>
              </>
            )}
          </DialogContent>
          {cotacoesList.length > 0 && (
            <DialogContent>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  padding: "16px",
                  borderRadius: "4px",
                }}
              >
                <Typography>Cotações Inseridas:</Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    width: "100%",
                    marginTop: "20px",
                  }}
                >
                  <TableContainer
                    component={Paper}
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Table>
                      {/* Cabeçalho e corpo da tabela */}
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Fornecedor</TableCell>
                          <TableCell align="left">Produto</TableCell>
                          <TableCell align="left">Quantidade</TableCell>
                          <TableCell align="left">Valor Unitário</TableCell>
                          <TableCell align="left">Total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cotacoesList.map((cotacao, index) => (
                          <TableRow key={index}>
                            <TableCell align="left">
                              {cotacao.fornecedor}
                            </TableCell>
                            <TableCell align="left">
                              {cotacao.produto}
                            </TableCell>
                            <TableCell align="left">
                              {cotacao.quantidade}
                            </TableCell>
                            <TableCell align="left">
                              R$ {cotacao.precoUni}
                            </TableCell>
                            <TableCell align="left">
                              R$ {cotacao.valorTotal}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {observacoes && (
                    <TextField
                      margin="dense"
                      id="observacoes"
                      name="observacoes"
                      label="Observações"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={(e) => setObsAdmin(e.target.value)}
                    />
                  )}
                </Box>
              </Box>
            </DialogContent>
          )}

          <DialogActions>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="outlined" onClick={handleSubmit}>
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      }
    </>
  );
}
