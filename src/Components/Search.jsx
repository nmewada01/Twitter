import { Button, Flex, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
const Search = () => {
  const [query, setQuery] = useState("");
  const handleSearch = () => {
    axios
      .get(`https://nareshrajput-sportsk.up.railway.app/posts?q=${query}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Flex w={"30%"} m={"auto"}>
      <Input value={query} onChange={(e) => setQuery(e.target.value)} />
      <Button onClick={handleSearch}>Search</Button>
    </Flex>
  );
};

export default Search;
