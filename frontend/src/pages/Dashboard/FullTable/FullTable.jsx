import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';
import {
  Grid,
  Paper,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DataGrid } from '@mui/x-data-grid';

import slice, { getBasicInfo, searchRecords } from './FullTableSlice';
import PickerAccordion from './PickerAccordion';

function FullTable() {
  const dispatch = useDispatch()
  const sliceState = useSelector((state) => state.fullTable)
  console.log("sliceState", sliceState)

  const [_filter_start, setFilterStart] = useState(moment("2022-02-01").startOf('day'))
  const [_filter_end, setFilterEnd] = useState(moment("2022-02-07").endOf('day'))
  const [_filter_category, setFilterCategory] = useState([])
  const [_filter_manufacturer, setFilterManufacturer] = useState([])
  const [_filter_brand, setFilterBrand] = useState([])
  const [_filter_retailer, setFilterRetailer] = useState([])
  const [_filter_keyword, setFilterkeyword] = useState([])
  const [_filter_promotion, setFilterPromotion] = useState(null)

  useEffect(() => {
    dispatch(getBasicInfo())
    return () => { dispatch(slice.actions.resetStore()) }
  }, [])

  const columns = [
    { field: 'date', headerName: 'Date', width: 100, align: "center", headerAlign: "center" },
    { field: 'ean', headerName: 'EAN', width: 125, align: "center", headerAlign: "center" },
    { field: 'producttitle', headerName: 'Product Title', width: 350, align: "center", headerAlign: "center", editable: true, },
    {
      field: 'image', headerName: 'Image', width: 100, align: "center", headerAlign: "center",
      renderCell: (params) => { return <img src={params?.row?.image} height="100%" width="auto" /> },
    },
    {
      field: 'category', headerName: 'Category', width: 175, align: "center", headerAlign: "center",
      renderCell: (params) => { return params?.row?.category?.name },
    },
    {
      field: 'manufacturer', headerName: 'Manufacturer', width: 175, align: "center", headerAlign: "center",
      renderCell: (params) => { return params?.row?.manufacturer?.name },
    },
    {
      field: 'retailer', headerName: 'Retailer', width: 100, align: "center", headerAlign: "center",
      renderCell: (params) => { return params?.row?.retailer?.name },
    },
    {
      field: 'brand', headerName: 'Brand', width: 175, align: "center", headerAlign: "center",
      renderCell: (params) => { return params?.row?.brand?.name },
    },
    {
      field: 'onpromotion', headerName: 'On Promotion?', width: 125, align: "center", headerAlign: "center",
      renderCell: (params) => { return params?.row?.onpromotion ? "Yes" : "No" },
    },
    {
      field: 'promotiondesc', headerName: 'Promotion Description', width: 175, align: "center", headerAlign: "center", editable: true,
      renderCell: (params) => { return params?.row?.promotiondesc ? params?.row?.promotiondesc : "N/A" },
    },
    {
      field: 'baseprice', headerName: 'Base Price', width: 125, align: "center", headerAlign: "center",
      renderCell: (params) => { return "£" + params?.row?.baseprice },
    },
    {
      field: 'promotedprice', headerName: 'Promoted Price', width: 150, align: "center", headerAlign: "center",
      renderCell: (params) => { return "£" + params?.row?.promotedprice },
    },
    {
      field: 'shelfprice', headerName: 'Shelf Price', width: 125, align: "center", headerAlign: "center",
      renderCell: (params) => { return "£" + params?.row?.shelfprice },
    },
  ];

  return (
    <Paper elevation={1} sx={{ p: 3, mt: 3 }}>
      <Grid container rowSpacing={1.5} columnSpacing={1}>
        <Grid item xs={12}>
          <Typography variant="h5">Daily Price Record Search</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label="Time Range (Start)"
                slotProps={{
                  textField: {
                    helperText: 'MM/DD/YYYY',
                    fullWidth: true,
                  },
                }}
                value={_filter_start}
                onChange={(value) => { setFilterStart(value) }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid >
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label="Time Range (End)"
                slotProps={{
                  textField: {
                    helperText: 'MM/DD/YYYY',
                    fullWidth: true,
                  },
                }}
                value={_filter_end}
                onChange={(value) => { setFilterEnd(value) }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid >
        <Grid item xs={12}>
          <PickerAccordion list={sliceState?.categories} label="Categories" selected={_filter_category} setSelected={setFilterCategory} />
        </Grid>
        <Grid item xs={12}>
          <PickerAccordion list={sliceState?.manufacturers} label="Manufacturers" selected={_filter_manufacturer} setSelected={setFilterManufacturer} />
        </Grid>
        <Grid item xs={12}>
          <PickerAccordion list={sliceState?.brands} label="Brands" selected={_filter_brand} setSelected={setFilterBrand} />
        </Grid>
        <Grid item xs={12}>
          <PickerAccordion list={sliceState?.retailers} label="Retailers" selected={_filter_retailer} setSelected={setFilterRetailer} />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Keyword of Product Title (Optional)"
            value={_filter_keyword}
            onChange={(e) => { setFilterkeyword(e.target.value) }}
            fullWidth
          />
        </Grid>
        <Grid item xs>
          <ToggleButtonGroup
            value={_filter_promotion}
            onChange={(e, value) => { setFilterPromotion(value) }}
            color='primary'
            sx={{ height: "3.5rem" }}
            exclusive
          >
            <ToggleButton value={true}>
              <Typography variant="body1">On Promotion</Typography>
            </ToggleButton>
            <ToggleButton value={false}>
              <Typography variant="body1">Not On Promotion</Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant='contained'
            onClick={() => {
              dispatch(searchRecords({
                start: _filter_start?.toISOString(),
                end: _filter_end?.toISOString(),
                categories: JSON.stringify(_filter_category?.map((c) => c.id)),
                manufacturers: JSON.stringify(_filter_manufacturer?.map((m) => m.id)),
                brands: JSON.stringify(_filter_brand?.map((b) => b.id)),
                retailers: JSON.stringify(_filter_retailer?.map((r) => r.id)),
                keyword: _filter_keyword,
                onpromotion: _filter_promotion
              }))
            }}
            sx={{ height: "3.5rem" }}
            fullWidth
          >
            Search
          </Button>
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            rows={sliceState?.records ?? []}
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
        </Grid>
      </Grid>
    </Paper>
  )
}

export default FullTable;