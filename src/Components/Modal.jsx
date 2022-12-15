import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { updateProfile } from "../Redux/action";

export const ProfileUpdate = ({ id, profile, dispatch, getData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [image, setImage] = useState("");
  const toast = useToast();
  useEffect(() => {
    if (id) {
      let cur = profile.find((item) => item.id === id);
      if (cur) {
        setEmail(cur?.email);
        setUserName(cur?.username);
        setImage(cur?.image);
      }
    }
  }, [id, profile, profile.email, profile.image, profile.username]);
  const handleUpdate = () => {
    dispatch(updateProfile({ email, username, image }, id, toast)).then(() => {
      getData();
      onClose();
    });
  };
  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme={"twitter"}
        color={"white"}
        my={"10"}
      >
        Edit
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel>Email</FormLabel>
            <Input
              type={"text"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel>Username</FormLabel>
            <Input
              type={"text"}
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <FormLabel>Image</FormLabel>
            <Input
              type={"text"}
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <Button
              colorScheme={"twitter"}
              color={"white"}
              my={"10"}
              onClick={handleUpdate}
            >
              Update
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
