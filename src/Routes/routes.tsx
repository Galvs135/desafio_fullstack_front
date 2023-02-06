import { ComponentType } from "react";
import {
  Redirect,
  Route as CommonRoute,
  RouteProps as ReactRouteProps,
} from "react-router-dom";
import { useAuth } from "../Providers/AuthContext";

interface RouteProps extends ReactRouteProps {
  isPrivate?: boolean;
  component: ComponentType;
}

export const Route = ({
  isPrivate,
  component: Component,
  ...rest
}: RouteProps) => {
  const { token } = useAuth();

  return (
    <CommonRoute
      {...rest}
      render={() => {
        return !!isPrivate === !!token ? (
          <Component />
        ) : (
          <Redirect to={isPrivate ? "/" : "/home"} />
        );
      }}
    />
  );
};
