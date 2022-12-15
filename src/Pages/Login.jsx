import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { login, loginPro } from "../Redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginUser = useSelector((store) => store?.users);
  const toast = useToast();
  // console.log(loginUser);
  const handleLogin = () => {
    dispatch(login()).then(() => {
      if (loginUser) {
        var flag = true;
        for (let i = 0; i < loginUser.length; i++) {
          if (
            loginUser[i]?.email === email &&
            loginUser[i].username === userName &&
            loginUser[i]?.password === password
          ) {
            flag = true;
            let check = loginUser[i];
            alert("Login Success");
            toast({
              title: "Login Successfully",
              description: "You are at profile page",
              status: "success",
            });
            dispatch(loginPro(check));
            navigate("/user", { replace: true });
            break;
          } else {
            flag = false;
            continue;
          }
        }
      }
      if (!flag) {
        alert("login failed");
      }
    });
  };
  return (
    <Flex
      w={"100%"}
      h={["95vh"]}
      m={"auto"}
      my={"10"}
      justifyContent={"center"}
    >
      <Box bg={"white"} h={["60%"]} p={"2rem"}>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button
          my={"5"}
          w={"100%"}
          colorScheme={"blackAlpha"}
          bg={"black"}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </Flex>
  );
};

export default Login;
