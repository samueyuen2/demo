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
  Typography,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Box,
  Chip,
  MenuItem,
} from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DataGrid } from '@mui/x-data-grid';

// Chartjs & react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import slice, { searchRecords } from './MarketShareChartsSlice';

function MarketShareCharts() {
  const dispatch = useDispatch()
  const fullTableSliceState = useSelector((state) => state.fullTable)
  const sliceState = useSelector((state) => state.marketShareCharts)
  console.log("sliceState", sliceState)

  const [_filter_start, setFilterStart] = useState(moment("2022-02-01").startOf('day'))
  const [_filter_end, setFilterEnd] = useState(moment("2022-02-07").endOf('day'))
  const [_filter_retailer, setFilterRetailer] = useState('')
  const [_filter_keyword, setFilterkeyword] = useState('Coffee')
  const [_filter_groupby, setFilterGroupBy] = useState('categories')

  // for default selection for demo
  useEffect(() => {
    if (fullTableSliceState?.retailers?.length > 0) {
      setFilterRetailer(fullTableSliceState?.retailers?.[1])
      dispatch(searchRecords({
        start: _filter_start?.toISOString(),
        end: _filter_end?.toISOString(),
        retailers: JSON.stringify([fullTableSliceState?.retailers?.[1].id]),
        keyword: _filter_keyword,
        groupby: _filter_groupby
      }))
    }
  }, [fullTableSliceState?.retailers])

  const PieChartDataGenerator = (mapArray) => {
    let _total = mapArray?.reduce((acc, m) => { return acc + m[1] }, 0)
    let backgroundColor = []
    let borderColor = []
    for (let i = 0; i < mapArray?.length; i++) {
      const r = Math.random() * 255
      const g = Math.random() * 255
      const b = Math.random() * 255
      backgroundColor.push(`rgb(${r}, ${g}, ${b}, 0.75)`)
      borderColor.push(`rgba(${r}, ${g}, ${b})`)
    }
    return {
      labels: mapArray?.map((m) => m[0]),
      datasets: [
        {
          label: 'Percentage(%)',
          data: mapArray?.map((m) => ((m[1] / _total) * 100).toFixed(2)),
          backgroundColor,
          borderColor,
          borderWidth: 1,
        },
      ],
    }
  }

  const BarChartDataGenerator = (mapArray) => {
    let _total = mapArray?.reduce((acc, m) => { return acc + m[1] }, 0)
    let backgroundColor = []
    let borderColor = []
    for (let i = 0; i < mapArray?.length; i++) {
      const r = Math.random() * 255
      const g = Math.random() * 255
      const b = Math.random() * 255
      backgroundColor.push(`rgb(${r}, ${g}, ${b}, 0.75)`)
      borderColor.push(`rgba(${r}, ${g}, ${b})`)
    }
    return {
      labels: mapArray?.map((m) => m[0]),
      datasets: [
        {
          label: 'Count',
          data: mapArray?.map((m) => m[1]),
          backgroundColor,
          borderColor,
          borderWidth: 1,
        },
      ],
    }
  }

  return (
    <Paper elevation={1} sx={{ p: 3, mt: 3 }}>
      <Grid container columnSpacing={2}>
        <Grid item xs={12} sx={{ mb: "1rem" }}>
          <Typography variant="h4">Distribution</Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
              {/* <Typography variant="h6">Please select a Retailer</Typography> */}
              <FormControl sx={{ minWidth: "100%" }}>
                <InputLabel id="select_brand">Retailers</InputLabel>
                <Select
                  labelId="select_brand"
                  value={_filter_retailer}
                  onChange={(e) => {
                    setFilterRetailer(e.target.value);
                  }}
                  input={<OutlinedInput id="selectinput_brand" label="Retailers" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      <Chip key={_filter_retailer.id} label={_filter_retailer.name} />
                    </Box>
                  )}
                  error={!_filter_retailer}
                >
                  {fullTableSliceState?.retailers.map((retailer) => (
                    <MenuItem key={retailer.name} value={retailer}>
                      {retailer.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid item xs={12}>
              <Typography variant="h6">Group By?</Typography>
              <ToggleButtonGroup
                value={_filter_groupby}
                onChange={(e, value) => { if (value !== null) setFilterGroupBy(value) }}
                color='primary'
                sx={{ height: "5rem" }}
                fullWidth
                exclusive
              >
                <ToggleButton value={"brands"}>
                  <Typography variant="body1">Brands</Typography>
                </ToggleButton>
                <ToggleButton value={"manufacturer"}>
                  <Typography variant="body1">Manufacturers</Typography>
                </ToggleButton>
                <ToggleButton value={"categories"}>
                  <Typography variant="body1">Categories</Typography>
                </ToggleButton>
                <ToggleButton value={"onpromotion"}>
                  <Typography variant="body1">On-Promotion?</Typography>
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                label="Keyword of Product Title (Optional)"
                value={_filter_keyword}
                onChange={(e) => { setFilterkeyword(e.target.value) }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant='contained'
                onClick={() => {
                  dispatch(searchRecords({
                    start: _filter_start?.toISOString(),
                    end: _filter_end?.toISOString(),
                    // categories: JSON.stringify(_filter_category?.map((c) => c.id)),
                    // manufacturers: JSON.stringify(_filter_manufacturer?.map((m) => m.id)),
                    // brands: JSON.stringify(_filter_brand?.map((b) => b.id)),
                    retailers: JSON.stringify([_filter_retailer.id]),
                    keyword: _filter_keyword,
                    groupby: _filter_groupby
                  }))
                }}
                sx={{ height: "3.5rem" }}
                disabled={!_filter_retailer}
                fullWidth
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container rowSpacing={1.5} columnSpacing={1}>
            <Grid item xs={12}>
              <Pie
                data={{
                  labels: ['On Promotion', 'Not On Promotion'],
                  datasets: [
                    {
                      label: 'Percentage(%)',
                      data: [sliceState?.onPromotion, sliceState?.notOnPromotion],
                      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)',],
                      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)',],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'top' },
                    title: {
                      display: true,
                      text: 'On Promotion Distribution (%)',
                    },
                  },
                }}
                // width={100}
                height={168}
                style={{ padding: "1rem" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container rowSpacing={1.5} columnSpacing={1}>
                <Grid item xs={12}>
                  <Pie
                    data={PieChartDataGenerator(sliceState?.categories_count)}
                    options={{
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { position: 'top' },
                        title: {
                          display: true,
                          text: 'Category Distribution (%)',
                        },
                      },
                    }}
                    height={200}
                    style={{ padding: "1rem" }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Pie
            data={PieChartDataGenerator(sliceState?.brands_count)}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'top' },
                title: {
                  display: true,
                  text: 'Brands Distribution (%)',
                },
              },
            }}
            // width={100}
            height={368}
            style={{ padding: "1rem" }}
          />
        </Grid>
        <Grid item xs={6}>
          <Pie
            data={PieChartDataGenerator(sliceState?.manufacturers_count)}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'top' },
                title: {
                  display: true,
                  text: 'Manufacturer Distribution (%)',
                },
              },
            }}
            // width={100}
            height={368}
            style={{ padding: "1rem" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Bar
            data={BarChartDataGenerator(sliceState?.brands_count)}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'top' },
                title: {
                  display: true,
                  text: 'Brands Distribution',
                },
              },
              scales: {
                y: {
                  title: {
                    display: true,
                    text: 'Count'
                  }
                }
              },
            }}
            // width={100}
            height={368}
            style={{ padding: "1rem" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Bar
            data={BarChartDataGenerator(sliceState?.manufacturers_count)}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'top' },
                title: {
                  display: true,
                  text: 'Manufacturer Distribution',
                },
              },
              scales: {
                y: {
                  title: {
                    display: true,
                    text: 'Count'
                  }
                }
              },
            }}
            // width={100}
            height={368}
            style={{ padding: "1rem" }}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default MarketShareCharts;