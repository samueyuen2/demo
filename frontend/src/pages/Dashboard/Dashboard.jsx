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
        <>

            <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ m: "1rem 0", mt: "0.75rem" }}>
                {/* row 1 */}
                <Grid item xs={12} sx={{ mb: -2.25 }}>
                    <Typography variant="h5">Overveiw</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Total Page Views" count="1,882" percentage={59.3} color="success" extra="35,000" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Total Users" count="78,250" percentage={70.5} color="success" extra="8,900" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Total Order" count="103" percentage={7.4} isLoss color="warning" extra="1,943" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Total Sales" count="£5,078" percentage={27.4} color="success" extra="$20,395" />
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