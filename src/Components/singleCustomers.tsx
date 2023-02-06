import { Box, Button, Container, Flex, Grid, Heading } from "@chakra-ui/react";
import { Input } from "../Components/Input";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { motion } from "framer-motion";
import { container, item } from "../Styles/animate";
import { useAuth } from "../Providers/AuthContext";
import { useState } from "react";

interface SingUpType {
  name: string;
  email: string;
  phone: string;
}

interface User {
  name: string;
  email: string;
  phone: string;
  id: string;
}

export const Customer = (user: User) => {
  const { contactUpdate } = useAuth();

  const token = localStorage.getItem("@fullstack_challenge:Token");

  const schema = yup.object().shape({
    name: yup.string(),
    email: yup.string(),
    phone: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SingUpType>({
    resolver: yupResolver(schema),
  });

  const [id, setId] = useState<string>("");

  const [name, setName] = useState<string>(user.name);
  const [phone, setPhone] = useState<string>(user.phone);
  const [email, setEmail] = useState<string>(user.email);

  const updateContact = ({ name, email, phone }: SingUpType) => {
    let data = { name, email, phone };
    // contactUpdate(data, id);
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
        <Flex
          w={["100%", "100%", "100%", "100%", "100%"]}
          alignItems="center"
          justifyContent="center"
          flexDirection={["column", "column", "column", "row", "row"]}
        >
          <Box
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
            onSubmit={handleSubmit(updateContact)}
          >
            <Flex
              justifyContent="space-between"
              alignItems="center"
              mb={8}
              as={motion.div}
              variants={item}
            >
              <Heading as="h1" size="md">
                Contact info
              </Heading>
            </Flex>
            <Grid gap={2}>
              <Input
                label="Name*"
                type="text"
                placeholder={name}
                value={name}
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
                  onMouseDown={() => setId(user.id)}
                >
                  Update
                </Button>
                <Button
                  as={motion.button}
                  variants={item}
                  w="100%"
                  h="30px"
                  bg="#5a1010"
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
                >
                  delete
                </Button>
              </Box>
            </Grid>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
