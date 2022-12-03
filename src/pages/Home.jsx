import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, redirect, useNavigation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, Typography } from "@mui/material";

const Home = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3>Servicos Realizados</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image="https://diariodorio.com/wp-content/uploads/2019/08/Antenas-no-Sumar%C3%A9.jpg"
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Antenas
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Construção de casas, apartamentos, prédios, etc.
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
                <div className="col-md-4">
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image="https://www.ryazbek.com.br/wp-content/uploads/2019/11/original-ccba23ab2eb493b23837674485286bcf.jpg"
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Apartamento
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Construção de casas, apartamentos, prédios, etc.
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
                <div className="col-md-4">
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image="https://viagemeturismo.abril.com.br/wp-content/uploads/2016/10/park-017-1.jpeg?quality=70&strip=info"
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Jardins
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Construção de casas, apartamentos, prédios, etc.
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            <p className="text-center">
              <Link to="/listarConstrucao" className="btn btn-primary">
                Ver todos
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
