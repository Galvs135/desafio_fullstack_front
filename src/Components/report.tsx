import { Box, Container, Flex, Grid, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { container, item } from "../Styles/animate";
import { useAuth } from "../Providers/AuthContext";
import { BiPhoneCall, BiTime } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

interface SingUpType {
  name: string;
  email: string;
  phone: string;
}

export const Report = () => {
  const { user } = useAuth();

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
            maxW="550px"
            w="90vw"
            h="80vh"
            alignSelf="center"
          >
            <Heading fontSize="20px">Personal Report</Heading>
            <Flex
              justifyContent="space-between"
              alignItems="flex-start"
              flexDirection="column"
              mb={8}
              as={motion.div}
              variants={item}
            >
              <Box display="flex" flexDirection="row" alignItems="center">
                <CgProfile />
                <h1>
                  Name: <strong>{user?.name}</strong>
                </h1>
              </Box>
              <Box display="flex" flexDirection="row" alignItems="center">
                <AiOutlineMail />
                <h2>
                  Email: <strong>{user?.email}</strong>
                </h2>
              </Box>
              <Box display="flex" flexDirection="row" alignItems="center">
                <BiPhoneCall />
                <h2>
                  Phone: <strong>{user?.phone}</strong>
                </h2>
              </Box>
              <Box display="flex" flexDirection="row" alignItems="center">
                <BiTime />
                <h2>
                  Register Date: <strong>{user?.register_date}</strong>
                </h2>
              </Box>
            </Flex>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              flexDirection="column"
            >
              <h2>Customers</h2>
              {user?.costumers.map((e: any) => {
                return (
                  <Box>
                    <Box display="flex" flexDirection="row" alignItems="center">
                      <CgProfile />
                      <h3>
                        Name: <strong>{e?.name}</strong>
                      </h3>
                    </Box>
                    <Box display="flex" flexDirection="row" alignItems="center">
                      <AiOutlineMail />
                      <h4>
                        Email: <strong>{e?.email}</strong>
                      </h4>
                    </Box>
                    <Box display="flex" flexDirection="row" alignItems="center">
                      <BiPhoneCall />
                      <h4>
                        Phone: <strong>{e?.phone}</strong>
                      </h4>
                    </Box>
                    <Box display="flex" flexDirection="row" alignItems="center">
                      <BiTime />
                      <h4>
                        Register Date: <strong>{e?.register_date}</strong>
                      </h4>
                    </Box>
                  </Box>
                );
              })}
            </Flex>
            <Grid gap={2}></Grid>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
