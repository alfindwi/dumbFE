import { Box, Flex, Text } from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { FaUsers } from "react-icons/fa";
import { NavbarAdmin } from "../../../navbar/navbar-admin";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { useEffect } from "react";
import { getTransaction } from "../../../../store/transaction/async";
import { getProducts } from "../../../../store/product/async";
import { getUserAsync } from "../../../../store/user/async";
import { getOrder } from "../../../../store/order/async";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export function HomeAdmin() {
  return (
    <Box h="100vh" bg="black">
      <NavbarAdmin />
      <DashboardContent />
    </Box>
  );
}

const DashboardContent = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  console.log(user);
  const userCount = user?.user?.length || 0;
  const order = useAppSelector((state) => state.transaction);
  const product = useAppSelector((state) => state.product.products);
  useEffect(() => {
    dispatch(getTransaction());
    dispatch(getProducts());
    dispatch(getUserAsync());
    dispatch(getOrder());
  }, [dispatch]);

  const transactionStatus = order.order.reduce(
    (acc: any, currentTransaction) => {
      if (currentTransaction.status === "PENDING") {
        acc.pending++;
      } else if (currentTransaction.status === "SUCCESS") {
        acc.success++;
      } else if (currentTransaction.status === "CANCEL") {
        acc.cancel++;
      }
      return acc;
    },
    { pending: 0, success: 0, cancel: 0 }
  )

  const data = {
    labels: ["PENDING", "SUCCESS", "CANCEL"],
    datasets: [
      {
        label: "Orders",
        data: [transactionStatus.pending, transactionStatus.success, transactionStatus.cancel],
        backgroundColor: ["#F09319", "#185519", "#B8001F"],
        borderColor: ["#FFE31A", "#31511E", "#3D0301"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Flex
        direction="row"
        gap={4}
        justifyContent="center"
        alignItems="center"
        mt={10}
        ml={6}
      >
        <Flex
          bg="linear-gradient(135deg, #F56565, #ED64A6)"
          p={6}
          w="240px"
          gap={3}
          borderRadius="md"
          boxShadow="xl"
          alignItems="center"
        >
          <Box p={2}>
            <FaUsers fontSize="50px" />
          </Box>
          <Box>
            <Text fontSize="2xl" fontWeight="bold">
              {userCount}
            </Text>
            <Text fontSize="lg" opacity={0.8}>
              Users
            </Text>
          </Box>
        </Flex>

        <Flex
          bg="linear-gradient(135deg, #F56565, #ED64A6)"
          p={6}
          w="240px"
          gap={3}
          borderRadius="md"
          boxShadow="xl"
          alignItems="center"
        >
          <Box p={2}>
            <FaUsers fontSize="50px" />
          </Box>
          <Box>
            <Text fontSize="2xl" fontWeight="bold">
              {product.length}
            </Text>
            <Text fontSize="lg" opacity={0.8}>
              Product
            </Text>
          </Box>
        </Flex>

        <Flex
          bg="linear-gradient(135deg, #F56565, #ED64A6)"
          p={6}
          w="240px"
          gap={3}
          borderRadius="md"
          boxShadow="xl"
          alignItems="center"
        >
          <Box p={2}>
            <FaUsers fontSize="50px" />
          </Box>
          <Box>
            <Text fontSize="2xl" fontWeight="bold">
              {order.order.length}
            </Text>
            <Text fontSize="lg" opacity={0.8}>
              Transaction
            </Text>
          </Box>
        </Flex>
      </Flex>

      <Box
        mt={10}
        mx="auto"
        w="80%"
        bg="#1A1A19"
        p={8}
        borderRadius="md"
        boxShadow="lg"
        display={"flex"}
        justifyContent={"center"}
      >
        <Bar
          data={data}
          options={{
            plugins: {
              title: {
                display: true,
                text: "ORDER STATUS",
                color: "white",
                font: { size: 18, weight: "bold" },
              },
              legend: {
                labels: {
                  color: "white",
                },
              },
              tooltip: {
                bodyColor: "white",
                titleColor: "white",
              },
            },
            responsive: true,
            scales: {
              x: {
                stacked: true,
                ticks: {
                  color: "white",
                },
              },
              y: {
                stacked: true,
                ticks: {
                  color: "white",
                },
              },
            },
          }}
        />
      </Box>
    </>
  );
};
