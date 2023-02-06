import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../Providers/AuthContext";

interface UpdatePerfilProps {
  isUpdatePerfilOpen: boolean;
  onUpdatePerfilClose(): void;
}

export const UpdatePerfil = ({
  isUpdatePerfilOpen,
  onUpdatePerfilClose,
}: UpdatePerfilProps) => {
  const { user, updateUser, deleteUser } = useAuth();
  const [name, setName] = useState<string | undefined>(user?.name);
  const [email, setEmail] = useState<string | undefined>(user?.email);
  const [phone, setPhone] = useState<string | undefined>(user?.phone);

  const handleClick = () => {
    updateUser({ name, email, phone });
  };

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setPhone(user?.phone);
  }, [!user]);

  return (
    <>
      <Modal
        isOpen={isUpdatePerfilOpen}
        onClose={() => {
          onUpdatePerfilClose();
        }}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent background="black">
          <ModalHeader
            fontFamily="title"
            color="white"
            background="#141414"
            borderTopLeftRadius="8px"
            borderTopRightRadius="8px"
            display="flex"
            flexDirection="row"
            alignItems={["center", "center", "flex-end", "flex-end"]}
            justifyContent={[
              "center",
              "center",
              "space-around",
              "space-around",
            ]}
            flexWrap="nowrap"
          >
            {user?.name}
          </ModalHeader>

          <ModalCloseButton fontSize="15px" />
          <ModalBody
            pb={6}
            display="flex"
            justifyContent="center"
            flexDirection="column"
          >
            <Input value={name} onChange={(e) => setName(e.target.value)} />
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </ModalBody>
          <ModalFooter display="flex" flexDirection="column">
            <Button
              onClick={handleClick}
              bg="#141414"
              w="90%"
              marginBottom="5px"
              _hover={{
                borderColor: "#000000",
                bg: "#162b46",
              }}
            >
              Update
            </Button>
            <Button
              onClick={() => {
                onUpdatePerfilClose();
                deleteUser();
              }}
              bg="#692626"
              w="90%"
              h="30px"
              _hover={{
                borderColor: "#000000",
                bg: "#9c6b10",
              }}
            >
              Delete Account
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
