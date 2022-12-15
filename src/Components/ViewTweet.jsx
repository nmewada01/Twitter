import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTweets } from "../Redux/action";
import {
  Box,
  Card,
  CardHeader,
  Flex,
  Avatar,
  Heading,
  Text,
  CardBody,
  Image,
  SimpleGrid,
  Button,
  CardFooter,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";

export default function ViewTweet() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const tweets = useSelector((store) => store.posts);
  const cUser = useSelector((store) => store.current);
  const [editedTweet, setEditedTweet] = useState("");

  useEffect(() => {
    dispatch(getTweets());
  }, [dispatch]);

  async function handleDelete(id) {
    await axios.delete(
      `https://nareshrajput-sportsk.up.railway.app/posts/${id}`
    );
    dispatch(getTweets());
  }

  async function handleEdit(el) {
    await axios.put(
      `https://nareshrajput-sportsk.up.railway.app/posts/${el.id}`,
      {
        username: el.username,
        tweet: editedTweet,
        gif: el.gif,
      }
    );
    dispatch(getTweets());
    onClose();
  }
  return (
    <Flex justifyContent={"center"}>
      <Box as={SimpleGrid} columns={[1, 2,2, 3]} spacing={"10"} fontSize={["sm","md","md","md"]} >
        {tweets.map((el, index) => {
          return (
            <Card
              maxW="md"
              key={index}
              boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
              p={["", "1rem"]}
            >
              <CardHeader>
                <Flex spacing="4">
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar name={el.username} src={el.image} />
                    <Box>
                      <Heading size="sm">{el.username}</Heading>
                    </Box>
                  </Flex>
                </Flex>
              </CardHeader>
              <CardBody bg={"beige"}>
                <Text textAlign={"left"} fontWeight={"semibold"}>
                  {el.tweet}
                </Text>
              </CardBody>
              <CardFooter>
                {cUser.username === el.username ? (
                  <Flex w={"100%"} justifyContent={"space-evenly"}>
                    <Button
                      colorScheme={"twitter"}
                      color={"white"}
                      my={"5"}
                      borderRadius={"2rem"}
                      onClick={onOpen}
                    >
                      Edit
                    </Button>
                    <Button
                      colorScheme={"twitter"}
                      color={"white"}
                      my={"5"}
                      borderRadius={"2rem"}
                      onClick={() => handleDelete(el.id)}
                    >
                      Delete
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Edit Post</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                          <Textarea
                            placeholder="Edit Tweet here"
                            defaultValue={el.tweet}
                            onChange={(e) => setEditedTweet(e.target.value)}
                          />
                        </ModalBody>

                        <ModalFooter>
                          <Button
                            colorScheme={"twitter"}
                            color={"white"}
                            my={"10"}
                            onClick={() => handleEdit(el)}
                          >
                            Update
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </Flex>
                ) : (
                  ""
                )}
              </CardFooter>
              <Box>
                <Image
                  h={"50vh"}
                  w={"100%"}
                  objectFit="cover"
                  src={el.gif}
                  alt="Chakra UI"
                />
              </Box>
            </Card>
          );
        })}
      </Box>
    </Flex>
  );
}
