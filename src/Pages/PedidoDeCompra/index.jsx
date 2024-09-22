import { Card, CardContent, Paper } from "@mui/material";
import {
  AddButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "../../Components";

import { useEffect, useState } from "react";
import { addRequisicaoDeCompra, getProducts } from "./PedidoDeCompra";

//TODO: colocar userLogin no lugar de "userLogin"
export default function PedidoDeCompra({userLogin}) {
  const [produtoList, setProdutoList] = useState([]);
 

  const outrosProdutos = [{ nome: "Outros", id: "outros" }];
  const arrayQtdeProdutos = ["1", "2", "3", "4", "5 +"];
  {/** 
  const userLogin = {
    nome: "Carol",
    email: "carol@rh.acme.com",
    id: "QZTfeyP3VmTxhLPxqe9wgQ1sfWa2",
    //TODO: apagar este objeto
  };
*/}
  const loadProdutos = async () => {
    const produtos = await getProducts();
    setProdutoList([...produtos, ...outrosProdutos]);
    //console.log(produtoList);
  };

  useEffect(() => {
    loadProdutos();
  }, []);

  //Dialog----------------------------------
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //-----------------------------------------
  //Captura de dados do formulário----------------
  const [prioridade, setPrioridade] = useState("");
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const handlePrioridade = (event) => {
    setPrioridade(event.target.value);
    //console.log(event.target.value);
  };
  const handleProduto = (event) => {
    setProduto(event.target.value);
    //console.log(event.target.value);
  };
  const handleQuantidade = (event) => {
    setQuantidade(event.target.value);
    //console.log(event.target.value);
  };
  const handleObservacoes = (event) => {
    setObservacoes(event.target.value);
    //console.log(event.target.value);
  };
  const handleEnviar = async () => {
    const requisicaoDeCompra = {
      data: new Date().toLocaleDateString('pt-BR'),
      prioridade: prioridade,
      produto: produto,
      quantidade: quantidade,
      observacoes: observacoes,
      status: "aberta",
      solicitante: userLogin,
    };
    await addRequisicaoDeCompra(requisicaoDeCompra);

    setPrioridade("");
    setProduto("");
    setQuantidade("");
    setObservacoes("");
  };

  //----------------------------------------------
  return (
    <Grid
      xs={12}
      sm={12}
      md={12}
      container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Instruções</DialogTitle>
        <DialogContent>
          <DialogContentText>
            1. Informe a prioridade da requisição no campo "Prioridade".
            <br />
            2. Selecione o produto desejado no campo "Produto".
            <br />
            3. Informe a quantidade desejada no campo "Quantidade".
            <br />
            4. Caso o produto desejado não esteja na lista, selecione "Outros" e
            informe o nome do produto no campo "Observações".
            <br />
            5. Caso a quantidade desejada seja maior que 5, selecione "5+" e
            coloque a quantidade desejada no campo "Observações". 6. Clique em
            "Enviar" para finalizar a requisição.
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="error">
            FECHAR
          </Button>
        </DialogActions>
      </Dialog>

      <Grid item xs={12}>
        <Typography variant="h3" align="center">
          Requisições de Compra
        </Typography>
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            container
            xs={12}
            sm={12}
            md={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Paper
              sx={{
                padding: "20px",
                width: "100%",
                marginBottom: "20px",
                width: "80%",
              }}
            >
              <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                Informe os produtos:
              </Typography>
              <FormControl
                fullWidth
                sx={{
                  gap: "10px",
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="prioridade-select-label">
                    Prioridade
                  </InputLabel>
                  <Select
                    labelId="prioridade-select-label"
                    id="prioridade-select"
                    label="prioridade"
                    value={prioridade}
                    onChange={handlePrioridade}
                  >
                    <MenuItem value={"alta"}>Alta</MenuItem>
                    <MenuItem value={"media"}>Média</MenuItem>
                    <MenuItem value={"baixa"}>Baixa</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="produto-select-label">Produto</InputLabel>
                  <Select
                    labelId="produto-select-label"
                    id="produto-select"
                    label="Produto"
                    value={produto}
                    onChange={handleProduto}
                  >
                    {produtoList.map((produto, index) => (
                      <MenuItem key={index} value={produto.nome}>
                        {produto.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="qtd-select-label">Quantidade</InputLabel>
                  <Select
                    labelId="qtd-select-label"
                    id="qtd-select"
                    label="quantidade"
                    value={quantidade}
                    onChange={handleQuantidade}
                  >
                    {arrayQtdeProdutos.map((numero, index) => (
                      <MenuItem key={index} value={numero}>
                        {numero}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  id="standard-multiline-static"
                  label="Observações"
                  multiline
                  rows={4}
                  value={observacoes}
                  onChange={handleObservacoes}
                />
              </FormControl>
            </Paper>
          </Grid>
          <Grid item>
            <Button
              onClick={handleClickOpen}
              variant="outlined"
              sx={{
                marginRight: 2,
              }}
            >
              Instruções
            </Button>
            <AddButton onClick={handleEnviar}>Enviar cotaçao</AddButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
