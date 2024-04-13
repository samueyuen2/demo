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
            <Typography variant='h5' color={"dark"} sx={{ m: "1rem 0" }}>
                Weekly Price, Weekly Sales, Market Share
            </Typography>

            <Grid container sx={{ m: "1rem 0" }}>

                <Grid item xs>
                    <LineC />
                </Grid>

                <Grid item xs>
                    <PieC />
                </Grid>

            </Grid>

            <Divider />

            <Grid container sx={{ m: "1rem 0" }}>
                <Grid item xs="2">
                </Grid>
                <Grid item xs>
                    <Typography variant='h4' color={"dark"} sx={{ m: "1rem 0" }}>
                        Promotion Schedule
                    </Typography>
                    <Calendar />
                </Grid>
                <Grid item xs="2">
                </Grid>
            </Grid>

            <Divider />

            <DataGridDemo />

            <Divider />

            <Ranking />
        </>
    )
}

export default Dashboard;