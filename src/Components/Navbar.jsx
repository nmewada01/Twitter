import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <Box bg={"#1da1f2"} color={"white"} fontWeight={"bold"}>
      <Flex h={"8vh"} justifyContent={"space-around"} alignItems={"center"}>
        {/* <Box>
          <Link to="/">Home</Link>
        </Box> */}
        <Box
          _hover={{
            color: "black",

            textDecoration: "underline",
          }}
        >
          <Link to="/">Home</Link>
        </Box>
        <Box
          _hover={{
            color: "black",
            textDecoration: "underline",
          }}
        >
          <Link to="/user">User</Link>
        </Box>
        <Box
          _hover={{
            color: "black",
            textDecoration: "underline",
          }}
        >
          <Link to="/signup">Signup</Link>
        </Box>
        <Box
          _hover={{
            color: "black",
            textDecoration: "underline",
          }}
        >
          <Link to="/login">Login</Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
