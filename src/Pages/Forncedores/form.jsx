import { Link } from "react-router-dom";
import { Grid, Box, Button, Typography, AddButton, HomeButton } from "../../Components";
import TextfieldComponent from "../../Components/TextField";
import BuscaEndereco from "../../Infra/BuscaEndereco";
import { useState } from "react";
import { addFornecedor } from "./Fornecedor";

export default function FornecedorForm() {
  let cep = "";
  const [endereco, setEndereco] = useState({});
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cepp, setCepp] = useState("");

  async function handleChange(e) {
    if (e.target.value.length == 8) {
      cep = e.target.value;
      let retorno = await BuscaEndereco({ cep });
      //console.log(retorno);
      setEndereco(retorno);
      if (retorno) {
        setCepp(cep);
        setLogradouro(retorno.logradouro);
        setBairro(retorno.bairro);
        setCidade(retorno.localidade);
        setEstado(retorno.uf);
      }
    }
  }
  const handleRazaoSocial = (e) => {
    setRazaoSocial(e.target.value);
  };
  const handleCnpj = (e) => {
    setCnpj(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleTelefone = (e) => {
    setTelefone(e.target.value);
  };
  const handleNumero = (e) => {
    setNumero(e.target.value);
  };

  const handleCadastro = async () => {
    if (
      !razaoSocial ||
      !cnpj ||
      !email ||
      !telefone ||
      !logradouro ||
      !numero ||
      !bairro ||
      !cidade ||
      !estado
    ) {
      alert("TODOS OS CAMPOS DEVEM SER PREENCHIDOS.");
      return;
    }

    const novoFornecedor = {
      razaoSocial: razaoSocial,
      cnpj: cnpj,
      email: email,
      telefone: telefone,
      logradouro: logradouro,
      numero: numero,
      bairro: bairro,
      cidade: cidade,
      estado: estado,
    };
    await addFornecedor(novoFornecedor);

    // Limpar os campos de texto após o envio
    setRazaoSocial("");
    setCnpj("");
    setEmail("");
    setTelefone("");
    setEndereco("");
    setCepp("");
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
        Cadastro Fornecedores
      </Typography>
      <Grid
        item={true}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          width: "80%",
          border: "1px solid #ccc",
          padding: "20px",
        }}
      >
        <Grid
          container={true}
          spacing={2}
          sx={{
            padding: "10px",
          }}
        >
          <Grid item={true} xs={12} sm={6}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TextfieldComponent
                label="Razão Social"
                onChange={handleRazaoSocial}
                sx={{
                  width: "100%",
                }}
                value={razaoSocial}
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
                label="CNPJ"
                onChange={handleCnpj}
                sx={{
                  width: "100%",
                }}
                value={cnpj}
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
                onChange={handleEmail}
                sx={{
                  width: "100%",
                }}
                value={email}
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
                onChange={handleTelefone}
                sx={{
                  width: "100%",
                }}
                value={telefone}
              />
            </Box>
          </Grid>
          <Grid item={true} xs={12} sm={12}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TextfieldComponent
                label="CEP - (apenas números)"
                sx={{
                  width: "50%",
                }}
                onChange={handleChange}
                
              />
            </Box>
          </Grid>

          <Grid item={true} xs={12} sm={12}>
            {endereco.logradouro && (
              <Grid
                container={true}
                spacing={2}
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Grid item={true} xs={12} sm={6}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <TextfieldComponent
                      label="Logradouro"
                      value={endereco.logradouro}
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
                      label="Número"
                      onChange={handleNumero}
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
                      label="Bairro"
                      value={endereco.bairro}
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
                      label="Cidade"
                      value={endereco.localidade}
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
                      label="Estado"
                      value={endereco.uf}
                      sx={{
                        width: "100%",
                        marginBottom: "10px",
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid
            container={true}
            xs={12}
            sm={12}
            sx={{
              gap: "10px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <AddButton onClick={handleCadastro}>adicionar fornecedor</AddButton>
            </Box>
          </Grid>
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
          <Button variant="outlined" component={Link} to="/fornecedores">
            Voltar
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
