import { Bar } from 'react-chartjs-2';
export default function Chart({chartData, chartOptions}){
    return <div className='chart-container'>
    <Bar data={chartData} options={chartOptions} />
  </div>
}