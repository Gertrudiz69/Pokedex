import React from 'react'
import 'chart.js/auto';
import { Filler } from 'chart.js';
import { Bar} from 'react-chartjs-2';
import { primeraMayuscula } from '../../helper/helper';

const BarChart = ({ pokemon }) => {

  const labelData = pokemon.stats.map(stats => primeraMayuscula(stats.stat.name))
  let delayed
  
  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Estadísticas',
        font: {
          size: 24
        }
      },
      tooltip: {
        xAlign: 'left'
      },
    },
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default' && !delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
    scales: {
      x: {
        grid: {
          color: 'transparent',
          tickColor: 'transparent',
          min: 50
        }
      },
      y: {
        grid: {
          color: 'transparent'
        },
        ticks: {
          font: {
            size: 16,
            weight: 700
          },
          color: '#000'
        }
      }

    }
  };
  const labels = labelData
  

  const data = {
    labels,
    datasets: [
      {
        data: pokemon.stats.map(stats => stats.base_stat),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderRadius: 12,
        borderSkip: false,
        hoverOffset: 50,
      },
    ],
  };

  return (
    <Bar options={options} data={data} className='barBox'/>
  )
}

export default BarChart