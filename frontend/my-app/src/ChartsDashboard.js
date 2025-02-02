// ChartsDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import './ChartsDashboard.css';

// Register Chart.js components (important for React v4 of chart.js)
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

/**
 * ChartsDashboard
 * Displays two charts:
 *   1) Bar chart of GitHub Repositories (fetched via GitHub API)
 *   2) Pie chart of your certifications
 */
function ChartsDashboard() {
  const [githubRepoCount, setGithubRepoCount] = useState(0);

  // Pie chart data for certifications
  const certificationsPie = {
    labels: ['CompTIA A+', 'Network+', 'Security+', 'CySa+', 'Pentest+', 'CASP+', 'PCEP'],
    datasets: [
      {
        label: 'Certifications Earned',
        data: [1, 1, 1, 1, 1, 1, 1], // example placeholders, adjust to your actual count
        backgroundColor: [
          '#ff3d3d',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FA8072',
          '#00FFFF'
        ],
        borderColor: '#0f0f0f',
        borderWidth: 1
      },
    ],
  };

  // Bar chart data for GitHub
  const githubBarData = {
    labels: ['GitHub Repos'],
    datasets: [
      {
        label: 'Public Repositories',
        data: [githubRepoCount],
        backgroundColor: '#ff3d3d',
        borderColor: '#0f0f0f',
        borderWidth: 1,
      },
    ],
  };

  // Fetch GitHub data
  useEffect(() => {
    async function fetchGitHubData() {
      try {
        // Adjust 'CarterPerez-dev' to your actual GitHub username or remove if you want
        const response = await axios.get('https://api.github.com/users/CarterPerez-dev/repos');
        setGithubRepoCount(response.data.length);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      }
    }
    fetchGitHubData();
  }, []);

  // Chart options
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#fff' // White text
        }
      },
      title: {
        display: true,
        text: 'GitHub Repository Stats',
        color: '#ff3d3d',
        font: {
          size: 18
        }
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#fff'
        },
        grid: {
          color: '#444'
        }
      },
      y: {
        ticks: {
          color: '#fff'
        },
        grid: {
          color: '#444'
        }
      }
    }
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#fff'
        }
      },
      title: {
        display: true,
        text: 'Certifications',
        color: '#ff3d3d',
        font: {
          size: 18
        }
      }
    }
  };

  return (
    <section className="charts-dashboard-section">
      <h2 className="charts-title">My Tech Stats</h2>
      <p className="charts-subtitle">A quick look at GitHub repos & certifications</p>
      <div className="charts-dashboard">
        <div className="chart-card">
          <Bar data={githubBarData} options={barChartOptions} />
        </div>
        <div className="chart-card">
          <Pie data={certificationsPie} options={pieChartOptions} />
        </div>
      </div>
    </section>
  );
}

export default ChartsDashboard;
