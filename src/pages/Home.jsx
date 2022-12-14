import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Navigate, useNavigation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Home = () => {
  // relatorio de gastos por categoria
  const data = [
    {
      name: "MES JAN",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "MES FEV",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "MES MAR",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
  ];

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3>Bem Vindo, servicos realizados</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image="https://static.hbt.triider.com.br/photos/business/medium/planta-de-casa-belem-103-1847728.jpg"
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Casas
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
                        Apartamentos
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
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3>Relatório de gastos por obra</h3>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />

              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
              <p
                className="text-center"
                style={{ marginTop: "20px", marginBottom: "20px" }}
              >
                <Link to="/listarConstrucao" className="btn btn-primary">
                  Ver todos
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
