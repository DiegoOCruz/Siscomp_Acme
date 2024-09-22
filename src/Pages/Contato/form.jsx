import { Link } from "react-router-dom";
import {
  Grid,
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  AddButton,
} from "../../Components";
import TextfieldComponent from "../../Components/TextField";
import { useEffect, useState } from "react";
import { addContato, getFornecedor } from "./Contato";

export default function ContatoForm() {
  const [fornecedor, setFornecedor] = useState("");
  const [fornecedorlist, setFornecedorList] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const handleChange = (event) => {
    setFornecedor(event.target.value);
  };

  const handleNome = (event) => {
    setNome(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleTelefone = (event) => {
    setTelefone(event.target.value);
  };

  const carregarFornecedor = async () => {
    const forn = await getFornecedor();
    setFornecedorList(forn);
  };

  const handleCadastro = async () => {
    if (!nome || !email || !telefone || !fornecedor) {
      alert("TODOS OS CAMPOS DEVEM SER PREENCHIDOS.");
      return;
    }

    const novoContato = {
      nome: nome,
      email: email,
      telefone: telefone,
      fornecedor: fornecedor,
    };
    await addContato(novoContato);

    // Limpar os campos de texto após o envio
    setNome("");
    setEmail("");
    setTelefone("");
    setFornecedor("");
  };

  useEffect(() => {
    carregarFornecedor();
  }, []);

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
        Cadastro Contatos
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
            <TextfieldComponent
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
            <TextfieldComponent
              label="E-mail"
              value={email}
              onChange={handleEmail}
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
            <TextfieldComponent
              label="Telefone"
              value={telefone}
              onChange={handleTelefone}
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
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Fornecedor</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={fornecedor}
                label="Fornecedor"
                onChange={handleChange}
              >
                {fornecedorlist &&
                  fornecedorlist.map((fornec, index) => (
                    <MenuItem key={index} value={fornec.razaoSocial}>
                      {fornec.razaoSocial}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
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
              to="/contato"
              sx={{
                marginRight: "10px",
              }}
              >
              voltar
            </Button>
            <AddButton 
              onClick={handleCadastro}
            >Adicionar</AddButton>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
