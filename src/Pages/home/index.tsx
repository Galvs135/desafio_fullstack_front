import { Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { Homepage } from "../../Components/home";
import { useAuth } from "../../Providers/AuthContext";

export const Home = () => {
  const { user, getUser } = useAuth();

  useEffect(() => {
    getUser(localStorage.getItem("@fullstack_challenge:Token") as string);
  }, [!user]);

  return !user?.name ? (
    <Spinner />
  ) : (
    <>
      <Homepage />
    </>
  );
};
