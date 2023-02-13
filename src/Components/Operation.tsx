import { Box, Link, List, ListItem } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { RiLogoutBoxFill } from "react-icons/ri";
import { itemLeft, container } from "../Styles/animate";
import { useAuth } from "../Providers/AuthContext";
import { AiFillSetting } from "react-icons/ai";
import linkCss from "../Styles/link";

interface OperationProps {
  onUpdatePerfilOpen(): void;
  onDrawerMenuClose(): void;
}

export const Operation = ({
  onUpdatePerfilOpen,
  onDrawerMenuClose,
}: OperationProps) => {
  const { logOut, getUser } = useAuth();
  return (
    <List
      as={motion.nav}
      spacing={6}
      w="full"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <ListItem as={motion.li} variants={itemLeft}>
        <Link
          as={motion.button}
          sx={linkCss}
          onClick={() => {
            getUser(
              localStorage.getItem("@fullstack_challenge:Token") as string
            );
            onDrawerMenuClose();
            setTimeout(() => {
              onUpdatePerfilOpen();
            }, 300);
          }}
        >
          <Box as="span" fontSize="1.5rem">
            <AiFillSetting />
          </Box>
          <span>Atualizar Perfil</span>
        </Link>
      </ListItem>
      <ListItem as={motion.li} variants={itemLeft}>
        <Link as={motion.button} sx={linkCss} onClick={logOut}>
          <Box as="span" fontSize="1.5rem">
            <RiLogoutBoxFill />
          </Box>
          <span>SAIR</span>
        </Link>
      </ListItem>
    </List>
  );
};
