import { Box } from "@chakra-ui/react";
import React from "react";
import { PostTweet } from "../Components/PostTweet";
import ViewTweet from "../Components/ViewTweet";

const Timeline = () => {
  return (
    <Box>
      <PostTweet />
      <ViewTweet />
    </Box>
  );
};

export default Timeline;
