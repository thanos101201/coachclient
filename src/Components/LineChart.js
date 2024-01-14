import React from 'react'
import { Line } from 'react-chartjs-2';

function LineChart() {
    const options = {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Chart.js Line Chart',
            },
        },
        }

        const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        
        function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        const data = {
        labels,
        datasets: [
            {
            label: 'Dataset 1',
            data: labels.map(() => getRandomInt(-1000, 1000)),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
            label: 'Dataset 2',
            data: labels.map(() => getRandomInt(-1000, 1000)),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
        }
  return (
    <Line
        options={options}
        data={data}
    />
  )
}

export default LineChart