import { Typography } from '@mui/material';
import React from 'react';
import naranja from "../imagenes/orange.png";
import IconButton from '@mui/material/IconButton';

const Paginacion = (props) => {

    var emoji = require('node-emoji')

    return(
        <div style={{marginTop: "25px",marginBottom: "25px"}} >

            
            <IconButton variant="contained" onClick={() => {props.setPaginacion(props.Paginacion - 1)}}>
                <Typography display="inline" variant="h4" gutterBottom>Anterior</Typography>
                <img src={naranja} alt="logo creado para la prueba" height="56" width="56" backgroundimage=""></img>
            </IconButton>     

            <IconButton variant="contained" onClick={() => {props.setPaginacion(props.Paginacion + 1)}}>
                <img src={naranja} alt="logo creado para la prueba" height="56" width="56" backgroundimage=""></img>
                <Typography display="inline" variant="h4" gutterBottom>Siguiente</Typography>
            </IconButton>
            
        </div>
    );
}

export default Paginacion;