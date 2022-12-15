import {
  Textarea,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Image,
  SimpleGrid,
  Flex,
  Avatar,
  Container,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTweets } from "../Redux/action";

export const PostTweet = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((store) => store.current);
  const [tweet, setTweet] = useState("");
  const [searchGif, setSearchGif] = useState("");
  const [gifItems, setGifItems] = useState([]);
  const [selectedGif, setSelectedGif] = useState("");
  const toast = useToast();
  async function searchForGif() {
    let { data } = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=sdUwHa4YZ4BYUgweGmrrIEXRyRxMCN1T&q=${searchGif}&limit=5&offset=0&rating=g&lang=en`
    );
    setGifItems(data.data);
  }

  async function postTweet() {
    await axios.post("https://nareshrajput-sportsk.up.railway.app/posts", {
      username: userLoggedIn.username || "username",
      tweet: tweet,
      gif: selectedGif,
      image: userLoggedIn.image || "",
    });
    dispatch(getTweets());
  }
  return (
    <Box my={"10"}>
      <Container>
        <Flex>
          <Avatar
            m={"3"}
            src={userLoggedIn ? userLoggedIn.image : ""}
            size={"md"}
          />
          <Textarea
            placeholder="What's Happening ?"
            onChange={(e) => setTweet(e.target.value)}
          />
        </Flex>

        <Box as={Flex} justifyContent={"space-evenly"}>
          <Button
            colorScheme={"twitter"}
            color={"white"}
            my={"5"}
            onClick={onOpen}
          >
            GIF
          </Button>
          <Button
            colorScheme={"twitter"}
            color={"white"}
            my={"5"}
            p={"0.25rem 1.3rem"}
            borderRadius={"2rem"}
            onClick={postTweet}
          >
            TWEET
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Select Gif</ModalHeader>
              <ModalCloseButton />
              <ModalBody
                display={"flex"}
                flexDirection={"row"}
                flexWrap={"wrap"}
              >
                <Box>
                  <Input
                    type={"text"}
                    onChange={(e) => setSearchGif(e.target.value)}
                  />
                  <Button
                    colorScheme={"twitter"}
                    color={"white"}
                    my={"10"}
                    onClick={searchForGif}
                  >
                    Search
                  </Button>
                </Box>
                <SimpleGrid columns={3}>
                  {gifItems.map((el, index) => {
                    return (
                      <Image
                        src={el.images.original.url}
                        width="200px"
                        height="200px"
                        onClick={(e) => {
                          setSelectedGif(e.target.src);
                          toast({
                            title: "Gif Updated Successfully",
                            description: "Now you can tweet",
                            status: "success",
                          });
                          onClose();
                        }}
                      />
                    );
                  })}
                </SimpleGrid>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme={"twitter"}
                  color={"white"}
                  my={"10"}
                  onClick={onClose}
                >
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Container>
    </Box>
  );
};
