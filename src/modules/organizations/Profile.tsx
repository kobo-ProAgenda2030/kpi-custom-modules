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
import { Grid, LinearProgress, TextField } from "@material-ui/core";
import { Organization } from "../../models/Organization";
import { UseExecuter } from "../../utils/useExecuter";
import { dataController } from "../../controller/DataController";

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
export function ProfileModal({
  organization,
  onClose,
}: {
  organization: Organization;
  onClose: () => void;
}) {
  const classes = useStyles();
  const existProfile = organization.profileId !== null;
  const { loading, executer, error } = UseExecuter();
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
    if (existProfile) {
      executer(async () => {
        if (organization.profileId) {
          const profile = await dataController.server.getProfile(
            organization.profileId
          );
          setFormation(profile.formation);
          setAddress(profile.address);
          setPhone(profile.phone);
          setProfessionals(profile.professionals);
          setEmployes(profile.employes);
          setDepartment(profile.department);
          setProvince(profile.province);
          setMunicipality(profile.municipality);
          setWaterConnections(profile.waterConnections);
          setConnectionsWithMeter(profile.connectionsWithMeter);
          setConnectionsWithoutMeter(profile.connectionsWithoutMeter);
          setPublicPools(profile.publicPools);
          setLatrines(profile.latrines);
          setServiceContinuity(profile.serviceContinuity);
        }
      });
    }
  }, [organization]);

  return (
    <div>
      <Dialog
        fullScreen
        open
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
              {!existProfile
                ? `Nuevo perfil para ${organization.name}`
                : `Editar Perfil de ${organization.name}`}
            </Typography>
            <Button
              disabled={loading}
              autoFocus
              color="inherit"
              onClick={() => {
                executer(async () => {
                  const response = await dataController.server.updateCreateProfile(
                    {
                      id: organization.profileId,
                      formation: formation,
                      address: address,
                      phone: phone,
                      professionals: Number(professionals),
                      employes: Number(employes),
                      department: department,
                      province: province,
                      municipality: municipality,
                      waterConnections: Number(waterConnections),
                      connectionsWithMeter: Number(connectionsWithMeter),
                      connectionsWithoutMeter: Number(connectionsWithoutMeter),
                      publicPools: Number(publicPools),
                      latrines: Number(latrines),
                      serviceContinuity: serviceContinuity,
                    }
                  );
                  organization.profileId = response.profileId;
                  onClose();
                });
              }}
            >
              {!existProfile ? "Crear" : "Guardar"}
            </Button>
          </Toolbar>
          {loading && <LinearProgress style={{ width: "100%" }} />}
        </AppBar>
        <Grid container style={{ paddingTop: 20, paddingBottom: 10 }}>
          <Grid item xs={12} style={{ ...gridStyle, color: "red" }}>
            {error}
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
