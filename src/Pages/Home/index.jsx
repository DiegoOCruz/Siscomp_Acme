import { Grid, Typography } from "../../Components";

export default function Home() {
  return (
    <Grid
      container
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "col",
        justifyContent: "center",
        alignItems: "center", 
        "@media (max-width: 945px)": {
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
        "@media (max-width: 599px)": {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          flexDirection: "column",
          "@media (max-width: 945px)": {
            flexDirection: "row",
            alignSelf: "center",
          },
        }}
      >
        <img
          src=".\public\ACME_Logo.png"
          alt="ACME"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
          "@media (max-width: 945px)": {
            flexDirection: "row",
          },
          "@media (max-width: 599px)": {
            flexDirection: "row",
            alignContent: "flex-start",

          },
        }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{width: "auto", height: "auto" }}
        >
          Sistema de Compras
        </Typography>
      </Grid>
    </Grid>
  );
}
