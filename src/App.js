import './App.css';
import BusquedaPorTitulo from './componentes/BusquedaPorTitulo.js';
import Paginacion from './componentes/Paginacion.js'
import Cabecera from './componentes/Cabecera';
import React, { useState, useEffect } from "react";
import ListaPeliculas from './componentes/ListaPeliculas';
import Grid from '@mui/material/Grid';


function App() {

  //varibles
  const [peliculas, setPeliculas] = useState([]);
  const [busquedaPorTitulo, setBusquedaPorTitulo] = useState('');
  const [paginacion, setPaginacion] = useState(1);
  const [filtro, setFiltro] =useState('');

  //llamada a la API
  const getpeliculas = async (busquedaPorTitulo) => {

    const url = `https://www.omdbapi.com/?apikey=b2d98c6e&s=${busquedaPorTitulo}&page=${paginacion}&type=${filtro}`
    const respuesta = await fetch(url);
    const respuestaJson = await respuesta.json();

    if(respuestaJson.Search){
      setPeliculas(respuestaJson.Search);
      
    }

  };

  useEffect(()=>{
    getpeliculas(busquedaPorTitulo);
    console.log(filtro)
  }, [busquedaPorTitulo, paginacion, filtro]);

  return (
    <div className="App">

      {<Cabecera />}    

      {<BusquedaPorTitulo 
        busquedaPorTitulo={busquedaPorTitulo}  
        setPaginacion={setPaginacion} 
        setBusquedaPorTitulo={setBusquedaPorTitulo}  
        setFiltro={setFiltro}
      />}
      
      <div className='peliculasgrid'>
        <div className="peliculas">
          <Grid container spacing={3}  alignItems="center">
            {<ListaPeliculas peliculas={peliculas} />}   
          </Grid>   
        </div>          
      </div> 

      {<Paginacion Paginacion={paginacion} setPaginacion={setPaginacion}/>}

    </div>
  );
}

export default App;
