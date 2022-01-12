import './App.css';
import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
//componentes
import BusquedaPorTitulo from './componentes/BusquedaPorTitulo.js';
import Paginacion from './componentes/Paginacion.js'
import Cabecera from './componentes/Cabecera';
import ListaPeliculas from './componentes/ListaPeliculas';
import ListaFavoritos from './componentes/ListaFavoritos';


function App() {
  //variables
  const [peliculas, setPeliculas] = useState([]);
  const [busquedaPorTitulo, setBusquedaPorTitulo] = useState('star wars');
  const [paginacion, setPaginacion] = useState(1);
  const [filtro, setFiltro] = useState('');
  const [favoritos, setFavoritos] = useState([]);

  //Búsqueda de Películas por título
  const getpeliculas = async (busquedaPorTitulo) => {
    const url = `https://www.omdbapi.com/?apikey=b2d98c6e&s=${busquedaPorTitulo}&page=${paginacion}&type=${filtro}`
    const respuesta = await fetch(url);
    const respuestaJson = await respuesta.json();
    if(respuestaJson.Search){
      setPeliculas(respuestaJson.Search);
    }
  };

  //agrega pelicula a favoritos
  const agregarAFavoritos = (pelicula) => {
    const nuevaListaFavoritos = [...favoritos, pelicula];
    setFavoritos(nuevaListaFavoritos);
  }

  //permite ir actualizando la lista de peliculas, página y filtros
  useEffect(()=>{
    getpeliculas(busquedaPorTitulo);
    // eslint-disable-next-line
  }, [busquedaPorTitulo, paginacion, filtro]);

  return (
    <div className="App">

      {<Cabecera />}    
      {<BusquedaPorTitulo busquedaPorTitulo={busquedaPorTitulo} setPaginacion={setPaginacion} setBusquedaPorTitulo={setBusquedaPorTitulo} setFiltro={setFiltro} />}
      
      <div className='peliculasgrid'>
        <div className="peliculas">
          <Grid container spacing={3}  alignItems="center">
            {<ListaPeliculas peliculas={peliculas} agregarAFavoritos={agregarAFavoritos}/>}   
          </Grid>   
        </div>          
      </div> 
      {<Paginacion Paginacion={paginacion} setPaginacion={setPaginacion}/>}   

      <div className='peliculasgrid'>
        <Typography variant="h1" className="titulo1" component="div" sx={{ flexGrow: 1 }}>Favorites</Typography>
        <div className="peliculas">
          <Grid container spacing={3}  alignItems="center">
            {<ListaFavoritos peliculas={favoritos}/>}   
          </Grid>   
        </div>      
      </div>   
    </div>
  );
}
export default App;
