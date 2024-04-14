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

function LineC() {

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
        <Grid container>
            <Grid item xs="12">
                <Line
                    data={{
                        labels: _line_labels,
                        datasets: lineChartDataGenerator(
                            _line_numberBase,
                            _line_lineAmount,
                            _line_labels,
                            2
                        )
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: 'top' },
                            title: {
                                display: true,
                                text: 'Daily Price',
                            },
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Date'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Pound (£)'
                                }
                            }
                        },
                        maintainAspectRatio: false
                    }}
                    width={100}
                    height={175}
                    // style={{ border: "2px solid", borderBottom: "1px solid" }}
                />
            </Grid>
            <Grid item xs="12">
                <Line
                    data={{
                        labels: _line_labels,
                        datasets: lineChartDataGenerator(
                            300,
                            1,
                            _line_labels,
                            50
                        )
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: 'top' },
                            title: {
                                display: true,
                                text: 'Daily Total Sales',
                            },
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Date'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Can (dozens)'
                                }
                            }
                        },
                        maintainAspectRatio: false
                    }}
                    width={100}
                    height={225}
                    // style={{ border: "2px solid", borderTop: "1px solid" }}
                />
            </Grid>
        </Grid>
    )
}

export default LineC;