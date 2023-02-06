import {
  Box,
  Button,
  Container,
  Flex,
  FormLabel,
  Grid,
  Heading,
  Link,
  Select,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Input } from "../../Components/Input";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import { container, item } from "../../Styles/animate";
import { useAuth } from "../../Providers/AuthContext";

interface SingUpType {
  name: string;
  email: string;
  phone: string;
}

export const Register = () => {
  const { singUp, contactRegister } = useAuth();

  const token = localStorage.getItem("@fullstack_challenge:Token");

  const schema = yup.object().shape({
    name: yup.string().trim().required("Por favor digite seu nome"),
    email: yup
      .string()
      .email("Digite um email válido.")
      .required("Email obrigatório"),
    phone: yup
      .string()
      .min(9, "Phone precisar conter no mínimo 9 caracteres")
      .required("Send a phone number"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SingUpType>({
    resolver: yupResolver(schema),
  });

  const submitSingUp = ({ name, email, phone }: SingUpType) => {
    let data = { name, email, phone };
    singUp(data);
  };

  const submitContact = ({ name, email, phone }: SingUpType) => {
    let data = { name, email, phone };
    contactRegister(data);
  };

  return token ? (
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
                {...register("name")}
                error={errors.name}
                variants={item}
              />
              <Input
                label="Email*"
                type="email"
                {...register("email")}
                error={errors.email}
                variants={item}
              />
              <Input
                bg="white"
                label="Phone*"
                type="text"
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
                  Register
                </Button>
              </Box>
            </Grid>
          </Box>
        </Flex>
      </Container>
    </Box>
  ) : (
    <Box
      as={motion.section}
      variants={container}
      initial="hidden"
      animate="visible"
      pos="relative"
      minH="100%"
      bg="#141414"
      bgPosition="0 20vh"
      bgRepeat="no-repeat"
      bgSize="contain"
      overflow="hidden"
      alignItems="center"
      display="flex"
    >
      <Container maxW="container.xl" h="100%">
        <Flex
          w="100%"
          h="100%"
          py={[4, 6, 8, 8, 8]}
          flexDir={["column", "column", "column", "row", "row"]}
          gap={[6, 6, 6, 6, 8]}
        >
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
              pos="relative"
              maxW="450px"
              w="100%"
              alignSelf="center"
              onSubmit={handleSubmit(submitSingUp)}
            >
              <Flex
                justifyContent="space-between"
                alignItems="center"
                mb={8}
                as={motion.div}
                variants={item}
              >
                <Heading as="h1" size="md">
                  Cadastro
                </Heading>
                <Link
                  as={ReactRouterLink}
                  to="/"
                  fontSize={["0.875rem"]}
                  textDecoration="underline"
                >
                  Retornar à pagina de login
                </Link>
              </Flex>
              <Grid gap={2}>
                <Input
                  label="Name*"
                  type="text"
                  {...register("name")}
                  error={errors.name}
                  variants={item}
                />
                <Input
                  label="Email*"
                  type="email"
                  {...register("email")}
                  error={errors.email}
                  variants={item}
                />
                <Input
                  label="Phone*"
                  type="text"
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
                    Register
                  </Button>
                </Box>
              </Grid>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
