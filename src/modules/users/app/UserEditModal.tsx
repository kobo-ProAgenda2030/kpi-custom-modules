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
import { Checkbox, Chip, Grid, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { CheckBox, CheckBoxOutlineBlank } from "@material-ui/icons";
import { UseExecuter } from "../../../utils/useExecuter";
import { KoboUser, KoboUserOrganization } from "../../../models/KoboUser";
import { UserRol, userRoles } from "../../../models/UserRol";

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
export function EditUserProfileDialog({
  koboUser,
  onClose,
}: {
  koboUser: KoboUser;
  onClose: (cancelled: boolean) => void;
}) {
  const classes = useStyles();

  const [didMount, setDidMount] = useState(false);
  const [usersSelected, setUsersSelected] = React.useState<UserRol[]>([]);
  const [organizationsSelected, setOrganizationsSelected] = React.useState<
    KoboUserOrganization[]
  >(koboUser.organizations);
  const { loading, error } = UseExecuter();
  useEffect(() => {
    if (koboUser !== null) {
      // setName(organization.name);
      const users: UserRol[] = [];
      koboUser.roles.forEach((user) => {
        const userFound = userRoles.find((KoboUser) => {
          return user === KoboUser.id;
        });
        if (userFound !== undefined) users.push(userFound);
      });
      setUsersSelected(users);
    }
    setDidMount(true);
    return () => setDidMount(false);
  }, [koboUser]);
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
              Editar Usuario
            </Typography>
            <Button
              disabled={loading}
              autoFocus
              color="inherit"
              onClick={() => {
                // if (organization !== null) {
                //   executer(async () => {
                //     await organizationData.updateCreateOrganization({
                //       organizationId: organization.organizationId,
                //       parentOrganizationId: organization.parentOrganizationId,
                //       name: name,
                //       color: "",
                //       profileId: organization.profileId,
                //       members: usersSelected.map((user) => user.id),
                //     });
                //     organization.name = name;
                //     organization.members = usersSelected.map((user) => user.id);
                //     organization.color = color;
                //     onClose(false);
                //   });
                // }
              }}
            >
              Guardar
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container style={{ paddingTop: 20, paddingBottom: 10 }}>
          <Grid item xs={12} style={gridStyle}>
            <Autocomplete
              disabled={loading}
              multiple
              id="checkboxes-tags-demo"
              options={userRoles}
              fullWidth
              value={usersSelected}
              onChange={(event: any, newValue: UserRol[]) => {
                console.log(newValue);
                setUsersSelected(newValue);
              }}
              disableCloseOnSelect
              disableClearable
              getOptionLabel={(option) => option.name}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={<CheckBoxOutlineBlank fontSize="small" />}
                    checkedIcon={<CheckBox fontSize="small" />}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.name}
                </React.Fragment>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Roles"
                  placeholder="Buscar roles"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} style={gridStyle}>
            <Autocomplete
              disabled={loading}
              multiple
              id="checkboxes-tags-demo"
              options={koboUser.organizations}
              fullWidth
              value={organizationsSelected}
              onChange={(event: any, newValue: KoboUserOrganization[]) => {
                console.log(newValue);
                setOrganizationsSelected(newValue);
              }}
              disableCloseOnSelect
              disableClearable
              getOptionLabel={(option) => option.name}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <Chip
                    label={option.name}
                    {...getTagProps({ index })}
                    style={{ color: option.color }}
                  />
                ))
              }
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={<CheckBoxOutlineBlank fontSize="small" />}
                    checkedIcon={<CheckBox fontSize="small" />}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.name}
                </React.Fragment>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Organizaciones"
                  placeholder=""
                />
              )}
            />
          </Grid>
          <Grid item xs={12} style={{ ...gridStyle, color: "red" }}>
            {error}
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
