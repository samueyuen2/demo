import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const columns = [
  { field: 'id', headerName: 'ID', width: 90, align: "center", headerAlign: "center" },
  {
    field: 'borough',
    headerName: 'Borough',
    minWidth: 250,
    editable: true, align: "center", headerAlign: "center", flex: 3,
  },
  {
    field: 'sainsburys',
    headerName: 'Sainsburys',
    minWidth: 150,
    editable: true,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <div style={{ backgroundColor: params?.row?.sainsburys > 75 ? "#85ff91" : params?.row?.sainsburys > 25 ? "#fff48c" : "#ff9ca7" }}>{params?.row?.sainsburys}</div>
    }, flex: 1,
  },
  {
    field: 'morrisons',
    headerName: "Morrisons",
    minWidth: 150,
    editable: true,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <div style={{ backgroundColor: params?.row?.morrisons > 75 ? "#85ff91" : params?.row?.morrisons > 25 ? "#fff48c" : "#ff9ca7" }}>{params?.row?.morrisons}</div>
    }, flex: 1,
  },
  {
    field: 'waitrose',
    headerName: 'Waitrose',
    minWidth: 150,
    editable: true,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <div style={{ backgroundColor: params?.row?.waitrose > 75 ? "#85ff91" : params?.row?.waitrose > 25 ? "#fff48c" : "#ff9ca7" }}>{params?.row?.waitrose}</div>
    }, flex: 1,
  },
];

const rows = [
  { id: 1, borough: "Hillingdon", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 2, borough: "City of Westminster", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 3, borough: "Kensington and Chelsea", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 4, borough: "Hammersmith and Fulham", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 5, borough: "Wandsworth", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 6, borough: "Lambeth", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 7, borough: "Southwark", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 8, borough: "Tower Hamlets", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 9, borough: "Hackney", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 10, borough: "Islington", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 11, borough: "Camden", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 12, borough: "Brent", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 13, borough: "Ealing", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 14, borough: "Hounslow", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 15, borough: "Richmond upon Thames", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 16, borough: "Kingston upon Thames", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 17, borough: "Merton", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 18, borough: "Sutton", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 19, borough: "Croydon", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 20, borough: "Bromley", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 21, borough: "Lewisham", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 22, borough: "Greenwich", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 23, borough: "Bexley", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 24, borough: "Havering", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 25, borough: "Barking and Dagenham", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 26, borough: "Redbridge", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 27, borough: "Newham", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 28, borough: "Waltham Forest", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 29, borough: "Haringey", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 30, borough: "Enfield", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 31, borough: "Barnet", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
  { id: 32, borough: "Harrow", sainsburys: Math.ceil(Math.random() * 99), morrisons: Math.ceil(Math.random() * 99), waitrose: Math.ceil(Math.random() * 99) },
]

export default function DataGridDemo() {
  return (
    <Box sx={{ maxHeight: 750, width: '100%', m: "1rem 0" }}>

      <Typography variant='h5' color={"dark"} sx={{ m: "1rem 0" }}>
        Greater London Stock Overview (in %).<br /><i><u>Please press <MoreVertIcon /> in column headers to apply extra filters.</u></i>
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 50]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}