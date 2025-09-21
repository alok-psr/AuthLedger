import React, { useEffect, useRef } from 'react';

const randomizeData = (originalData) => {
  return originalData.map(value => {
    const randomFactor = (Math.random() - 0.5) * 0.2; // -10% to +10%
    return Math.max(0, Math.round(value * (1 + randomFactor)));
  });
};

function NonStudentAnalytics({ data }) {
  const monthlyIssuanceChartRef = useRef(null);
  const verificationChartRef = useRef(null);
  const chartInstances = useRef({});

  useEffect(() => {
    if (!window.Chart || !data) return;

    // Destroy previous charts before creating new ones
    Object.values(chartInstances.current).forEach(chart => chart.destroy());

    // Monthly Issuance Chart
    if (monthlyIssuanceChartRef.current) {
      const monthlyIssuanceCtx = monthlyIssuanceChartRef.current.getContext('2d');
      chartInstances.current.monthlyIssuance = new window.Chart(monthlyIssuanceCtx, {
        type: 'line',
        data: {
          labels: data.monthlyIssuance.map(item => item.month),
          datasets: [
            {
              label: 'Total Certificates Issued',
              data: randomizeData(data.monthlyIssuance.map(item => item.certificates)),
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.4,
              fill: true
            },
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Monthly Certificate Issuance',
              color: '#fff'
            },
            legend: {
              labels: {
                color: '#fff'
              }
            }
          },
          scales: {
            x: {
              ticks: { color: '#fff' },
              grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            y: {
              ticks: { color: '#fff' },
              grid: { color: 'rgba(255, 255, 255, 0.1)' }
            }
          }
        }
      });
    }

    // Verification Chart
    if (verificationChartRef.current) {
      const verificationCtx = verificationChartRef.current.getContext('2d');
      chartInstances.current.verification = new window.Chart(verificationCtx, {
        type: 'line',
        data: {
          labels: data.monthlyIssuance.map(item => item.month),
          datasets: [
            {
              label: 'Verified',
              data: randomizeData(data.monthlyIssuance.map(item => item.verified)),
              borderColor: '#10b981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              tension: 0.4,
              fill: false
            },
            {
              label: 'Failed',
              data: randomizeData(data.monthlyIssuance.map(item => item.failed)),
              borderColor: '#ef4444',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              tension: 0.4,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Monthly Verification Stats',
              color: '#fff'
            },
            legend: {
              labels: {
                color: '#fff'
              }
            }
          },
          scales: {
            x: {
              ticks: { color: '#fff' },
              grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            y: {
              ticks: { color: '#fff' },
              grid: { color: 'rgba(255, 255, 255, 0.1)' }
            }
          }
        }
      });
    }

    return () => {
      Object.values(chartInstances.current).forEach(chart => chart.destroy());
    };
  }, [data]);

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', 
      gap: '2rem' 
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(20px)',
        borderRadius: '12px',
        padding: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        height: '300px'
      }}>
        <canvas ref={monthlyIssuanceChartRef} />
      </div>
      <div style={{
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(20px)',
        borderRadius: '12px',
        padding: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        height: '300px'
      }}>
        <canvas ref={verificationChartRef} />
      </div>
    </div>
  );
}

export default NonStudentAnalytics;
