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

import slice, { getBasicInfo } from './DashboardSlice'

function Dashboard() {
    const dispatch = useDispatch()
    const sliceState = useSelector((state) => state.dashboard)
    // console.log(sliceState)

    useEffect(() => {
        dispatch(getBasicInfo())
        return () => { dispatch(slice.actions.resetStore()) }
    }, [])

    return (
        <>
            <Paper elevation={1} sx={{ p: 3, mt: 3 }}>
                <ItemPriceLineChart />
            </Paper>
        </>
    )
}

export default Dashboard;





