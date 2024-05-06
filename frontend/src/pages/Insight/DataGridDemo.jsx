import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const columns = [
  {
    field: 'image', headerName: 'Image', width: 70, align: "center", headerAlign: "center",
    renderCell: (params) => { return <img src={params?.row?.image} height="100%" width="auto" /> },
  },
  {
    field: 'producttitle',
    headerName: 'Product Title',
    minWidth: 350,
    editable: true, align: "center", headerAlign: "center", flex: 3,
  },
  {
    field: 'asda', headerName: 'Asda', minWidth: 130, editable: true, align: "center", headerAlign: "center",
    renderCell: (params) => {
      return <div style={{ backgroundColor: params?.row?.asda == 999999 ? "#85ff91" : params?.row?.asda > 0 ? "#fff48c" : "#ff9ca7" }}>
        {params?.row?.asda == 999999 ? "In Stock" : params?.row?.asda > 0 ? `${params?.row?.asda} Left` : "Out of Stock"}
      </div>
    }, flex: 1,
  },
  {
    field: 'morrisons', headerName: "Morrisons", minWidth: 130, editable: true, align: "center", headerAlign: "center",
    renderCell: (params) => {
      return <div style={{ backgroundColor: params?.row?.morrisons == 999999 ? "#85ff91" : params?.row?.morrisons > 0 ? "#fff48c" : "#ff9ca7" }}>
        {params?.row?.morrisons == 999999 ? "In Stock" : params?.row?.morrisons > 0 ? `${params?.row?.morrisons} Left` : "Out of Stock"}
      </div>
    }, flex: 1,
  },
  {
    field: 'ocado', headerName: 'Ocado', minWidth: 130, editable: true, align: "center", headerAlign: "center",
    renderCell: (params) => {
      return <div style={{ backgroundColor: params?.row?.ocado == 999999 ? "#85ff91" : params?.row?.ocado > 0 ? "#fff48c" : "#ff9ca7" }}>
        {params?.row?.ocado == 999999 ? "In Stock" : params?.row?.ocado > 0 ? `${params?.row?.ocado} Left` : "Out of Stock"}
      </div>
    }, flex: 1,
  },
  {
    field: 'sainsburys', headerName: 'Sainsburys', minWidth: 130, editable: true, align: "center", headerAlign: "center",
    renderCell: (params) => {
      return <div style={{ backgroundColor: params?.row?.sainsburys == 999999 ? "#85ff91" : params?.row?.sainsburys > 0 ? "#fff48c" : "#ff9ca7" }}>
        {params?.row?.sainsburys == 999999 ? "In Stock" : params?.row?.sainsburys > 0 ? `${params?.row?.sainsburys} Left` : "Out of Stock"}
      </div>
    }, flex: 1,
  },
  {
    field: 'tesco', headerName: 'Tesco', minWidth: 130, editable: true, align: "center", headerAlign: "center",
    renderCell: (params) => {
      return <div style={{ backgroundColor: params?.row?.tesco == 999999 ? "#85ff91" : params?.row?.tesco > 0 ? "#fff48c" : "#ff9ca7" }}>
        {params?.row?.tesco == 999999 ? "In Stock" : params?.row?.tesco > 0 ? `${params?.row?.tesco} Left` : "Out of Stock"}
      </div>
    }, flex: 1,
  },
];

