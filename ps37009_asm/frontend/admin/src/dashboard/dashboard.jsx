import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Data for the chart
  const data = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
    datasets: [
      {
        label: 'Số bài viết',
        data: [10, 15, 20, 0, 30, 35],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to resize dynamically
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Thống kê bài viết theo tháng',
      },
    },
  };

  return (
    <div className="p-6">
      {/* Phần tiêu đề */}
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

      {/* Nội dung chính của Dashboard */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <p className="text-lg text-gray-700">Chào mừng bạn đến với bảng điều khiển quản trị!</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Card 1 - Tổng số bài viết */}
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Tổng số bài viết</h3>
            <p className="text-3xl mt-2">120</p>
          </div>

          {/* Card 2 - Bài viết đang chờ duyệt */}
          <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Bài viết đang chờ duyệt</h3>
            <p className="text-3xl mt-2">15</p>
          </div>

          {/* Card 3 - Tổng số người dùng */}
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Tổng số người dùng</h3>
            <p className="text-3xl mt-2">35</p>
          </div>
        </div>

        {/* Biểu đồ */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700">Thống kê bài viết theo tháng</h3>
          <div className="bg-gray-200 p-10 rounded-lg mt-4" style={{ height: '50vh', width: '100%' }}>
            <Line ref={(el) => (chartRef.current = el)} data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
