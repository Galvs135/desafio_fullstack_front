import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useHistory } from "react-router-dom";

import { motion } from "framer-motion";
import { container, item } from "../Styles/animate";
import { useAuth } from "../Providers/AuthContext";
import { useState } from "react";

interface SingUpType {
  name: string;
  email: string;
  phone: string;
}

export const CustomerRegister = () => {
  const { user, getCustomer } = useAuth();

  const history = useHistory();

  const goTocontact = (path: string) => {
    history.push(`/customers/${path}`);
  };

  return !user?.costumers ? (
    <Spinner />
  ) : (
    <Box
      as={motion.section}
      variants={container}
      initial="hidden"
      animate="visible"
      pos="relative"
      minH="100%"
      bg="#141414"
      overflow="hidden"
      alignItems="center"
      display="flex"
    >
      <Container maxW="container.xl" h="100%">
        <Flex
          w={["100%", "100%", "100%", "100%", "100%"]}
          alignItems="center"
          justifyContent="center"
          flexDirection={["column", "column", "column", "row", "row"]}
        >
          {user.costumers.map((e: any, index: number) => {
            return (
              <Box
                key={index}
                as={motion.form}
                bg="#0B0B0B"
                p={[4, 4, 6, 6]}
                rounded={6}
                zIndex="99"
                pos="relative"
                maxW="350px"
                w="100%"
                alignSelf="center"
                margin="15px"
              >
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  mb={8}
                  as={motion.div}
                  variants={item}
                >
                  <Heading as="h1" size="md">
                    Contact : {e.name}
                  </Heading>
                </Flex>
                <Box pt={6}>
                  <Button
                    as={motion.button}
                    variants={item}
                    w="100%"
                    bg="#2C2C2C"
                    borderWidth={2}
                    borderColor="#000000"
                    size="lg"
                    _hover={{
                      borderColor: "#000000",
                      boxShadow: "0 0 0 2px #3d352245",
                    }}
                    _active={{
                      opacity: 0.5,
                      boxShadow: "none",
                    }}
                    onClick={() => {
                      getCustomer(e.id);
                      goTocontact(e.id);
                    }}
                  >
                    Update
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Flex>
      </Container>
    </Box>
  );
};
