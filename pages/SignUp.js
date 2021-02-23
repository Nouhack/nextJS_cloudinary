import {
  Stack,
  Center,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Box,
  Input,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

export default function SignUp() {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [repassword, setrepassword] = useState("");

  const toast = useToast();

  const register = () => {
    fetch("/api/SignUp", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (res.status === 201) {
          toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: "An error occurred.",
            description: "Unable to create user account.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        console.log("error happend");
      });
  };

  return (
    <Stack direction="row" spacing="5px" h="100vh">
      <Center w="100%" h="100%">
        <Center
          boxShadow="dark-lg"
          p="6"
          rounded="md"
          bg="white"
          w={{ base: "90%", md: "70%", lg: "60%" }}
          // h="50%"
          // bg="red"
        >
          <Box w="70%" display={{ base: "none", md: "inherit" }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Panda_vector.svg/1200px-Panda_vector.svg.png"
              alt="none"
              //   width="50%"
            />
          </Box>
          <form
            style={{ width: "90%" }}
            onSubmit={(e) => {
              e.preventDefault();
              console.log("rani hna khou");
              register();
            }}
          >
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />

              <FormLabel mt={2}>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              <FormHelperText>We'll never share your email.</FormHelperText>

              <FormLabel mt={2}>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />

              <FormLabel mt={2}>repeat password</FormLabel>
              <Input
                type="password"
                value={repassword}
                onChange={(e) => setrepassword(e.target.value)}
              />

              <Button colorScheme="teal" mt={2} type="submit">
                SignUp
              </Button>
            </FormControl>
          </form>
        </Center>
      </Center>
    </Stack>
  );
}
