import { Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { Report } from "../../Components/report";
import { useAuth } from "../../Providers/AuthContext";

export const ReportPage = () => {
  const { user, getUser } = useAuth();

  useEffect(() => {
    getUser();
  }, [!user]);

  return !user?.name ? (
    <Spinner />
  ) : (
    <>
      <Report />
    </>
  );
};
