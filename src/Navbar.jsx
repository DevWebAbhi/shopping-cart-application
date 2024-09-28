import { Box, useMediaQuery } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box
      display="flex"
      padding="0.5rem"
      justifyContent="space-around"
      background={
        "#81b1ce"
      }
      borderRadius={"0 0 0.5rem 0.5rem"}
      fontSize={"larger"}
      color={"white"}
    >
      {isLargerThan900 ? (
        <>
          <Box  onClick={() => handleNavigation("/")}>Home</Box>
          <Box display="flex" padding="0.5rem" justifyContent="space-around">
            <Box
            onClick={()=>{
              handleNavigation("/cart");
            }}
            >
              Cart
            </Box>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          width="100%"
          justifyContent="space-around"
          background={
            "#81b1ce"
          }
          color={"white"}
        >
          <Box onClick={() => handleNavigation("/")}>Home</Box>
          <Box onClick={() => handleToggle()} cursor="pointer">
            <HamburgerIcon />
            {toggle ? (
              <Box>
                <Box
            onClick={()=>{
              handleNavigation("/cart");
            }}
            _hover={{cursor:"pointer"}}
            >
              Cart
            </Box>
              </Box>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
