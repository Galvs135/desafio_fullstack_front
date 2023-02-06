import { Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { CustomerRegister } from "../../Components/customers";
import { CustomerEdit } from "../../Components/UpdateCustomer";
import { useAuth } from "../../Providers/AuthContext";

export const CustomerSingle = () => {
  return <CustomerEdit />;
};
