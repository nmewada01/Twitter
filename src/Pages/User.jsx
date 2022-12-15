import { Box, Button, Flex, Image } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProfileUpdate } from "../Components/Modal";
const User = () => {
  const dispatch = useDispatch();
  // var profile = useSelector((store) => store?.current);
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();
  const getData = () => {
    axios.get("https://nareshrajput-sportsk.up.railway.app/loginProfile").then((r) => {
      setProfile(r.data);
    });
  };
  const handleDelete = (id) => {
    axios.delete(`https://nareshrajput-sportsk.up.railway.app/loginProfile/${id}`).then((r) => {
      alert("profile removed successfull");
      navigate("/login");
      getData();
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Flex h={"100vh"} justifyContent={"center"} alignItems={"center"}>
      {profile?.length &&
        profile?.map((item, i) => (
          <Box key={i} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" p={"5rem"}>
            <Box>
              <Image w={"100%"} src={item.image} />
            </Box>
            <Box>Username : {item.username}</Box>
            <Box>Email : {item.email}</Box>
            <Flex justifyContent={"space-around"} my={"5"}>
              <Button
                colorScheme={"twitter"}
                color={"white"}
                my={"10"}
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </Button>
              <ProfileUpdate
                id={item.id}
                profile={profile}
                dispatch={dispatch}
                getData={getData}
              />
            </Flex>
          </Box>
        ))}
    </Flex>
  );
};

export default User;

// {/* <Box boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" p={"5rem"}>
// <Box>
//   <Image w={"100%"} src={profile?.image} />
// </Box>
// <Box>UserName : {profile?.username}</Box>
// <Box>Profile : {profile?.email}</Box>
// <Flex justifyContent={"space-around"} my={"5"}>
//   <Button
//     colorScheme={"twitter"}
//     color={"white"}
//     my={"10"}
//     onClick={() => handleDelete(profile?.id)}
//   >
//     Delete
//   </Button>
//   <ProfileUpdate
//     id={profile?.id}
//     profile={profile}
//     dispatch={dispatch}
//   />
// </Flex>
// </Box> */}
