import { Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { CustomerRegister } from "../../Components/customers";
import { useAuth } from "../../Providers/AuthContext";

export const CustomersPage = () => {
  const { user, getUser } = useAuth();

  useEffect(() => {
    getUser(localStorage.getItem("@fullstack_challenge:Token") as string);
  }, [!user]);

  return !user?.costumers ? (
    <Spinner />
  ) : (
    <>
      <CustomerRegister />
    </>
  );
};
