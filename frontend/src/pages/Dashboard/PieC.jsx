// Chartjs & react-chartjs-2
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    // ChartDataLabels,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    // ChartDataLabels,
    Title,
    Tooltip,
    Legend
);

function PieC() {

    return (
        <Pie
            data={{
                labels: ['Our Brand', 'lalalaDa', 'SiPep', 'TaFan', 'SolveDrink'],
                datasets: [
                    {
                        label: 'Market Share (%)',
                        data: [40, 20, 10, 25, 5],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            }}
            options={{
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' },
                    title: {
                        display: true,
                        text: 'Market Share in %',
                    },
                },
            }}
            width={100}
            height={364}
            style={{ border: "2px solid", borderLeft: "0px", padding: "1rem" }}
        />
    )
}

export default PieC;