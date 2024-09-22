import { Link } from "react-router-dom";
import {
  Grid,
  Box,
  Button,
  Typography,
  TextField,
  AddButton,
} from "../../Components";
import { addProduct } from "./Product";
import { useState } from "react";

export default function ProdutoForm() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [ncm, setNcm] = useState("");

  const handleNome = (e) => {
    setNome(e.target.value);
  };
  const handleDescricao = (e) => {
    setDescricao(e.target.value);
  };
  const handleNcm = (e) => {
    setNcm(e.target.value);
  };

  const handleCadastro = async () => {
    if (!nome || !descricao || !ncm) {
      alert("TODOS OS CAMPOS DEVEM SER PREENCHIDOS.");
      return;
    }

    const novoProduto = {
      nome: nome,
      descricao: descricao,
      ncm: ncm,
    };
    await addProduct(novoProduto);

    // Limpar os campos de texto após o envio
    setNome("");
    setDescricao("");
    setNcm("");
  };

  return (
    <Grid
      container={true}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        gap: "10px",
        padding: "20px",
      }}
      xs={12}
    >
      <Typography
        variant="h3"
        sx={{
          "@media (max-width: 600px)": {
            fontSize: "1.5rem",
          },
        }}
      >
        Cadastro de Produtos
      </Typography>
      <Grid
        container={true}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          padding: "20px",
          width: "75%",
          border: "1px solid #ccc",
        }}
      >
        <Grid item={true} xs={12} sm={6}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <TextField
              label="Nome"
              value={nome}
              onChange={handleNome}
              sx={{
                width: "100%",
              }}
            />
          </Box>
        </Grid>
        <Grid item={true} xs={12} sm={6}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              label="Descrição"
              value={descricao}
              multiline={true}
              rows={4}
              onChange={handleDescricao}
              sx={{
                width: "100%",
              }}
            />
          </Box>
        </Grid>
        <Grid item={true} xs={12} sm={6}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              label="NCM"
              value={ncm}
              onChange={handleNcm}
              sx={{
                width: "100%",
              }}
            />
          </Box>
        </Grid>

        <Grid item={true} xs={12} sm={6}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="outlined"
              component={Link}
              to="/produtos"
              sx={{ marginRight: "10px" }}
            >
              voltar
            </Button>
            <AddButton onClick={handleCadastro}>adicionar</AddButton>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
