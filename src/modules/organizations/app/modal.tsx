import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import { PostProfile } from "../models/profile";
import { Grid, TextField } from "@material-ui/core";
import { peopleData } from "./people_body";
import { useBehaviorState } from "../../../utils/useBehaviorState";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
      background: "#2D2F3A",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const gridStyle: React.CSSProperties = { padding: 10 };
export function FullScreenDialog({
  editProfile: profile,
  onClose,
}: {
  editProfile: PostProfile | null;
  onClose: () => void;
}) {
  const classes = useStyles();

  const loading = useBehaviorState(peopleData.loading);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [formation, setFormation] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [professionals, setProfessionals] = useState<number>(0);
  const [employes, setEmployes] = useState<number>(0);
  const [department, setDepartment] = useState("");
  const [province, setProvince] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [waterConnections, setWaterConnections] = useState<number>(0);
  const [connectionsWithMeter, setConnectionsWithMeter] = useState<number>(0);
  const [
    connectionsWithoutMeter,
    setConnectionsWithoutMeter,
  ] = useState<number>(0);
  const [publicPools, setPublicPools] = useState<number>(0);
  const [latrines, setLatrines] = useState<number>(0);
  const [serviceContinuity, setServiceContinuity] = useState("");

  useEffect(() => {
    if (profile !== null) {
      // setUserName(profile.userName)
      // setPassword(profile.password)
      setName(profile.name);
      // setFormation(profile.formation)
      // setAddress(profile.address)
      // setPhone(profile.phone)
      // setProfessionals(profile.professionals)
      // setEmployes(profile.employes)
      // setDepartment(profile.department)
      // setProvince(profile.province)
      // setMunicipality(profile.municipality)
      // setWaterConnections(profile.waterConnections)
      // setConnectionsWithMeter(profile.connectionsWithMeter)
      // setConnectionsWithoutMeter(profile.connectionsWithoutMeter)
      // setPublicPools(profile.publicPools)
      // setLatrines(profile.latrines)
      // setServiceContinuity(profile.serviceContinuity)
    } else {
      setUserName("");
      setPassword("");
      setName("");
      setFormation("");
      setAddress("");
      setPhone("");
      setProfessionals(0);
      setEmployes(0);
      setDepartment("");
      setProvince("");
      setMunicipality("");
      setWaterConnections(0);
      setConnectionsWithMeter(0);
      setConnectionsWithoutMeter(0);
      setPublicPools(0);
      setLatrines(0);
      setServiceContinuity("");
    }
  }, [profile]);
  return (
    <div>
      <Dialog
        fullScreen
        open={profile !== null}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              disabled={loading}
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {profile !== null && profile.id === null
                ? "Nuevo"
                : "Editar Perfil"}
            </Typography>
            <Button
              disabled={loading}
              autoFocus
              color="inherit"
              onClick={() => {
                if (profile !== null)
                  peopleData
                    .postProfile({
                      id: profile.id,
                      // userName: userName,
                      // password: password,
                      name: name,
                      // formation: formation,
                      // address: address,
                      // phone: phone,
                      // professionals: professionals,
                      // employes: employes,
                      // department: department,
                      // province: province,
                      // municipality: municipality,
                      // waterConnections: waterConnections,
                      // connectionsWithMeter: connectionsWithMeter,
                      // connectionsWithoutMeter: connectionsWithoutMeter,
                      // publicPools: publicPools,
                      // latrines: latrines,
                      // serviceContinuity: serviceContinuity,
                    })
                    .then(onClose)
                    .catch(alert);
              }}
            >
              {profile !== null && profile.id === null ? "Crear" : "Guardar"}
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container style={{ paddingTop: 20, paddingBottom: 10 }}>
          <Grid item xs={6} style={gridStyle}>
            <TextField
              disabled={loading}
              fullWidth
              label="Nombre de usuario"
              variant="outlined"
              value={userName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUserName(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6} style={gridStyle}>
            <TextField
              disabled={loading}
              fullWidth
              label="Contraseña"
              variant="outlined"
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} style={gridStyle}>
            <TextField
              disabled={loading}
              fullWidth
              label="Nombre de la EPSA o CAPyS"
              variant="outlined"
              value={name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} style={gridStyle}>
            <TextField
              disabled={loading}
              fullWidth
              label="Formación de consitución"
              variant="outlined"
              value={formation}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFormation(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} style={gridStyle}>
            <TextField
              disabled={loading}
              fullWidth
              label="Dirección"
              variant="outlined"
              value={address}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setAddress(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} style={gridStyle}>
            <TextField
              disabled={loading}
              fullWidth
              label="Telefonos"
              variant="outlined"
              value={phone}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPhone(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6} style={gridStyle}>
            <TextField
              disabled={loading}
              fullWidth
              label="Número de tecnicos y/o profesionales"
              variant="outlined"
              value={professionals}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const num = Number(event.target.value);
                if (!isNaN(num)) setProfessionals(num);
              }}
            />
          </Grid>
          <Grid item xs={6} style={gridStyle}>
            <TextField
              disabled={loading}
              fullWidth
              label="Número total de empleados"
              variant="outlined"
              value={employes}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const num = Number(event.target.value);
                if (!isNaN(num)) setEmployes(num);
              }}
            />
          </Grid>
          <Grid item xs={12} style={gridStyle}>
            <TextField
              disabled={loading}
              fullWidth
              label="Departamento"
              variant="outlined"
              value={department}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setDepartment(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} style={gridStyle}>
            <TextField
              disabled={loading}
              fullWidth
              label="Provincia"
              variant="outlined"
              value={province}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setProvince(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} style={gridStyle}>
            <TextField
              disabled={loading}
              fullWidth
              label="Municipio"
              variant="outlined"
              value={municipality}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setMunicipality(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={4} style={gridStyle}>
            <TextField
              disabled={loading}
              fullWidth
              label="Numero total de conexiones de agua potable"
              variant="outlined"
              value={waterConnections}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const num = Number(event.target.value);
                if (!isNaN(num)) setWaterConnections(num);
              }}
            />
          </Grid>
          <Grid item xs={4} style={gridStyle}>
            <TextField
              disabled={loading}
              fullWidth
              label="Numero de conexiones con medidor"
              variant="outlined"
              value={connectionsWithMeter}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const num = Number(event.target.value);
                if (!isNaN(num)) setConnectionsWithMeter(num);
              }}
            />
          </Grid>
          <Grid item xs={4} style={gridStyle}>
            <TextField
              disabled={loading}
              fullWidth
              label="Numero de conexiones sin medidor"
              variant="outlined"
              value={connectionsWithoutMeter}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const num = Number(event.target.value);
                if (!isNaN(num)) setConnectionsWithoutMeter(num);
              }}
            />
          </Grid>
          <Grid item xs={4} style={gridStyle}>
            <TextField
              disabled={loading}
              fullWidth
              label="Numero de piletas publicas"
              variant="outlined"
              value={publicPools}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const num = Number(event.target.value);
                if (!isNaN(num)) setPublicPools(num);
              }}
            />
          </Grid>
          <Grid item xs={4} style={gridStyle}>
            <TextField
              disabled={loading}
              fullWidth
              label="Numero de letrinas"
              variant="outlined"
              value={latrines}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const num = Number(event.target.value);
                if (!isNaN(num)) setLatrines(num);
              }}
            />
          </Grid>
          <Grid item xs={4} style={gridStyle}>
            <TextField
              disabled={loading}
              fullWidth
              label="Continuidad del servicio  hr/dia"
              variant="outlined"
              value={serviceContinuity}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setServiceContinuity(event.target.value);
              }}
            />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
