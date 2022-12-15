import React, { useReducer } from "react";
import {
  Flex,
  Box,
  Input,
  Button,
  Textarea,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { register } from "../Redux/action";
import { useNavigate } from "react-router-dom";

const initialState = {
  username: "",
  email: "",
  password: "",
  image: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "username":
      return { ...state, username: action.payload };
    case "image":
      return { ...state, image: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

const Signup = () => {
  const [state, setState] = useReducer(reducer, initialState);
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const RegisterHandle = () => {
    dispatch(register(state,toast)).then((r) => {
      navigate("/login", { replace: true });
    });
  };

  return (
    <Flex h={"100vh"} justifyContent={"center"} my={"10"} w={"100%"}>
      <Box bg={"white"} h={["75%"]} p={"2rem"}>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          value={state.username}
          onChange={(e) =>
            setState({ type: "username", payload: e.target.value })
          }
        />
        <FormLabel>Email</FormLabel>

        <Input
          type="email"
          value={state.email}
          onChange={(e) => setState({ type: "email", payload: e.target.value })}
        />
        <FormLabel>Password</FormLabel>

        <Input
          type="password"
          value={state.password}
          onChange={(e) =>
            setState({ type: "password", payload: e.target.value })
          }
        />
        <FormLabel>Image</FormLabel>

        <Textarea
          value={state.image}
          onChange={(e) => setState({ type: "image", payload: e.target.value })}
        />
        <Button
          my={"5"}
          w={"100%"}
          colorScheme={"blackAlpha"}
          bg={'black'}
          onClick={RegisterHandle}
        >
          
          Register
        </Button>
      </Box>
    </Flex>
  );
};

export default Signup;
