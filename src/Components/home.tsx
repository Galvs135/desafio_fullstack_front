import { Container, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Register } from "../Pages/Register";

export const Homepage = () => {
  return (
    <Flex as={motion.section}>
      <Container p={[0]} maxW="100vw" minH="100vh">
        <Register />
      </Container>
    </Flex>
  );
};