const rows = [
  { id: 1, producttitle: "Morrisons The Best Chai 50 Tea Bags 100g", asda: 0, ocado: 999999, sainsburys: 999999, morrisons: 999999, tesco: 999999, image: "https://s3.eu-central-1.amazonaws.com/bn.production.core-images/557400011" },
  { id: 2, producttitle: "Good Earth Rooibos Chai Tea Bags x15", asda: Math.ceil(Math.random() * 30), ocado: 999999, sainsburys: Math.ceil(Math.random() * 30), morrisons: Math.ceil(Math.random() * 30), tesco: 999999, image: "https://s3.eu-central-1.amazonaws.com/bn.production.core-images/5000208053049" },
  { id: 3, producttitle: "Tuk Tuk Chai Flavoursome Masala Chai 250ml", asda: 0, ocado: 999999, sainsburys: 999999, morrisons: 999999, tesco: Math.ceil(Math.random() * 30), image: "https://s3.eu-central-1.amazonaws.com/bn.production.core-images/510266011" },
  { id: 4, producttitle: "Minor Figures Nitro Chai Latte 200ml", asda: 999999, ocado: Math.ceil(Math.random() * 30), sainsburys: Math.ceil(Math.random() * 30), morrisons: 999999, tesco: 999999, image: "https://s3.eu-central-1.amazonaws.com/bn.production.core-images/513091011" },
  { id: 5, producttitle: "Teapigs Chai Tea Bags 15 per pack", asda: 999999, ocado: 999999, sainsburys: Math.ceil(Math.random() * 30), morrisons: Math.ceil(Math.random() * 30), tesco: 999999, image: "https://s3.eu-central-1.amazonaws.com/bn.production.core-images/5060136750021" },
  { id: 6, producttitle: "Wunder Workshop Turmeric Chai 70g", asda: 999999, ocado: Math.ceil(Math.random() * 30), sainsburys: 999999, morrisons: 0, tesco: Math.ceil(Math.random() * 30), image: "https://s3.eu-central-1.amazonaws.com/bn.production.core-images/0797776194667" },
  { id: 7, producttitle: "Teapigs Chilli Chai Tea Bags 15 per pack", asda: 999999, ocado: 999999, sainsburys: 999999, morrisons: Math.ceil(Math.random() * 30), tesco: 999999, image: "https://s3.eu-central-1.amazonaws.com/bn.production.core-images/5060136750038" },
  { id: 8, producttitle: "Lavazza Qualità Oro Coffee Beans 250g", asda: 0, ocado: Math.ceil(Math.random() * 30), sainsburys: Math.ceil(Math.random() * 30), morrisons: 999999, tesco: 999999, image: "https://s3.eu-central-1.amazonaws.com/bn.production.core-images/8000070012219" },
  { id: 9, producttitle: "Taylors of Harrogate Rich Italian Beans Roast Coffee 227g", asda: 999999, ocado: 999999, sainsburys: 999999, morrisons: 999999, tesco: Math.ceil(Math.random() * 30), image: "https://s3.eu-central-1.amazonaws.com/bn.production.core-images/0615357120648" },
  { id: 10, producttitle: "Leon Fairtrade Organic Coffee Dark Roast Whole Bean 200g", asda: 999999, ocado: Math.ceil(Math.random() * 30), sainsburys: 999999, morrisons: 0, tesco: 0, image: "https://s3.eu-central-1.amazonaws.com/bn.production.core-images/5060699970775" },
  { id: 11, producttitle: "Tetley Softpack 240 Teabags 750g", asda: 999999, ocado: Math.ceil(Math.random() * 30), sainsburys: Math.ceil(Math.random() * 30), morrisons: 999999, tesco: 999999, image: "https://s3.eu-central-1.amazonaws.com/bn.production.core-images/5000208069897" },
  { id: 12, producttitle: "Yorkshire Tea 160 Tea Bags 500g", asda: 999999, ocado: 999999, sainsburys: Math.ceil(Math.random() * 30), morrisons: Math.ceil(Math.random() * 30), tesco: 999999, image: "https://s3.eu-central-1.amazonaws.com/bn.production.core-images/5010357112085" },
  { id: 13, producttitle: "Clipper Organic Decaf Everyday Tea x80 Tea Bags 250g", asda: 999999, ocado: Math.ceil(Math.random() * 30), sainsburys: 999999, morrisons: 0, tesco: Math.ceil(Math.random() * 30), image: "https://s3.eu-central-1.amazonaws.com/bn.production.core-images/5021991938276" },
  { id: 14, producttitle: "Twinings Strong English Breakfast 80 Tea Bags 250g", asda: 999999, ocado: 999999, sainsburys: 999999, morrisons: Math.ceil(Math.random() * 30), tesco: 999999, image: "https://s3.eu-central-1.amazonaws.com/bn.production.core-images/0070177136994" },
  { id: 15, producttitle: "Brew Tea Co English Breakfast Tea Bags 15 per pack", asda: 0, ocado: Math.ceil(Math.random() * 30), sainsburys: Math.ceil(Math.random() * 30), morrisons: 999999, tesco: 999999, image: "https://s3.eu-central-1.amazonaws.com/bn.production.core-images/428699011" },

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