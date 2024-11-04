import { Box, Flex } from "@chakra-ui/react";
import { NavbarAdmin } from "../../../navbar/navbar-admin";
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required elements for Line, Pie, and Bar charts
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const lineData = {
  labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
  datasets: [
    {
      label: 'Pengguna Baru per Bulan',
      data: [50, 75, 60, 80, 90, 120, 110, 130, 95, 100, 85, 150], // Jumlah pengguna baru yang mendaftar setiap bulan
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderWidth: 2,
      fill: true,
    },
  ],
};

const lineOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Jumlah Pengguna Baru yang Mendaftar per Bulan',
    },
  },
};



const pieData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
      backgroundColor: ['#CB4335', '#1F618D', '#F1C40F', '#27AE60', '#884EA0', '#D35400'],
    },
  ],
};

const barData = {
  labels: ['batik barca', 'baju mu'], // Product names
  datasets: [
    {
      label: 'Initial Stock',
      data: [222, 444],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
    {
      label: 'Quantity Sold',
      data: [200, 300],
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
    {
      label: 'Remaining Stock',
      data: [214, 439],
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
};


const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: '#ffffff', // Change legend text color to white
      },
    },
    title: {
      display: true,
      text: 'Stock and Sales Data by Product',
      color: '#ffffff', // Title color
      font: {
        size: 18,
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#ffffff', // X-axis label color
      },
      grid: {
        display: false, // Hide gridlines on x-axis for a cleaner look
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: '#ffffff', // Y-axis label color
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.2)', // Lighter gridline color on y-axis
      },
    },
  },
};



const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Sales Over Time (Line Chart)',
    },
  },
};

const pieOptions = {
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Product Sales',
    },
  },
};


export function HomeAdmin() {
  return (
    <Box h="100vh" bg="black">
      <NavbarAdmin />
      <DashboardContent />
    </Box>
  );
}

const DashboardContent = () => (
  <Flex
    direction="column"
    color="white"
    w="100%"
    h="100vh"
    justifyContent="center"
    alignItems="center"
    gap={5}
    p={4}
  >
    <Box w="500px" h="300px" p={4} bg="#1c1c1c" borderRadius="md">
      <Line data={lineData} options={lineOptions} />
    </Box>

    <Flex gap={5}>
      <Box
        w="300px"
        h="300px"
        p={4}
        bg="#1c1c1c"
        borderRadius="md"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Pie data={pieData} options={pieOptions} />
      </Box>

      {/* Bar Chart */}
      <Box
        w="300px"
        h="300px"
        p={4}
        bg="#1c1c1c"
        borderRadius="md"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Bar data={barData} options={barOptions} />
      </Box>
    </Flex>
  </Flex>
);
