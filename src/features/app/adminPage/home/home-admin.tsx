import { Box, Flex } from "@chakra-ui/react";
import { NavbarAdmin } from "../../../navbar/navbar-admin";
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Register required elements for Line and Pie charts
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const data = {
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

const circleData = {
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
    color="white"
    w="100%"
    h="100vh"
    bgColor={"navy"}
    justifyContent="center"
    alignItems="center"
  >
    <Box w="500px" h="300px" p={4} bg="#1c1c1c" borderRadius="md">
      <Line data={data} options={options} />
    </Box>
    <Box w="500px" flexDirection={"column"} ml={5} h="300px" p={4} bg="#1c1c1c" borderRadius="md">
      <Pie data={circleData} options={pieOptions} />
    </Box>
  </Flex>
);
