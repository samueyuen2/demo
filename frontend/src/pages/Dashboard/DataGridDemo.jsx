import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90, align: "center", headerAlign: "center" },
  {
    field: 'borough',
    headerName: 'Borough',
    minWidth: 250,
    editable: true, align: "center", headerAlign: "center", flex: 3,
  },
  {
    field: 'saintberry',
    headerName: 'Saintberry',
    minWidth: 150,
    editable: true,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <div style={{ backgroundColor: params?.row?.saintberry > 75 ? "#85ff91" : params?.row?.saintberry > 25 ? "#fff48c" : "#ff9ca7" }}>{params?.row?.saintberry}</div>
    }, flex: 1,
  },
  {
    field: 'morrysgirl',
    headerName: "Morry'sGirl",
    minWidth: 150,
    editable: true,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <div style={{ backgroundColor: params?.row?.morrysgirl > 75 ? "#85ff91" : params?.row?.morrysgirl > 25 ? "#fff48c" : "#ff9ca7" }}>{params?.row?.morrysgirl}</div>
    }, flex: 1,
  },
  {
    field: 'tesko',
    headerName: 'Tesko',
    minWidth: 150,
    editable: true,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <div style={{ backgroundColor: params?.row?.tesko > 75 ? "#85ff91" : params?.row?.tesko > 25 ? "#fff48c" : "#ff9ca7" }}>{params?.row?.tesko}</div>
    }, flex: 1,
  },
];

const rows = [
  { id: 1, borough: "Hillingdon", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 2, borough: "City of Westminster", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 3, borough: "Kensington and Chelsea", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 4, borough: "Hammersmith and Fulham", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 5, borough: "Wandsworth", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 6, borough: "Lambeth", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 7, borough: "Southwark", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 8, borough: "Tower Hamlets", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 9, borough: "Hackney", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 10, borough: "Islington", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 11, borough: "Camden", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 12, borough: "Brent", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 13, borough: "Ealing", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 14, borough: "Hounslow", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 15, borough: "Richmond upon Thames", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 16, borough: "Kingston upon Thames", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 17, borough: "Merton", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 18, borough: "Sutton", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 19, borough: "Croydon", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 20, borough: "Bromley", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 21, borough: "Lewisham", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 22, borough: "Greenwich", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 23, borough: "Bexley", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 24, borough: "Havering", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 25, borough: "Barking and Dagenham", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 26, borough: "Redbridge", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 27, borough: "Newham", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 28, borough: "Waltham Forest", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 29, borough: "Haringey", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 30, borough: "Enfield", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 31, borough: "Barnet", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
  { id: 32, borough: "Harrow", saintberry: Math.ceil(Math.random() * 99), morrysgirl: Math.ceil(Math.random() * 99), tesko: Math.ceil(Math.random() * 99) },
]

export default function DataGridDemo() {
  return (
    <Box sx={{ maxHeight: 750, width: '100%', m: "1rem 0" }}>

      <Typography variant='h5' color={"dark"} sx={{ m: "1rem 0" }}>
        Greater London Stock Overview (in %)
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