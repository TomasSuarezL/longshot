import Link from "next/link";
import { HamburgerIcon, MoonIcon, StarIcon, SunIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Flex,
  Icon,
  Box,
  useColorModeValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  IconButton,
  Avatar,
  Heading,
  BoxProps,
  ComponentWithAs,
  IconProps,
  Text,
  useColorMode,
  Container,
} from "@chakra-ui/react";

export const Layout: React.FC = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const sidebar = useDisclosure();

  const NavItem = (props: BoxProps & { icon: ComponentWithAs<"svg", IconProps> }) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        mx="2"
        rounded="md"
        py="3"
        cursor="pointer"
        _hover={{
          bg: "blackAlpha.300",
        }}
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && <Icon mr="2" boxSize="4" as={icon} />}
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props: BoxProps) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="brand.600"
      borderColor="blackAlpha.300"
      borderRightWidth="1px"
      w="72"
      {...props}
    >
      <Flex px="4" py="5" align="center" justify="center">
        <Heading as="h2" size="xl">
          Longshot
        </Heading>
      </Flex>
      <Flex direction="column" as="nav" fontSize="sm" aria-label="Main Navigation">
        <NavItem icon={StarIcon}>
          <Link href="/trades">
            <a>Trades</a>
          </Link>
        </NavItem>
      </Flex>
    </Box>
  );

  return (
    <Box as="section" bg={useColorModeValue("gray.50", "gray.700")} minH="100vh">
      <SidebarContent
        display={{ base: "none", md: "unset" }}
        bg={useColorModeValue("green.50", "green.800")}
      />
      <Drawer isOpen={sidebar.isOpen} onClose={sidebar.onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent
            w="full"
            borderRight="none"
            bg={useColorModeValue("green.50", "gray.800")}
          />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 72 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg={useColorModeValue("white", "gray.800")}
          borderBottomWidth="1px"
          borderColor="blackAlpha.300"
          h="6vh"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={sidebar.onOpen}
            icon={<HamburgerIcon />}
            size="sm"
          />

          <Flex align="center" justifyContent="end" w="full">
            <IconButton
              aria-label="Toggle Color Mode"
              onClick={toggleColorMode}
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            />

            <Avatar
              ml="4"
              size="sm"
              name="anubra266"
              src="https://avatars.githubusercontent.com/u/30869823?v=4"
              cursor="pointer"
            />
          </Flex>
        </Flex>

        <Container
          as="main"
          p="4"
          maxW="container.xl"
          h="94vh"
          overflow="auto"
          display="flex"
          flexDirection="column"
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
};
