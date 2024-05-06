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
  Paper
} from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import DrinkPicture from '../../assets/drink.jpg'

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

import slice, { getBasicInfo, searchBrands, searchItems, searchItem } from './ItemPriceLineChartSlice';

function ItemPriceLineChart() {
  const dispatch = useDispatch()
  const sliceState = useSelector((state) => state.itemPriceLineChart)

  const [_filter_start, setFilterStart] = useState(moment("2022-02-01").startOf('day'))
  const [_filter_end, setFilterEnd] = useState(moment("2022-02-07").endOf('day'))
  const [_filter_manufacturer, setFilterManufacturer] = useState([{ "id": "68b1d94a-b653-49d3-b7ff-8ca4849b1790", "name": "Vitasoy International Holdings Ltd" }])
  const [_filter_brand, setFilterBrand] = useState([{ "id": "2f209a99-3dec-40f5-8f0a-28a3d5c058e6", "name": "Vita", "createdat": "2024-05-04", "updatedat": "2024-05-04" }])
  const [_filter_items, setFilterItems] = useState({})
  const [_filter_item, setFilterItem] = useState({})

  const [_line_labels, setLineLabels] = useState(['1/2', '2/2', '3/2', '4/2', '5/2', '6/2', '7/2'])

  useEffect(() => {
    dispatch(getBasicInfo())
    setFilterItem(sliceState?.items?.[0])
    dispatch(searchItem({
      start: _filter_start?.toISOString(),
      end: _filter_end?.toISOString(),
      ean: "4891028711469"
    }))
    return () => { dispatch(slice.actions.resetStore()) }
  }, [])

  useEffect(() => {
    let _labels = []
    let _start = _filter_start.clone()
    let _end = _filter_end.clone()
    const daysBetween = _end.diff(_start, 'days') + 1
    for (let i = 0; i < daysBetween; i++) {
      _labels.push(_start.format('DD/MM'))
      _start.add(1, 'day')
      if (_start.valueOf() > _end.valueOf()) { break; }
    }
    setLineLabels(_labels)
  }, [_filter_start, _filter_end])

  const lineChartDataGenerator = (records) => {
    let _result = []
    let retailerNames = Object.keys(records)
    for (let i = 0; i < retailerNames.length; i++) {
      const r = Math.random() * 255
      const g = Math.random() * 255
      const b = Math.random() * 255
      _result?.push({
        label: retailerNames[i],
        data: records[retailerNames[i]]?.map((r) => r.onpromotion ? r.promotedprice : r.shelfprice),
        borderColor: `rgb(${r}, ${g}, ${b})`,
        backgroundColor: `rgba(${r}, ${g}, ${b}, 0.75)`,
      })
    }
    return _result
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={10}>
        <Paper elevation={1} sx={{ p: 3 }}>
          <Grid container rowSpacing={2} columnSpacing={1}>
            {/* Title */}
            <Grid item xs={12}>
              <Typography variant="h5">Daily Shelf Price Trend</Typography>
            </Grid >

            {/* Search Bars */}
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
            </Grid>
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

            <Grid item xs={12}>
              <FormControl sx={{ minWidth: "100%" }}>
                <InputLabel id="select_brand">Brands</InputLabel>
                <Select
                  labelId="select_brand"
                  value={_filter_brand}
                  onChange={(e) => {
                    setFilterBrand(e.target.value?.sort((a, b) => a.name > b.name ? 1 : -1));
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

            <Grid item xs={12}>
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

            <Grid item xs={12}>
              <Line
                data={{
                  labels: _line_labels,
                  datasets: lineChartDataGenerator(sliceState?.result)
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' },
                    title: {
                      display: true,
                      text: 'Daily Shelf Price',
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
                height={300}
              // style={{ border: "2px solid", borderBottom: "1px solid" }}
              />
            </Grid>

          </Grid >
        </Paper>
      </Grid>
      <Grid item xs={2}>
        <Paper elevation={1} sx={{ p: 1 }}>
          {
            !!_filter_item ?
              <>
                <img src={_filter_item?.image} height="auto" width="100%" />
                <br /><br />
                <Chip label={"Product Title"} />
                <Typography variant="body1" style={{ overflow: "auto" }}>
                  {_filter_item?.producttitle}
                </Typography>
                <br />
                <Chip label={"EAN"} />
                <Typography variant="body1" style={{ overflow: "auto" }}>
                  {_filter_item?.ean}
                </Typography>
              </> :
              <>
                <img src={DrinkPicture} height="auto" width="100%" style={{ opacity: 0.1 }} />
                <br /><br />
                <Chip label={"Product Title"} />
                <Typography variant="body1" style={{ overflow: "auto" }}>
                  Please Select an Item
                </Typography>
                <br />
                <Chip label={"EAN"} />
                <Typography variant="body1" style={{ overflow: "auto" }}>
                  Please Select an Item
                </Typography>
              </>
          }
        </Paper>
      </Grid>
    </Grid>
  )
}

export default ItemPriceLineChart;