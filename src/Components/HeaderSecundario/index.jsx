import { Link } from "react-router-dom";
import { Grid, Typography } from "../../Components";
import { useTheme } from "@mui/material/styles";

export default function HeaderSecundario() {
  const theme = useTheme();
  return (
    <Grid container>
      <Grid
        container
        xs={12}
        display="flex"
        alignItems="center"
        flexDirection="row"
        sx={{
          backgroundColor: theme.palette.error.main, // usa a cor 'error' do tema
          "@media screen and (max-width: 600px)": {
            flexDirection: "column",
          },
        }}
      >
        <Grid item>
          <Link to="/">
            <img
              src=".\public\ACME_Logo.png"
              alt=""
              style={{
                width: "120px",
                height: "75px",
                margin: "10px",
              }}
            />
          </Link>
        </Grid>
        <Grid item>
          <Typography
            variant="h4"
            sx={{
              color: theme.palette.common.white, // usa a cor 'white' do tema
              marginLeft: "10px",
              "@media screen and (max-width: 600px)": {
            display: "none",
          },
            }}
          >
            ACME - Sistema de Compras
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
