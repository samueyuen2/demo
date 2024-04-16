import { useState, useEffect } from 'react';
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
import MainCard from '../../components/MainCard'
import AnalyticEcommerce from '../../components/AnalyticEcommerce'

function Dashboard() {
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
                    <Typography variant="h5">Overveiw <Button variant='contained'
                        sx={{ ml: "1rem" }}
                        onClick={() => {
                            setCard1(Math.ceil(Math.random() * 1880))
                            setCard2(Math.ceil(Math.random() * 7500))
                            setCard3(Math.ceil(Math.random() * 188))
                            setCard4(Math.ceil(Math.random() * 5078))
                        }}
                    > Randomize Data</Button></Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Total Page Views" count={_card_1} percentage={59.3} color="success" extra={Math.ceil(_card_1 * 1.593)} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Total Sold Packages" count={_card_2} percentage={20.5} color="success" extra={Math.ceil(_card_2 * 1.205)} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Total Order" count={_card_3} percentage={7.4} isLoss color="warning" extra={Math.ceil(_card_3 * 1.074)} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Total Sales" count={_card_4} percentage={27.4} color="success" extra={Math.ceil(_card_4 * 1.274)} />
                </Grid>
            </Grid>

            <Typography variant='h5' color={"dark"} sx={{ m: "1rem 0" }}>
                Weekly Price, Weekly Sales, Market Share
            </Typography>

            <Grid container sx={{ m: "1rem 0" }}>

                <Grid item xs>

                    <MainCard>
                        <LineC />
                    </MainCard>
                </Grid>

                <Grid item xs>
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

            <Ranking />
        </>
    )
}

export default Dashboard;