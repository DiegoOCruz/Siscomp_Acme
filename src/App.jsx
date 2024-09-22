import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import "./App.css";
import { Loading, Navbar, Typography } from "./Components";
import Login from "./Pages/Login";
import { getUsuario } from "./Infra/DbUsuarios";

const Home = lazy(() => import("./Pages/Home"));
//const CotacoesForm = lazy(() => import("./Pages/Cotacoes/form"));
const CotacoesForm = lazy(() => import("./Pages/Cotacoes/form2"));

const CotacoesList = lazy(() => import("./Pages/Cotacoes/list"));
const FornecedorForm = lazy(() => import("./Pages/Forncedores/form"));
const FornecedorList = lazy(() => import("./Pages/Forncedores/list"));
const ContatoForm = lazy(() => import("./Pages/Contato/form"));
const ContatoList = lazy(() => import("./Pages/Contato/list"));
const ProdutoForm = lazy(() => import("./Pages/Produtos/form"));
const ProdutoList = lazy(() => import("./Pages/Produtos/list"));
const Registro = lazy(() => import("./Pages/Registro"));
const Requisicoes = lazy(() => import("./Pages/Requisicoes"));
const ForgotPassword = lazy(() => import("./Pages/ForgotPassword"));
const FirstAccess = lazy(() => import("./Pages/FirstAccess"));
const PedidoDeCompra = lazy(() => import("./Pages/PedidoDeCompra"));
const Settings = lazy(() => import("./Pages/Settings"));

function App() {
  const [logar, setLogar] = useState(""); //TODO mudar para vazio ""
  const [admin, setAdmin] = useState(false); //TODO mudar para false
  const [userLogin, setUserLogin] = useState({});

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        {logar && (
          <Navbar setLogar={setLogar} admin={admin} setUserLogin={setUserLogin} userLogin={userLogin} />
        )}

        <Routes>
          {/* Rotas acessíveis independentemente do estado de login */}
          <Route
            path="/"
            element={
              <Login
                setLogar={setLogar}
                setAdmin={setAdmin}
                setUserLogin={setUserLogin}
              />
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/first-access" element={<FirstAccess />} />

          {/* Rotas protegidas: acessíveis apenas para usuários logados */}
          {logar && (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/cotacoes" element={<CotacoesList userLogin={userLogin}/>} />
              <Route path="/cotacoes/form" element={<CotacoesForm userLogin={userLogin} admin={admin}/>} />
              <Route path="/fornecedores" element={<FornecedorList />} />
              <Route path="/fornecedores/form" element={<FornecedorForm />} />
              <Route path="/contato" element={<ContatoList />} />
              <Route path="/contato/form" element={<ContatoForm />} />
              <Route path="/produtos" element={<ProdutoList />} />
              <Route path="/produtos/form" element={<ProdutoForm />} />
              <Route path="/settings" element={<Settings />}/>
              <Route
                path="/requisicao-de-compra"
                element={<PedidoDeCompra userLogin={userLogin} />}
              />
              <Route path="/register" element={<Registro admin={admin} />} />

              {/* Rota protegida: acessível apenas para administradores */}
              {admin ? (
                <Route path="/requisicoes" element={<Requisicoes />} />
              ) : (
                <Route
                  path="/requisicoes"
                  element={
                    <Typography variant="h3" align="center">
                      Acesso não autorizado!
                    </Typography>
                  }
                />
              )}
            </>
          )}

          {/* Rota de fallback para páginas não encontradas */}
          <Route
            path="*"
            element={
              <Typography variant="h3" align="center">
                Not Found
              </Typography>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
