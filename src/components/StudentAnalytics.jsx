import React, { useEffect, useRef } from 'react';

function StudentAnalytics({ data }) {
  const statusChartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!window.Chart || !data) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (statusChartRef.current) {
      const statusCtx = statusChartRef.current.getContext('2d');
      chartInstance.current = new window.Chart(statusCtx, {
        type: 'doughnut',
        data: {
          labels: data.statusDistribution.map(item => item.status),
          datasets: [
            {
              label: 'Certificate Status',
              data: data.statusDistribution.map(item => item.count),
              backgroundColor: data.statusDistribution.map(item => item.color),
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Certificate Status Distribution',
              color: '#fff'
            },
            legend: {
              position: 'top',
              labels: {
                color: '#fff'
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(20px)',
      borderRadius: '12px',
      padding: '1.5rem',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      height: '400px'
    }}>
      <canvas ref={statusChartRef} />
    </div>
  );
}

export default StudentAnalytics;
