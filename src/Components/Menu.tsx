import {
  Button,
  Container,
  Flex,
  Grid,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { CgMenuGridO } from "react-icons/cg";
import { useAuth } from "../Providers/AuthContext";
import { DrawerMenu } from "./DrawerMenu";
import { UpdatePerfil } from "./UpdatePerfil";

export const Menu = () => {
  const { token } = useAuth();
  const {
    isOpen: isDrawerMenuOpen,
    onOpen: onDrawerMenuOpen,
    onClose: onDrawerMenuClose,
  } = useDisclosure();

  const {
    isOpen: isUpdatePerfilOpen,
    onOpen: onUpdatePerfilOpen,
    onClose: onUpdatePerfilClose,
  } = useDisclosure();

  return (
    <>
      <UpdatePerfil
        isUpdatePerfilOpen={isUpdatePerfilOpen}
        onUpdatePerfilClose={onUpdatePerfilClose}
      />
      <DrawerMenu
        isDrawerMenuOpen={isDrawerMenuOpen}
        onDrawerMenuClose={onDrawerMenuClose}
        onUpdatePerfilOpen={onUpdatePerfilOpen}
      />
      <Grid
        as="header"
        position="fixed"
        w="full"
        h={["72px", "72px", "88px", "88px"]}
        zIndex="2"
        bgGradient={[
          "linear-gradient(to-b, rgba(0, 0, 0, 0) 1.67%, rgba(0, 0, 0, 0.5) 72.86%);",
        ]}
        gridArea="header"
        alignContent="center"
      >
        <Container
          maxW="container.xl"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <>
            <Button
              bgColor="transparent"
              _hover={{
                backgroundColor: "transparent",
              }}
              _active={{
                backgroundColor: "transparent",
              }}
              onClick={onDrawerMenuOpen}
              p={0}
              fontSize={["2.5rem", "3rem", "4rem"]}
            >
              <CgMenuGridO />
            </Button>
          </>
        </Container>
      </Grid>
    </>
  );
};
