import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  List,
} from "@chakra-ui/react";
import { container } from "../Styles/animate";
import { motion } from "framer-motion";
import { ItemMenu } from "./itemMenu";
import { Operation } from "./Operation";
interface DrawerMenuProps {
  onDrawerMenuClose(): void;
  onUpdatePerfilOpen(): void;
  isDrawerMenuOpen: boolean;
}

export const DrawerMenu = ({
  onDrawerMenuClose,
  isDrawerMenuOpen,
  onUpdatePerfilOpen,
}: DrawerMenuProps) => {
  return (
    <Drawer
      placement="left"
      onClose={onDrawerMenuClose}
      isOpen={isDrawerMenuOpen}
      size={["full", "full", "full", "full", "full", "xs"]}
    >
      <DrawerOverlay />
      <DrawerContent
        bg="black"
        bgPos="center"
        bgSize="contain"
        bgRepeat="no-repeat"
      >
        <DrawerCloseButton />
        <DrawerHeader p={6}></DrawerHeader>
        <DrawerBody>
          <Flex pt={4}>
            <List
              as={motion.nav}
              spacing={6}
              w="full"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              <ItemMenu title="CUSTOMERS" path="/customers" />
              <ItemMenu title="REPORT" path="/report" />
            </List>
          </Flex>
        </DrawerBody>
        <DrawerFooter>
          <Operation
            onUpdatePerfilOpen={onUpdatePerfilOpen}
            onDrawerMenuClose={onDrawerMenuClose}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
