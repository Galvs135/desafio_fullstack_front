import { Box, Button, Container, Flex, Grid, Heading } from "@chakra-ui/react";
import { Input } from "../Components/Input";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { motion } from "framer-motion";
import { container, item } from "../Styles/animate";
import { useAuth } from "../Providers/AuthContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface SingUpType {
  name: string;
  email: string;
  phone: string;
}

export const CustomerEdit = () => {
  const { customer, deleteCustomer, contactUpdate } = useAuth();
  const id: any = useParams();

  const [name, setName] = useState(customer?.name);
  const [email, setEmail] = useState(customer?.email);
  const [phone, setPhone] = useState(customer?.phone);

  useEffect(() => {
    setEmail(customer?.email);
    setName(customer?.name);
    setPhone(customer?.phone);
  });

  const schema = yup.object().shape({
    name: yup.string(),
    email: yup.string().email("Digite um email válido."),
    phone: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SingUpType>({
    resolver: yupResolver(schema),
  });

  const submitContact = ({ name, email, phone }: SingUpType) => {
    let data = { id: id.id, name, email, phone };
    contactUpdate(data);
  };

  return (
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
        <Box
          display="flex"
          alignItems="center"
          w={["100%", "100%", "100%", "100%", "100%"]}
          justifyContent="center"
        ></Box>
        <Flex
          w={["100%", "100%", "100%", "100%", "100%"]}
          alignItems="center"
          justifyContent="center"
        >
          <Box
            as={motion.form}
            bg="#0B0B0B"
            p={[4, 4, 6, 6]}
            rounded={6}
            zIndex="99"
            pos="absolute"
            maxW="450px"
            w="100%"
            alignSelf="center"
            onSubmit={handleSubmit(submitContact)}
          >
            <Flex
              justifyContent="space-between"
              alignItems="center"
              mb={8}
              as={motion.div}
              variants={item}
            >
              <Heading as="h1" size="md">
                Contact Register
              </Heading>
            </Flex>
            <Grid gap={2}>
              <Input
                label="Name*"
                type="text"
                placeholder={name}
                {...register("name")}
                error={errors.name}
                variants={item}
              />
              <Input
                label="Email*"
                type="email"
                placeholder={email}
                {...register("email")}
                error={errors.email}
                variants={item}
              />
              <Input
                bg="white"
                label="Phone*"
                type="text"
                placeholder={phone}
                {...register("phone")}
                error={errors.phone}
                variants={item}
              />
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
                  type="submit"
                >
                  Udpate
                </Button>
                <Button
                  as={motion.button}
                  variants={item}
                  w="100%"
                  h="30px"
                  bg="#692626"
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
                  onClick={() => deleteCustomer(id.id)}
                >
                  Delete
                </Button>
              </Box>
            </Grid>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
