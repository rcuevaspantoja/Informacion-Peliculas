/* eslint-disable  */
import React, { useState } from "react";
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';



const ListaFavoritos = (props) => {

    var emoji = require('node-emoji')

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
                        alt="Poster not Found."/>
                    </CardActionArea> 
           
                </Card>
                <div className="hide">
                        <Typography variant="h6"> {emoji.get('🤍')} Favorite {pelicula.Type}</Typography>
                </div>   
            </Grid> 
            ))}
        </>
    );
};
export default ListaFavoritos;
