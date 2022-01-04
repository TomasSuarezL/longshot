import { AddIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  HStack,
  useColorModeValue,
  useDisclosure,
  VisuallyHidden,
} from "@chakra-ui/react";

const Navbar = () => {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();

  return (
    <>
      <chakra.header bg={bg} w="full" px={{ base: 2, sm: 4 }} py={4} shadow="md">
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <HStack display="flex" spacing={3} alignItems="center">
            <Box display={{ base: "inline-flex", md: "none" }}></Box>
            <chakra.a
              href="/"
              title="Choc Home Page"
              display="flex"
              alignItems="center"
              fontWeight="bolder"
              color="green"
            >
              Longshot
              <VisuallyHidden>Longshot</VisuallyHidden>
            </chakra.a>
          </HStack>
          <HStack spacing={3} display={mobileNav.isOpen ? "none" : "flex"} alignItems="center">
            <Avatar size="sm" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          </HStack>
        </Flex>
      </chakra.header>
    </>
  );
};

export default Navbar;
