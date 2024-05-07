import ItemPriceLineChart from './ItemPriceLineChart'
import FullTable from './FullTable/FullTable'
import Calendar from './Calendar'
import DataGridDemo from './DataGridDemo'
import Ranking from './Ranking'
import MarketShareCharts from './MarketShareCharts/MarketShareCharts'

import {
  Typography,
  Divider,
  Button,
  Grid,
} from '@mui/material'
import AnalyticEcommerce from '../../components/AnalyticEcommerce'

function Dashboard() {

  return (
    <>
      <Grid container sx={{ mb: "1rem", mt: "1rem" }}>
        {/* row 1 */}
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticEcommerce title="On-Promotion Items" count={"282"} percentage={8} isLoss={false} extra={20} color={"success"} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticEcommerce title="Total New Items" count={"32"} percentage={8} isLoss={false} extra={2} color={"success"} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticEcommerce title="Total Unavailable Items" count={"8"} percentage={12} isLoss={true} extra={1} color={"warning"} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticEcommerce title="Average Discount Rate" count={"5"} percentage={25} isLoss={false} extra={0.01} color={"success"} />
        </Grid>
      </Grid>

      <Calendar />
      <MarketShareCharts />
      <ItemPriceLineChart />
      <DataGridDemo />
      <Ranking />
      <FullTable />
      <br />
    </>
  )
}

export default Dashboard;