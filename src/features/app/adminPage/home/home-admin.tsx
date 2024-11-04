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
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Sales Q1',
      data: [30, 45, 60, 75, 90],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      fill: true,
    },
    {
      label: 'Sales Q2',
      data: [10, 15, 60, 75, 90],
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 2,
      fill: true,
    },
  ],
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
  labels: ['Product A', 'Product B', 'Product C', 'Product D'],
  datasets: [
    {
      label: 'Units Sold',
      data: [150, 200, 120, 180],
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
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

const barOptions = {
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Units Sold by Product',
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
      <Line data={lineData} options={options} />
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
