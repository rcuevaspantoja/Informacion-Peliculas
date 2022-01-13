import React from 'react'
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import logo from "../imagenes/icono_variante.png";

const Cabecera=(props) => {

   

    //funcion para refrescar la página

    const refrescarPagina = () =>{
      window.location.reload(false)
    }

    return(
        <div>
        <AppBar position="fixed" style={{ background: '#ff5000'}}>
          <Toolbar style={{width: "94%"}}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={refrescarPagina}>
              <img src={logo} alt="logo creado para la prueba" height="56" width="56"></img>
            </IconButton>
        
            <Typography variant="h2" sx={{ flexGrow: 1 }}> 
              Movies at Houm
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />

        <br/>
        <Typography variant="h3" className="titulo1" component="div" sx={{ flexGrow: 1 }}>
            Watched a movie or a series at houm and want more info about it?
        </Typography><br/>   
        </div>
    );
};
export default Cabecera;