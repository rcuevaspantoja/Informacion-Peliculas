import React from 'react';
import TextField from '@mui/material/TextField';
import busqueda from "../imagenes/icono_busqueda.png";
import Autocomplete from '@mui/material/Autocomplete';

const busquedaPorTitulo= (props) => {

    const opcionesFiltro = [
        { label: 'Movies + Series', descripcion:''},
        { label: 'Movies', descripcion: 'movie' },
        { label: 'Series', descripcion: 'series' },
    ]
    
    return (
        <div className="form">

            <div>
                <img src={busqueda} alt="logo creado para la prueba" height="30" width="30"></img>
            </div>
 
            <div>
                <TextField variant="outlined" 
                values={props.value}
                onChange={(event)=> props.setPaginacion(1)}
                onInput={(event)=> props.setBusquedaPorTitulo(event.target.value)}
                name="titulo" 
                placeholder="Type to search..."/>
            </div>

            <div className="div_filtro">
                <Autocomplete
                    sx={{ width: 300}}
                    options={opcionesFiltro}
                    inputValue={props.entradaComboBox}
                    disableClearable
                    renderInput={(params) => <TextField {...params} label="Type Filter" />}
                    onChange={(event, newValue) => {
                        props.setFiltro(newValue.descripcion);
                    }}
                />
            </div>

        </div>
    );
};

export default busquedaPorTitulo;