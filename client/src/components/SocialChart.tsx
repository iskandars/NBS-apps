import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import type { SocialChartData } from '@shared/schema';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SocialChartProps {
  data: SocialChartData;
  title: string;
}

export default function SocialChart({ data, title }: SocialChartProps) {
  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'hsl(var(--foreground))',
          font: {
            family: 'Inter, sans-serif'
          }
        }
      },
      title: {
        display: true,
        text: title,
        color: 'hsl(var(--foreground))',
        font: {
          family: 'Inter, sans-serif',
          size: 16,
          weight: 600
        }
      },
      tooltip: {
        backgroundColor: 'hsl(var(--popover))',
        titleColor: 'hsl(var(--popover-foreground))',
        bodyColor: 'hsl(var(--popover-foreground))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'hsl(var(--muted-foreground))',
          font: {
            family: 'Inter, sans-serif'
          }
        },
        grid: {
          color: 'hsl(var(--border))'
        }
      },
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          color: 'hsl(var(--muted-foreground))',
          font: {
            family: 'Inter, sans-serif'
          }
        },
        grid: {
          color: 'hsl(var(--border))'
        }
      }
    }
  };

  return (
    <div className="h-64 w-full" data-testid="chart-social">
      <Bar data={data} options={options} />
    </div>
  );
}