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
  MenuItem
} from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DataGrid } from '@mui/x-data-grid';

// import slice, { getBasicInfo, searchRecords } from './MarketShareChartsSlice';

function MarketShareCharts() {
  const dispatch = useDispatch()
  const sliceState = useSelector((state) => state.fullTable)
  console.log("sliceState", sliceState)

  const [_filter_start, setFilterStart] = useState(moment("2022-02-01").startOf('day'))
  const [_filter_end, setFilterEnd] = useState(moment("2022-02-07").endOf('day'))
  const [_filter_category, setFilterCategory] = useState([])
  const [_filter_manufacturer, setFilterManufacturer] = useState([])
  const [_filter_brand, setFilterBrand] = useState([])
  const [_filter_retailer, setFilterRetailer] = useState(null)
  const [_filter_keyword, setFilterkeyword] = useState([])
  const [_filter_promotion, setFilterPromotion] = useState(null)

  useEffect(() => {
    // dispatch(getBasicInfo())
    setFilterRetailer(sliceState?.retailers?.[0])
    // dispatch(searchRecords({
    //   start: _filter_start?.toISOString(),
    //   end: _filter_end?.toISOString(),
    //   categories: JSON.stringify(sliceState?.categories?.map((c) => c.id)),
    //   manufacturers: JSON.stringify(sliceState?.manufacturers?.map((m) => m.id)),
    //   brands: JSON.stringify(_filter_brand?.map((b) => b.id)),
    //   retailers: JSON.stringify(_filter_retailer?.map((r) => r.id)),
    //   keyword: _filter_keyword,
    //   onpromotion: _filter_promotion
    // }))
    // return () => { dispatch(slice.actions.resetStore()) }
  }, [])

  return (
    <Paper elevation={1} sx={{ p: 3, mt: 3 }}>
      <Grid container rowSpacing={1.5} columnSpacing={1}>
        <Grid item xs={6}>
          <Grid container rowSpacing={1.5} columnSpacing={1}>
            <Grid item xs={12}><Grid item xs={12}>
              <FormControl sx={{ minWidth: "100%" }}>
                <InputLabel id="select_brand">Retailers</InputLabel>
                <Select
                  labelId="select_brand"
                  value={_filter_retailer}
                  onChange={(e) => {
                    setFilterRetailer(e.target.value?.sort((a, b) => a.name > b.name ? 1 : -1));
                  }}
                  // onClose={() => {
                  //   dispatch(searchItems({
                  //     brands: JSON.stringify(_filter_brand?.map((b) => b?.id))
                  //   }))
                  // }}
                  input={<OutlinedInput id="selectinput_brand" label="Brands" />}
                // renderValue={(selected) => (
                //   <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                //     {_filter_brand.map((value) => (<Chip key={value?.id} label={value?.name} />))}
                //   </Box>
                // )}
                // disabled={_filter_manufacturer?.length > 0 ? false : true}
                // multiple
                >
                  {sliceState?.retailers.map((retailer) => (
                    <MenuItem key={retailer.name} value={retailer}>
                      {retailer.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container rowSpacing={1.5} columnSpacing={1}>
            <Grid item xs={12}>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default MarketShareCharts;