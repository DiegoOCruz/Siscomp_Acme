import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Stack,
  InputAdornment,
  Paper,
} from "../../Components";

import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import { addCotacao, getFornecedor, getProducts } from "./Cotacoes";

export default function CotacoesForm() {
  const [fields, setFields] = useState([
    {data: "", produto: "", fornecedor: "", quantidade: "", preco: "", total: "" },
  ]);
  const [date, setDate] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [produtoList, setProdutoList] = useState([]);
  const [fornecedorList, setFornecedorList] = useState([]);

  //---------------------- UseEffect para carregar os produtos e fornecedores -------------------//
  const loadProdutos = async () => {
    const produtos = await getProducts();
    setProdutoList(produtos);
    //console.log(produtos);
  };

  const loadFornecedores = async () => {
    const fornecedores = await getFornecedor();
    setFornecedorList(fornecedores);
  };

  useEffect(() => {
    loadProdutos();
    loadFornecedores();
  }, []);

  //---------------------- Função para adicionar e remover campos -------------------//
  const handleChange = (index, field, value) => {
    const newFields = fields.slice();
    newFields[index][field] = value;

    if (quantidade || field === "preco") {
      const quantidadeMult = parseFloat(quantidade) || 0;
      const preco = parseFloat(newFields[index].preco) || 0;
      newFields[index].total = (quantidadeMult * preco).toFixed(2);
    }

    setFields(newFields);
  };

  const handleAddFields = () => {
    setFields([
      ...fields,
      {produto: "", fornecedor: "", quantidade: "", preco: "", total: "" },
    ]);
    console.log(fields);
  };

  const handleRemoveFields = (index) => {
    if (fields.length <= 1) {
      return;
    }
    const newFields = fields.slice();
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleProdutoChange = (event) => {
    const produtoSelecionado = event.target.value;
    const newFields = fields.slice();
    newFields[0].produto = produtoSelecionado; // Atualiza o campo produto no primeiro objeto
    setFields(newFields);
  };
  //---------------------- Captura dos dados e envio para o FireBase -------------------//
  const navigate = useNavigate();

  const converterFornecedoresObject = (fields) => {
    let fornecedoresObj = {};
    fields.forEach((field, index) => {
      fornecedoresObj[`fornecedor_${index}`] = {
        fornecedor: field.fornecedor,
        preco: field.preco,
        total: field.total,
      };
    });
    return fornecedoresObj;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que a página seja recarregada
      // Filtra campos com fornecedor ou preco vazios
    const campoValido = fields.filter(field => field.fornecedor && field.preco);
    const data = {
      data: date,
      produto: fields[0].produto,
      quantidade: quantidade,
      fornecedores: converterFornecedoresObject(campoValido),
    };
    //console.log(data);
    await addCotacao(data);

    setFields([
      {produto: "", fornecedor: "", quantidade: "", preco: "", total: "" },
    ]);
    setQuantidade("");
    setDate("");

    navigate("/cotacoes/form");
  };

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
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: "20px" }}>
        Cadastro Cotações
      </Typography>
      <Paper
        sx={{
          padding: "20px",
          width: "100%",
          maxWidth: "800px",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: "10px" }}>
          Informe as informações gerais desta cotação:
        </Typography>
        <FormControl
          fullWidth
          sx={{
            gap: "10px",
          }}
        >
          <TextField
            label="Data"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl fullWidth>
          <InputLabel id="produto-select-label">Produto</InputLabel>
          <Select
            labelId="produto-select-label"
            id="produto-select"
            label="Produto"
            value={fields[0].produto} // Valor selecionado
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
            type="number"
            label="Quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            fullWidth
          />
        </FormControl>
      </Paper>
      {fields.map((field, index) => (
        <Paper
          key={index}
          sx={{
            padding: "20px",
            width: "100%",
            maxWidth: "800px",
            marginBottom: "20px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <FormControl fullWidth>
                <InputLabel id={`fornecedor-select-label-${index}`}>
                  Fornecedor
                </InputLabel>
                <Select
                  labelId={`fornecedor-select-label-${index}`}
                  id={`fornecedor-select-${index}`}
                  value={field.fornecedor}
                  label="Fornecedor"
                  onChange={(e) =>
                    handleChange(index, "fornecedor", e.target.value)
                  }
                >
                  {fornecedorList.map((fornecedor, idx) => (
                    <MenuItem key={idx} value={fornecedor.razaoSocial}>
                      {fornecedor.razaoSocial}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                type="number"
                label="Preço"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
                value={field.preco}
                onChange={(e) => handleChange(index, "preco", e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                type="number"
                label="Total"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                  readOnly: true,
                }}
                value={field.total}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={1} justifyContent="center">
                <Button
                  onClick={handleAddFields}
                  variant="outlined"
                  startIcon={<AddIcon />}
                >
                  Adicionar
                </Button>
                <Button
                  color="error"
                  onClick={() => handleRemoveFields(index)}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                >
                  Remover
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      ))}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          gap: "10px",
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          component={Link}
          to={"/cotacoes"}
        >
          voltar
        </Button>
        <Button variant="outlined" color="primary" onClick={handleSubmit}>
          Cadastrar
        </Button>
      </Box>
    </Grid>
  );
}
