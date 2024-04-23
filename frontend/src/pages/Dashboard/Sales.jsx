import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment-timezone'
import {
  Typography,
  FormControl,
  InputLabel,
  Grid,
  Select,
  OutlinedInput,
  TextField,
  MenuItem,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material'

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

function Sales() {
  // Data
  const orders = useSelector((state) => state.dashboard.orders)
  const brands = useSelector((state) => state.dashboard.brands)
  const retailers = useSelector((state) => state.dashboard.retailers)

  // Criteria
  const [_selected_brands, setSelectedBrands] = useState([])
  const [_selected_retailers, setSelectedRetailers] = useState([])
  const [_date_labels, setDateLabels] = useState([])
  const [_date_range, setDateRange] = useState('lastWeek')

  const [_total_sales, setTotalSales] = useState([])
  const [_sales_aldi, setSalesAldi] = useState([])
  const [_sales_asda, setSalesAsda] = useState([])
  const [_sales_lidl, setSalesLidl] = useState([])
  const [_sales_m_and_s, setSalesMandS] = useState([])
  const [_sales_morrison, setSalesMorrison] = useState([])
  const [_sales_sainsburys, setSalesSainsbury] = useState([])
  const [_sales_waitrose, setSalesWaitrose] = useState([])

  const getColour = (brand) => {
    switch (brand) {
      case "Our Brand": return { line: "#000000", border: "#121212" }; break;
      case "Coke": return { line: "#c90404", border: "#e80202" }; break;
      case "TaFan": return { line: "#de5500", border: "#de6800" }; break;
      case "Pepzz": return { line: "#001ede", border: "#0043de" }; break;
      case "SolveDrink": return { line: "#b900de", border: "#d300de" }; break;
    }
  }

  // console.log("orders:", orders.rows)
  // console.log("_selected_brands:", _selected_brands)
  // console.log("_selected_retailers:", _selected_retailers)
  // console.log("_date_labels:", _date_labels)
  // console.log("_total_sales:", _total_sales)

  const totalSalesOrdersFormatter = (_selected_brands, _selected_retailers, orders) => {
    let results = []
    for (const brand of _selected_brands) {
      let tempData = []
      for (const label of _date_labels) {
        let total = 0;
        for (let i = 0; i < orders?.rows?.length; i++) {
          if (
            orders?.rows[i]?.brand?.name === brand &&
            orders?.rows[i]?.date?.startOf('d')?.format("D/M") == label
          ) {
            total = total + Math.ceil(orders?.rows[i]?.price * orders?.rows[i]?.packages)
          }
        }
        tempData.push(total)
      }

      const r = Math.random() * 255
      const g = Math.random() * 255
      const b = Math.random() * 255
      results?.push({
        label: brand,
        data: tempData,
        borderColor: getColour(brand)?.border,
        backgroundColor: getColour(brand)?.line,
      })

    }
    return results
  }

  const retailerSalesOrdersFormatter = (_selected_brands, retailer, orders) => {
    let results = []
    for (const brand of _selected_brands) {
      let tempData = []
      for (const label of _date_labels) {
        let total = 0;
        for (let i = 0; i < orders?.rows?.length; i++) {
          if (
            orders?.rows[i]?.brand?.name === brand &&
            orders?.rows[i]?.retailer?.name === retailer &&
            orders?.rows[i]?.date?.startOf('d')?.format("D/M") == label
          ) {
            total = total + Math.ceil(orders?.rows[i]?.price * orders?.rows[i]?.packages)
          }
        }
        tempData.push(total)
      }

      const r = Math.random() * 255
      const g = Math.random() * 255
      const b = Math.random() * 255
      results?.push({
        label: brand,
        data: tempData,
        borderColor: getColour(brand)?.border,
        backgroundColor: getColour(brand)?.line,
      })

    }
    return results
  }

  useEffect(() => {
    let results = []
    let duration = _date_range == 'lastWeek' ? 7 : 30
    let dateTracker = moment()?.subtract((duration - 1), "d")
    for (let i = 0; i < duration; i++) {
      results?.push(dateTracker?.format("D/M"))
      dateTracker?.add(1, "d")
    }
    setDateLabels(results)
  }, [_date_range])

  useEffect(() => {
    setTotalSales(totalSalesOrdersFormatter(
      _selected_brands,
      _selected_retailers,
      orders,
    ))
    setSalesAldi(retailerSalesOrdersFormatter(_selected_brands, 'Aldi', orders))
    setSalesAsda(retailerSalesOrdersFormatter(_selected_brands, 'Asda', orders))
    setSalesLidl(retailerSalesOrdersFormatter(_selected_brands, 'Lidl', orders))
    setSalesMandS(retailerSalesOrdersFormatter(_selected_brands, 'M&S', orders))
    setSalesMorrison(retailerSalesOrdersFormatter(_selected_brands, 'Morrisons', orders))
    setSalesSainsbury(retailerSalesOrdersFormatter(_selected_brands, 'Sainsburys', orders))
    setSalesWaitrose(retailerSalesOrdersFormatter(_selected_brands, 'Waitrose', orders))
  }, [_selected_brands, _selected_retailers, _date_labels])

  return (
    <>
      <Typography variant='h4' color={"dark"} sx={{ m: "1rem 0" }}>
        Sales
      </Typography>

      <Grid container spacing={1}>
        <Grid item xs="6">
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="brands-labels">Brand(s)</InputLabel>
            <Select
              labelId="brands-labels"
              value={_selected_brands}
              onChange={(e) => { setSelectedBrands(e.target.value); }}
              input={<OutlinedInput label="Brand(s)" />}
              multiple
            >
              {
                brands?.length > 0 && brands?.map((brand) =>
                  <MenuItem key={brand?.id} value={brand?.name}>{brand?.name}</MenuItem>
                )
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs="2">
          {/* <FormControl sx={{ width: "100%" }}>
            <InputLabel id="brands-labels">Retailer(s)</InputLabel>
            <Select
              labelId="brands-labels"
              value={_selected_retailers}
              onChange={(e) => { setSelectedRetailers(e.target.value); }}
              input={<OutlinedInput label="Retailer(s)" />}
              multiple
            >
              {
                retailers?.length > 0 && retailers?.map((retailer) =>
                  <MenuItem key={retailer?.id} value={retailer?.name}>{retailer?.name}</MenuItem>
                )
              }
            </Select>
          </FormControl> */}
        </Grid>
        <Grid item xs="4">
          <ToggleButtonGroup
            color="primary"
            value={_date_range}
            onChange={(e, range) => { setDateRange(range); }}
            exclusive
            fullWidth
          >
            <ToggleButton value="last30Days">Last 30 Days</ToggleButton>
            <ToggleButton value="lastWeek">Last Week</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid >
      <Grid container>
        <Grid item xs="12">
          <Line
            data={{
              labels: _date_labels,
              datasets: _total_sales
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Daily Total Sales', },
              },
              scales: {
                x: { title: { display: true, text: 'Date' } },
                y: { title: { display: true, text: 'Pound (£)' } }
              },
              maintainAspectRatio: false
            }}
            width={100}
            height={300}
          />
        </Grid>
        <Grid item xs="12">
          <Typography variant='h5' color={"dark"} sx={{ m: "1rem 0" }}>
            Sales in different retailers
          </Typography>
        </Grid>
        <Grid item xs="6">
          <Line
            data={{
              labels: _date_labels,
              datasets: _sales_aldi
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Daily Sales - Aldi', },
              },
              scales: {
                x: { title: { display: true, text: 'Date' } },
                y: { title: { display: true, text: 'Pound (£)' } }
              },
              maintainAspectRatio: false
            }}
            width={100}
            height={200}
          />
        </Grid>
        <Grid item xs="6">
          <Line
            data={{
              labels: _date_labels,
              datasets: _sales_asda
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Daily Sales - Asda', },
              },
              scales: {
                x: { title: { display: true, text: 'Date' } },
                y: { title: { display: true, text: 'Pound (£)' } }
              },
              maintainAspectRatio: false
            }}
            width={100}
            height={200}
          />
        </Grid>
        <Grid item xs="6">
          <Line
            data={{
              labels: _date_labels,
              datasets: _sales_lidl
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Daily Sales - Lidl', },
              },
              scales: {
                x: { title: { display: true, text: 'Date' } },
                y: { title: { display: true, text: 'Pound (£)' } }
              },
              maintainAspectRatio: false
            }}
            width={100}
            height={200}
          />
        </Grid>
        <Grid item xs="6">
          <Line
            data={{
              labels: _date_labels,
              datasets: _sales_m_and_s
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Daily Sales - M&S', },
              },
              scales: {
                x: { title: { display: true, text: 'Date' } },
                y: { title: { display: true, text: 'Pound (£)' } }
              },
              maintainAspectRatio: false
            }}
            width={100}
            height={200}
          />
        </Grid>
        <Grid item xs="6">
          <Line
            data={{
              labels: _date_labels,
              datasets: _sales_morrison
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Daily Sales - Morrisons', },
              },
              scales: {
                x: { title: { display: true, text: 'Date' } },
                y: { title: { display: true, text: 'Pound (£)' } }
              },
              maintainAspectRatio: false
            }}
            width={100}
            height={200}
          />
        </Grid>
        <Grid item xs="6">
          <Line
            data={{
              labels: _date_labels,
              datasets: _sales_sainsburys
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Daily Sales - Sainsburys', },
              },
              scales: {
                x: { title: { display: true, text: 'Date' } },
                y: { title: { display: true, text: 'Pound (£)' } }
              },
              maintainAspectRatio: false
            }}
            width={100}
            height={200}
          />
        </Grid>
        <Grid item xs="6">
          <Line
            data={{
              labels: _date_labels,
              datasets: _sales_waitrose
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Daily Sales - Waitrose', },
              },
              scales: {
                x: { title: { display: true, text: 'Date' } },
                y: { title: { display: true, text: 'Pound (£)' } }
              },
              maintainAspectRatio: false
            }}
            width={100}
            height={200}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default Sales;