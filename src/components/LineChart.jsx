import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { LineChart as LineChartIcon } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const LineChart = ({ theme, monthlyDataStore }) => {
  const isLight = theme === 'light';
  const textColor = isLight ? '#64748b' : '#7f8ea3';
  const gridColor = isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.05)';
  const pointBgColor = isLight ? '#ffffff' : '#0f172a';
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      y: {
        display: true,
        beginAtZero: true,
        suggestedMax: 30000000,
        grid: {
          color: gridColor,
          drawBorder: false,
        },
        ticks: {
          color: textColor,
          maxTicksLimit: 8,
          callback: function(value) {
            if (value === 0) return '0';
            return (value / 1000000) + 'M';
          },
          font: {
            size: 11
          }
        }
      },
      x: {
        display: true,
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: true,
          color: textColor,
          font: {
            size: 11
          }
        }
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    layout: {
      padding: {
        top: 10,
        right: 20,
        bottom: 0,
        left: 10
      }
    }
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const incomeData = months.map(m => monthlyDataStore?.[m]?.income || 0);
  const expenseData = months.map(m => monthlyDataStore?.[m]?.expense || 0);

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        borderColor: '#1ab07e',
        backgroundColor: 'rgba(26, 176, 126, 0.15)',
        borderWidth: 2,
        pointBackgroundColor: pointBgColor,
        pointBorderColor: '#1ab07e',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Expense',
        data: expenseData,
        borderColor: '#e14e65',
        backgroundColor: 'rgba(225, 78, 101, 0.15)',
        borderWidth: 2,
        pointBackgroundColor: pointBgColor,
        pointBorderColor: '#e14e65',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        fill: true,
      }
    ],
  };

  return (
    <div className="glass-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', paddingBottom: '0.5rem' }}>
      <div className="section-title-container" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LineChartIcon size={16} color="#7f8ea3" />
        </div>
        <h3 className="section-title" style={{ fontSize: '0.95rem' }}>Grafik Keuangan</h3>
      </div>
      <div style={{ flex: 1, position: 'relative', minHeight: '80px' }}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default LineChart;
