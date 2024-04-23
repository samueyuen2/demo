import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Typography,
    Divider,
    Button,
    Grid,
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

import LineC from './LineC'
import PieC from './PieC'
import Calendar from './Calendar'
import Ranking from './Ranking'
import DataGridDemo from './DataGridDemo'
import Sales from './Sales'
import MainCard from '../../components/MainCard'
import AnalyticEcommerce from '../../components/AnalyticEcommerce'

import slice, { getBasicInfo } from './DashboardSlice'

function Dashboard() {
    const dispatch = useDispatch()
    const sliceState = useSelector((state) => state.dashboard)
    console.log(sliceState)

    useEffect(() => {
        dispatch(getBasicInfo())
        return () => { dispatch(slice.actions.resetStore()) }
    }, [])

    // Card 1
    const [_card_1, setCard1] = useState(Math.ceil(Math.random() * 1880));
    const [_card_2, setCard2] = useState(Math.ceil(Math.random() * 7500));
    const [_card_3, setCard3] = useState(Math.ceil(Math.random() * 188));
    const [_card_4, setCard4] = useState(Math.ceil(Math.random() * 5078));

    return (
        <>
            <Grid container rowSpacing={4.5} sx={{ m: "1rem 0", mt: "0.75rem" }}>
                {/* row 1 */}
                <Grid item xs={12} sx={{ mb: -2.25 }}>
                    <Typography variant="h5">This Week Overveiw
                        {/* <Button variant='contained'
                            sx={{ ml: "1rem" }}
                            onClick={() => {
                                setCard1(Math.ceil(Math.random() * 1880))
                                setCard2(Math.ceil(Math.random() * 7500))
                                setCard3(Math.ceil(Math.random() * 188))
                                setCard4(Math.ceil(Math.random() * 5078))
                            }}
                        >
                            Randomize Data
                        </Button> */}
                    </Typography>
                </Grid>
                {/* <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Total Page Views" count={_card_1} percentage={59.3} color="success" extra={Math.ceil(_card_1 * 1.593)} />
                </Grid> */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Total Sales" count={sliceState?.totalSale}
                        percentage={Math.ceil(sliceState?.totalSale / sliceState?.totalSale_lw * 100)}
                        isLoss={sliceState?.totalSale > sliceState?.totalSale_lw ? false : true}
                        extra={sliceState?.totalSale > sliceState?.totalSale_lw ? sliceState?.totalSale - sliceState?.totalSale_lw : sliceState?.totalSale_lw - sliceState?.totalSale}
                        color={sliceState?.totalSale > sliceState?.totalSale_lw ? "success" : "warning"} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Total Order" count={sliceState?.totalOrder}
                        percentage={Math.ceil(sliceState?.totalOrder / sliceState?.totalOrder_lw * 100)}
                        isLoss={sliceState?.totalOrder > sliceState?.totalOrder_lw ? false : true}
                        extra={sliceState?.totalOrder > sliceState?.totalOrder_lw ? sliceState?.totalOrder - sliceState?.totalOrder_lw : sliceState?.totalOrder_lw - sliceState?.totalOrder}
                        color={sliceState?.totalOrder > sliceState?.totalOrder_lw ? "success" : "warning"} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Total Sold Packages" count={sliceState?.totalPackage}
                        percentage={Math.ceil(sliceState?.totalPackage / sliceState?.totalPackage_lw * 100)}
                        isLoss={sliceState?.totalPackage > sliceState?.totalPackage_lw ? false : true}
                        extra={sliceState?.totalPackage > sliceState?.totalPackage_lw ? sliceState?.totalPackage - sliceState?.totalPackage_lw : sliceState?.totalPackage_lw - sliceState?.totalPackage}
                        color={sliceState?.totalPackage > sliceState?.totalPackage_lw ? "success" : "warning"} />
                </Grid>
            </Grid>

            <Typography variant='h5' color={"dark"} sx={{ m: "1rem 0" }}>
                Weekly Price, Weekly Sales, Market Share
            </Typography>

            <Grid container sx={{ m: "1rem 0" }}>

                <Grid item xs="12">
                    <MainCard>
                        <Sales />
                    </MainCard>
                </Grid>

                <Grid item xs="12">
                    <MainCard>
                        <PieC />
                    </MainCard>
                </Grid>

            </Grid>

            <Divider />

            <Grid container sx={{ m: "1rem 0" }}>
                <Grid item xs="2">
                </Grid>
                <Grid item xs>
                    <MainCard>
                        <Typography variant='h4' color={"dark"} sx={{ m: "1rem 0" }}>
                            Promotion Schedule
                        </Typography>
                        <Calendar />
                    </MainCard>
                </Grid>
                <Grid item xs="2">
                </Grid>
            </Grid>

            <Divider />
            <MainCard>
                <DataGridDemo />
            </MainCard>
            <Divider />

        </>
    )
}

export default Dashboard;





