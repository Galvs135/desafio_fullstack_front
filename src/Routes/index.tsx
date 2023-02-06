import { Box } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Redirect, Switch } from "react-router-dom";
import { CustomersPage } from "../Pages/customers";
import { CustomerSingle } from "../Pages/customers/customer";
import { Home } from "../Pages/home";
import { Login } from "../Pages/Login";

import { Register } from "../Pages/Register";
import { ReportPage } from "../Pages/report";

import { Route } from "./routes";

export const RoutesApplication = () => {
  return (
    <Switch>
      <AnimatePresence>
        <Box
          gridArea="main"
          as={motion.div}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <Route component={Login} exact path="/" />
          <Route component={Register} path="/register" />
          <Route component={Home} path="/home" isPrivate />
          <Route component={ReportPage} exact path="/report" isPrivate />
          <Route component={CustomersPage} exact path="/customers" isPrivate />
          <Route
            component={CustomerSingle}
            exact
            path="/customers/:id"
            isPrivate
          />
          <Route component={() => <Redirect to="/" />} path="/*" />
        </Box>
      </AnimatePresence>
    </Switch>
  );
};
