/* eslint-disable  */
import React, { useState } from "react";
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { FaStar } from 'react-icons/fa';


const ListaPeliculas = (props) => {


    const [peliculaDetallada, setPeliculaDetallada] = useState([]);

    //llamamos denuevo a la Api para solicitar la información detallada de la película o serie 
    const getpeliculas = async (imdbID) => {

        const url = `https://www.omdbapi.com/?apikey=b2d98c6e&i=${imdbID}`
        
        const respuesta = await fetch(url);
        const respuestaJson = await respuesta.json();
     
        //volvemos a pasar a una constante el detalle de la pelicula
        setPeliculaDetallada(respuestaJson);
        mostrar();
    };

    const mostrar = () => {
        abrirCerrarModalPelicula()
    }
    //modales
    const[modalPelicula, setModalPelicula] = useState(false);

    //cambia el estado del modal cuando se haga click
    const abrirCerrarModalPelicula = () => {
        setModalPelicula(!modalPelicula);
    }

    //Agrega a favortios y cierra el modal
    const funcionAgregarFavorito = () => {
        props.agregarAFavoritos(peliculaDetallada);
        abrirCerrarModalPelicula();
    }

    //div del modal
    const bodyModalPelicula=(

                <Grid
                    container
                    spacing={15}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh', marginTop: '1vh' }}
                >

                <Grid item xs={3}>
                    <Card sx={{ maxWidth: 345 }} sx={{ display: 'flex' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>             
                            <CardMedia
                                    component="img"
                                    sx={{ m: 0.9 }}
                                    height="auto"
                                    image={peliculaDetallada.Poster}
                                    alt="Poster not found."/>
                            <Typography style={{  display: "flex", justifyContent: "center"}}>
                                {[... Array(10)].map((star, i) => {
                                    const dificultad_valor = i + 1;
                                    return(
                                        <FaStar className="star" color={dificultad_valor <= (peliculaDetallada.imdbRating ) ? "#FFC107" : "#808080"} size={25} />    
                                    ) 
                                })}
                            </Typography>
                            
                            <CardActions style={{  display: "flex", justifyContent: "center"}}>

                                <IconButton color="primary" aria-label="add to favorite" 
                                component="span"
                                onClick={() => funcionAgregarFavorito()}
                                style={{display:'flex', justifyContent:'right' }}>                         
                                    <FavoriteBorderIcon className="fav" color={"#ff5000"} size={30} />  
                                </IconButton >

                                <Button nameClass="boton_naranja" 
                                    href={`https://www.youtube.com/results?search_query=${peliculaDetallada.Title} trailer`} 
                                    target="_blank"
                                    variant="contained" style={{ background: '#ff5000'}}>
                                        Watch Trailer
                                </Button> 
                            </CardActions>           
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardActions sx={{ mt: -1.5}} style={{  display: "flex", justifyContent: "flex-end"}}>
                                <IconButton variant="contained" onClick={() => {abrirCerrarModalPelicula()}}>
                                    <CloseIcon/>
                                </IconButton>
                            </CardActions>   

                            <CardContent sx={{ mt: -4, maxWidth: 345, maxHeight: 500, overflow: 'auto'}} >
                                <Typography gutterBottom variant="h6">
                                    Title: <Typography display="inline">{peliculaDetallada.Title}</Typography>
                                </Typography>

                                <Typography variant="h6">
                                    Year: <Typography display="inline">{peliculaDetallada.Year}</Typography>            
                                </Typography>

                                <Typography variant="h6">
                                    Genre: <Typography display="inline">{peliculaDetallada.Genre}({peliculaDetallada.Rated})</Typography>           
                                </Typography>

                                <Typography variant="h6">
                                    Director: <Typography display="inline">{peliculaDetallada.Director}</Typography>   
                                </Typography>

                                <Typography variant="h6">
                                    Actors: <Typography display="inline">{peliculaDetallada.Actors}</Typography>  
                                </Typography>

                                <Typography variant="h6">
                                    Language: <Typography display="inline">{peliculaDetallada.Language}</Typography>  
                                </Typography>

                                <Typography variant="h6">
                                    Country: <Typography display="inline">{peliculaDetallada.Country}</Typography>  
                                </Typography>

                                <Typography variant="h6">
                                    Awars: <Typography display="inline">{peliculaDetallada.Awards}</Typography>  
                                </Typography>
                                <Typography variant="body1">
                                    {peliculaDetallada.Plot}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>      
                </Grid>
     
    )

    return (
        <>
            {props.peliculas.map((pelicula, index) => (
            <Grid alignItems="stretch" item xs={12} sm={6} md={4} lg={3} xl={2}>         
                <Card className="peliculas">
                    <CardActionArea>                                  
                        <CardMedia
                        component="img"
                        height="525"
                        image={pelicula.Poster}
                        alt="Poster not Found."
                        onClick={() => {getpeliculas(pelicula.imdbID)}}
                        />
                    </CardActionArea> 
           
                </Card>
                <div className="hide">
                        <Typography variant="h6">About this {pelicula.Type}</Typography>
                </div>  
                <Modal
                    open={modalPelicula}
                    onClose={abrirCerrarModalPelicula}
                    BackdropProps={{style: {backgroundColor: "#454545", opacity: "0.09"}}}>
                        {bodyModalPelicula}
                        
                </Modal>     
            </Grid> 
            ))}
        </>
    );
};
export default ListaPeliculas;
