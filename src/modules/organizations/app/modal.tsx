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
import { Organization } from "../models/profile";
import { Card, Checkbox, Grid, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { KoboUser } from "../models/KoboUser";
import { TwitterPicker } from "react-color";
import {
  AddBox,
  CheckBox,
  CheckBoxOutlineBlank,
  Delete,
  Edit,
} from "@material-ui/icons";
import { UseExecuter } from "../../../utils/useExecuter";
import { useBehaviorState } from "../../../utils/useBehaviorState";
import { organizationData } from "./people_body";

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
  organization,
  onClose,
}: {
  organization: Organization;
  onClose: (cancelled: boolean) => void;
}) {
  const classes = useStyles();
  const [didMount, setDidMount] = useState(false);
  const koboUsers: KoboUser[] = useBehaviorState(organizationData.users);
  const [usersSelected, setUsersSelected] = React.useState<KoboUser[]>([]);
  const { loading, error, executer } = UseExecuter();
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  useEffect(() => {
    if (organization !== null) {
      setName(organization.name);
      const users: KoboUser[] = [];
      organization.members.forEach((user) => {
        const userFound = koboUsers.find((KoboUser) => {
          return user === KoboUser.id;
        });
        if (userFound !== undefined) users.push(userFound);
      });
      setUsersSelected(users);
      setColor(organization.color);
    }
    setDidMount(true);
    return () => setDidMount(false);
  }, [organization]);
  if (!didMount) {
    return null;
  }
  return (
    <div>
      <Dialog
        disableBackdropClick
        fullWidth
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
              onClick={() => onClose(true)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {organization.organizationId === undefined
                ? "Nuevo"
                : "Editar Organizacion"}
            </Typography>
            <Button
              disabled={loading}
              autoFocus
              color="inherit"
              onClick={() => {
                if (organization !== null) {
                  executer(async () => {
                    await organizationData.updateCreateOrganization({
                      organizationId: organization.organizationId,
                      parentOrganizationId: organization.parentOrganizationId,
                      name: name,
                      color: "",
                      profileId: organization.profileId,
                      members: usersSelected.map((user) => user.id),
                    });
                    organization.name = name;
                    organization.members = usersSelected.map((user) => user.id);
                    organization.color = color;
                    onClose(false);
                  });
                }
              }}
            >
              {organization.organizationId === undefined ? "Crear" : "Guardar"}
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container style={{ paddingTop: 20, paddingBottom: 10 }}>
          <Grid item xs={8} style={gridStyle}>
            <TextField
              disabled={loading}
              fullWidth
              label="Nombre de la organizacion"
              variant="outlined"
              value={name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={4} style={{ ...gridStyle, display: "flex" }}>
            {organization.profileId === undefined ? (
              <Button
                disabled={loading}
                fullWidth
                variant="outlined"
                color="primary"
                startIcon={<AddBox />}
              >
                Crear perfil
              </Button>
            ) : (
              <Button
                disabled={loading}
                fullWidth
                variant="outlined"
                color="primary"
                startIcon={<Edit />}
              >
                Editar perfil
              </Button>
            )}
          </Grid>
          <Grid item xs={12} style={gridStyle}>
            <Card style={{ height: 50, backgroundColor: color }} />
          </Grid>
          <Grid item xs={12} style={gridStyle}>
            <TwitterPicker
              color={color}
              width={"100%"}
              onChange={(newColor) => {
                setColor(newColor.hex);
                console.log(newColor);
              }}
            />
          </Grid>
          <Grid item xs={12} style={gridStyle}>
            <Autocomplete
              disabled={loading}
              multiple
              id="checkboxes-tags-demo"
              options={koboUsers}
              fullWidth
              value={usersSelected}
              onChange={(event: any, newValue: KoboUser[]) => {
                console.log(newValue);
                setUsersSelected(newValue);
              }}
              disableCloseOnSelect
              disableClearable
              getOptionLabel={(option) => option.username}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={<CheckBoxOutlineBlank fontSize="small" />}
                    checkedIcon={<CheckBox fontSize="small" />}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.username}
                </React.Fragment>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Miembros"
                  placeholder="Buscar usuarios"
                />
              )}
            />
          </Grid>
          {organization.parentOrganizationId !== undefined && (
            <Grid
              item
              xs={12}
              style={{
                ...gridStyle,
                color: "red",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                disabled={loading}
                variant="contained"
                color="secondary"
                startIcon={<Delete />}
              >
                Eliminar Organizacion
              </Button>
            </Grid>
          )}
          <Grid item xs={12} style={{ ...gridStyle, color: "red" }}>
            {error}
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
