import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Typography,
    Divider,
    Button,
    Grid,
    Paper,
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

import ItemPriceLineChart from './ItemPriceLineChart'
import FullTable from './FullTable/FullTable'

function Dashboard() {

    return (
        <>
            <FullTable />
            <ItemPriceLineChart />
            <br />
        </>
    )
}

export default Dashboard;





