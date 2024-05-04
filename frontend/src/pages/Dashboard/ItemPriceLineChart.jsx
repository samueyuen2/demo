import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';
import {
  Typography,
  InputLabel,
  Select,
  Grid,
  FormControl,
  OutlinedInput,
  Box,
  Chip,
  MenuItem,
} from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Chartjs & react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

import { searchBrands, searchItems, searchItem } from './DashboardSlice';

function ItemPriceLineChart() {
  const dispatch = useDispatch()
  const sliceState = useSelector((state) => state.dashboard)
  // console.log(sliceState)

  const [_filter_start, setFilterStart] = useState(moment("2022-02-01").startOf('day'))
  const [_filter_end, setFilterEnd] = useState(moment("2022-02-07").endOf('day'))
  const [_filter_manufacturer, setFilterManufacturer] = useState([])
  const [_filter_brand, setFilterBrand] = useState([])
  const [_filter_item, setFilterItem] = useState("")
  console.log("_filter_brand:", _filter_brand)

  const [_line_numberBase, setLineNumberBase] = useState(10)
  const [_line_lineAmount, setLineAmount] = useState(2)
  const [_line_labels, setLineLabels] = useState(['12/4', '13/4', '14/4', '15/4', '16/4', '17/4', '18/4'])
  // const [_line_labels, setLineLabels] = useState(['January', 'February', 'March', 'April', 'May', 'June', 'July'])

  const lineChartDataGenerator = (numberBase, lineAmount, labels, variantNumber) => {
    let temp = []
    for (let i = 0; i < lineAmount; i++) {
      const r = Math.random() * 255
      const g = Math.random() * 255
      const b = Math.random() * 255
      temp?.push({
        label: i === 0 ? "Our Brand" : `Brand ${i + 1}`,
        data: !!labels ? labels.map(() => numberBase + (Math.random() * variantNumber)) : [],
        borderColor: `rgb(${r}, ${g}, ${b})`,
        backgroundColor: `rgba(${r}, ${g}, ${b}, 0.75)`,
      })
    }
    return temp
  }

  return (
    <Grid container rowSpacing={2} columnSpacing={1}>
      {/* Title */}
      <Grid item xs="12">
        <Typography variant="h5">Item Price</Typography>
      </Grid >

      {/* Search Bars */}
      <Grid item xs="12" sm="6">
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
      <Grid item xs="12" sm="6">
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

      <Grid item xs="12">
        <FormControl sx={{ minWidth: "100%" }}>
          <InputLabel id="select_manufacturer">Manufacturers (Mother Companies)</InputLabel>
          <Select
            labelId="select_manufacturer"
            value={_filter_manufacturer}
            onChange={(e) => {
              setFilterManufacturer(e.target.value?.sort((a, b) => a.name > b.name ? 1 : -1));
            }}
            onClose={() => {
              dispatch(searchBrands({
                manufacturers: JSON.stringify(_filter_manufacturer?.map((m) => m?.id))
              }))
            }}
            input={<OutlinedInput id="selectinput_manufacturer" label="Manufacturers (Mother Companies)" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {_filter_manufacturer.map((value) => (<Chip key={value.id} label={value.name} />))}
              </Box>
            )}
            error={_filter_manufacturer?.length > 0 ? false : true}
            multiple
          >
            {sliceState?.manufacturers.map((manufacturer) => (
              <MenuItem key={manufacturer.name} value={manufacturer}>
                {manufacturer.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs="12">
        <FormControl sx={{ minWidth: "100%" }}>
          <InputLabel id="select_brand">Brands</InputLabel>
          <Select
            labelId="select_brand"
            value={_filter_brand}
            onChange={(e) => {
              setFilterBrand(e.target.value?.sort((a, b) => a.name > b.name ? 1 : -1));
              console.log("HIT!")
            }}
            onClose={() => {
              dispatch(searchItems({
                brands: JSON.stringify(_filter_brand?.map((b) => b?.id))
              }))
            }}
            input={<OutlinedInput id="selectinput_brand" label="Brands" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {_filter_brand.map((value) => (<Chip key={value?.id} label={value?.name} />))}
              </Box>
            )}
            disabled={_filter_manufacturer?.length > 0 ? false : true}
            multiple
          >
            {sliceState?.brands.map((brand) => (
              <MenuItem key={brand.name} value={brand}>
                {brand.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs="12">
        <FormControl sx={{ minWidth: "100%" }}>
          <InputLabel id="select_item">Items</InputLabel>
          <Select
            labelId="select_item"
            value={_filter_item}
            onChange={(e) => {
              setFilterItem(e.target.value)
              dispatch(searchItem({
                start: _filter_start?.toISOString(),
                end: _filter_end?.toISOString(),
                ean: e.target.value?.ean
              }))
            }}
            input={<OutlinedInput id="selectinput_item" label="Items" />}
            disabled={_filter_brand?.length > 0 ? false : true}
          >
            {sliceState?.items.map((item) => (
              <MenuItem key={item.id} value={item}>
                {item.ean} | {item.producttitle}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* <Grid item xs="12">
        <Line
          data={{
            labels: _line_labels,
            datasets: lineChartDataGenerator(
              _line_numberBase,
              _line_lineAmount,
              _line_labels,
              2
            )
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: {
                display: true,
                text: 'Daily Price',
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Date'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Pound (£)'
                }
              }
            },
            maintainAspectRatio: false
          }}
          width={100}
          height={175}
        // style={{ border: "2px solid", borderBottom: "1px solid" }}
        />
      </Grid>
      <Grid item xs="12">
        <Line
          data={{
            labels: _line_labels,
            datasets: lineChartDataGenerator(
              300,
              1,
              _line_labels,
              50
            )
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: {
                display: true,
                text: 'Daily Total Sales',
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Date'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Can (dozens)'
                }
              }
            },
            maintainAspectRatio: false
          }}
          width={100}
          height={225}
        // style={{ border: "2px solid", borderTop: "1px solid" }}
        />
      </Grid> */}

    </Grid >
  )
}

export default ItemPriceLineChart;