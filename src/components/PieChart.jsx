import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { PieChart as PieChartIcon } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#7f8ea3',
          font: { size: 11 },
          usePointStyle: true,
          padding: 20,
        },
      },
    },
  };

  const data = {
    labels: ['Sales 55%', 'Finance 25%', 'Marketing 15%', 'HR 5%'],
    datasets: [
      {
        data: [55, 25, 15, 5],
        backgroundColor: [
          '#2a6ee5', // Sales
          '#a78bfa', // Finance
          '#fbbf24', // Marketing
          '#facc15', // HR
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="glass-card">
      <div className="section-header" style={{ marginBottom: '1rem' }}>
        <div className="section-title-container">
          <div className="icon-box title-icon">
            <PieChartIcon size={20} color="#7f8ea3" />
          </div>
          <h3 className="section-title">PnL Chart</h3>
        </div>
      </div>
      <div className="pie-chart-container" style={{ height: '280px' }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
