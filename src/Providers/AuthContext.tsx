import { useToast } from "@chakra-ui/react";
import jwt_decode from "jwt-decode";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
} from "react";
import { useHistory } from "react-router-dom";
import { api } from "../Services/api";

interface ContextProps {
  singUp: (data: SignUpCredentials) => void;
  token: string;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  getUser: (token: string) => void;
  logOut: () => void;
  user?: User;
  customer?: User;
  updateUser: (data: SignUpCredentials) => void;
  deleteUser: () => void;
  contactRegister: (body: SignUpCredentials) => void;
  contactUpdate: (body: CustomerUpdate) => void;
  getCustomer: (id: string) => any;
  deleteCustomer: (id: string) => void;
}

interface ChildrenProp {
  children: ReactNode;
}

interface SignUpCredentials {
  email: string | undefined;
  phone: string | undefined;
  name: string | undefined;
}
interface CustomerUpdate {
  email: string | undefined;
  phone: string | undefined;
  id: string | undefined;
  name: string | undefined;
}
interface SignInCredentials {
  email: string;
  name: string;
}
interface User {
  email: string;
  phone: string;
  id: string;
  name: string;
}

interface LoginState {
  token: string;
}

interface User {
  email: string;
  name: string;
  phone: string;
  id: string;
  register_date: string;
  costumers: any;
}

const AuthContext = createContext<ContextProps>({} as ContextProps);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }: ChildrenProp) => {
  const toast = useToast();
  const history = useHistory();
  const [data, setData] = useState<LoginState>(() => {
    const token = localStorage.getItem("@fullstack_challenge:Token");
    if (token) {
      return { token };
    }
    return {} as LoginState;
  });
  const [user, setUser] = useState<User>();
  const [customer, setCustomer] = useState<User>();

  const signIn = useCallback(async ({ email, name }: SignInCredentials) => {
    await api
      .post("/login", { email, name })
      .then(async (response) => {
        const { token } = response.data;
        localStorage.setItem("@fullstack_challenge:Token", token);
        setData({ token });
        const { userId }: any = jwt_decode(data.token);
        toast({
          position: "top",
          title: "login sucessful",
          description: "login sucessful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        await api
          .get(`register/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            localStorage.setItem(
              "@fullstack_challenge:user",
              response.data.name
            );
            setUser(response.data);
          });
      })
      .then((response) => {
        history.push("/home");
      })
      .catch((error) => {});
  }, []);

  const getUser = useCallback(async (token: string) => {
    const { userId }: any = await jwt_decode(token);
    await api
      .get(`register/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch(({ response }) => {
        if (response.status === 401) {
          logOut();
          toast({
            position: "top",
            title: "Session Expired",
            description: "Session Expired",
            status: "warning",
            duration: 2000,
            isClosable: true,
          });
        } else {
          toast({
            position: "top",
            title: "Error",
            description: "Uncaught Error",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
      });
  }, []);

  const singUp = async (data: SignUpCredentials) => {
    await api
      .post("/register", data)
      .then(({ data }) => {
        toast({
          position: "top",
          title: "Sucessful Register",
          description: "Sucessful Register",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        history.push("/");
      })
      .catch((_) => {
        toast({
          position: "top",
          title: "Something Wrong, try again",
          description: "Something Wrong, try again",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const updateUser = async (update: SignUpCredentials) => {
    const { userId }: any = jwt_decode(data.token);
    await api
      .patch(`/register/${userId}`, update, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
      .then(({ data }) => {
        toast({
          position: "top",
          title: "Sucessful Update",
          description: "Sucessful Update",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setUser(data);
      })
      .catch((_) => {
        toast({
          position: "top",
          title: "Try again",
          description: "Try again",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const deleteUser = async () => {
    const { userId }: any = jwt_decode(data.token);
    await api
      .delete(`/register/${userId}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
      .then(({ data }) => {
        toast({
          position: "top",
          title: "Sucessful Delete",
          description: "Sucessful Delete",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        localStorage.clear();
        setData({} as LoginState);
        history.push("/");
      })
      .catch((_) => {
        toast({
          position: "top",
          title: "Try again",
          description: "Try again",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const logOut = () => {
    localStorage.clear();
    setData({} as LoginState);
    history.push("/");
  };

  const contactRegister = async (body: SignUpCredentials) => {
    await api
      .post("/customer", body, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
      .then(({ data }) => {
        toast({
          position: "top",
          title: "Contact Created",
          description: "Contact Created",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((_) => {
        toast({
          position: "top",
          title: "Something Wrong, try again",
          description: "Something Wrong, try again",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const contactUpdate = async (body: CustomerUpdate) => {
    const { id, name, email, phone } = body;
    await api
      .patch(
        `/customer/${id}`,
        { name, email, phone },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      )
      .then(({ data }) => {
        toast({
          position: "top",
          title: "Contact Created",
          description: "Contact Created",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((_) => {
        toast({
          position: "top",
          title: "Something Wrong, try again",
          description: "Something Wrong, try again",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const getCustomer = useCallback(async (id: string) => {
    await api
      .get(`customer/${id}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
      .then((response) => {
        setCustomer(response.data);
      })
      .catch(({ response }) => {
        if (response.status === 401) {
          logOut();
          toast({
            position: "top",
            title: "Session Expired",
            description: "Session Expired",
            status: "warning",
            duration: 2000,
            isClosable: true,
          });
        } else {
          toast({
            position: "top",
            title: "Something Wrong, try again",
            description: "Something Wrong, try again",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
      });
  }, []);

  const deleteCustomer = async (id: string) => {
    await api
      .delete(`/customer/${id}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
      .then(({ data }) => {
        toast({
          position: "top",
          title: "Sucessful Delete",
          description: "Sucessful Delete",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        history.push("/customers");
      })
      .catch((_) => {
        toast({
          position: "top",
          title: "Try again",
          description: "Try again",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <AuthContext.Provider
      value={{
        singUp,
        signIn,
        token: data.token,
        logOut,
        getUser,
        user,
        customer,
        updateUser,
        deleteUser,
        contactRegister,
        contactUpdate,
        getCustomer,
        deleteCustomer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
