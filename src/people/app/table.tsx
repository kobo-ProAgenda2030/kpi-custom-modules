import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { PostProfile, Profile } from '../models/profile';
import { useBehaviorState } from '../../utils/useBehaviorState';
import { peopleData } from './people_body';
import { IconButton, Typography } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { FullScreenDialog } from './modal';


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Profile;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'userName', numeric: false, disablePadding: true, label: 'Usuario' },
  { id: 'name', numeric: false, disablePadding: true, label: 'Nombre' },
  { id: 'formation', numeric: false, disablePadding: true, label: 'Formacion' },
  { id: 'address', numeric: false, disablePadding: true, label: 'Direccion' },
  { id: 'phone', numeric: false, disablePadding: true, label: 'Telefonos' },
  // { id: 'professionals', numeric: true, disablePadding: true, label: 'Profesionales' },
  // { id: 'employes', numeric: true, disablePadding: true, label: 'Empleados' },
  { id: 'department', numeric: false, disablePadding: true, label: 'Departamento' },
  { id: 'province', numeric: false, disablePadding: true, label: 'Provincia' },
  { id: 'municipality', numeric: false, disablePadding: true, label: 'Municipio' },
  // { id: 'waterConnections', numeric: true, disablePadding: true, label: 'Agua potable' },
  // { id: 'connectionsWithMeter', numeric: true, disablePadding: true, label: 'Con medidor' },
  // { id: 'connectionsWithoutMeter', numeric: true, disablePadding: true, label: 'Sin medidor' },
  // { id: 'publicPools', numeric: true, disablePadding: true, label: 'Piletas Publicas' },
  // { id: 'latrines', numeric: true, disablePadding: true, label: 'Letrinas' },
  // { id: 'serviceContinuity', numeric: false, disablePadding: true, label: 'Continuidad del Servicio' },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Profile) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof Profile) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (

    <TableHead>

      <TableRow style={{ background: "#22B6C3",color:"white" }}>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={'default'}
            colSpan={"name" === headCell.id ? 1 : undefined}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              style={{ textAlign: "center", fontWeight: "bold",color:"white" }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell
          key={"actions"}
          padding={'default'}
          align={"center"}
        >
          {""}
        </TableCell>
      </TableRow>
    </TableHead>
  );
}



const useStyles = makeStyles(() =>
  createStyles({
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);

export function EnhancedTable() {

  const rows: Profile[] = useBehaviorState(peopleData.users)
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Profile>('userName');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Profile) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const [editProfile, setEditProfile] = useState<PostProfile | null>(null)

  const loading = useBehaviorState(peopleData.loading)

  return (
    <div>
      <Typography variant="h3" component="h2" style={{color:"#2D2F3A"}}>CAPyS</Typography>
      <Paper >
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody >
              {stableSort(rows, getComparator(order, orderBy))
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={index}
                    >
                      <TableCell component="th" >{row.userName}</TableCell>
                      <TableCell colSpan={1} >{row.name}</TableCell>
                      <TableCell  >{row.formation}</TableCell>
                      <TableCell  >{row.address}</TableCell>
                      <TableCell  >{row.phone}</TableCell>
                      {/* <TableCell align="right" >{row.professionals}</TableCell>
                      <TableCell align="right" >{row.employes}</TableCell> */}
                      <TableCell >{row.department}</TableCell>
                      <TableCell  >{row.province}</TableCell>
                      <TableCell >{row.municipality}</TableCell>
                      <TableCell >

                        <IconButton disabled={loading} aria-label="delete"
                          onClick={() => {
                            setEditProfile(row)
                          }}
                        >
                          <Edit />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <FullScreenDialog editProfile={editProfile} onClose={() => {
        setEditProfile(null)
      }} />
    </div>
  );
}
