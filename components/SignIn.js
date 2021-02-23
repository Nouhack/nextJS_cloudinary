import {
  Stack,
  Center,
  FormControl,
  FormLabel,
  Text,
  Button,
  InputGroup,
  Input,
  InputRightElement,
  FormHelperText,
  Progress,
} from "@chakra-ui/react";
import { signIn } from "next-auth/client";
import Link from "next/link";
import { useState } from "react";

export default function SignIn() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Stack direction="row" spacing="5px" h="100vh">
      <Center
        w="40%"
        display={{ base: "none", md: "inherit" }}
        h="100%"
        //   bg="yellow.200"
      >
        <img
          src="https://images.vexels.com/media/users/3/191731/isolated/preview/963d0318e146e19a800a2c2a4ed9bbc7-panda-chewing-vector-by-vexels.png"
          alt="none"
          width="80%"
        />
      </Center>
      <Center w={{ base: "100%", md: "60%" }} h="100%">
        <Center
          boxShadow="dark-lg"
          p="6"
          rounded="md"
          bg="white"
          w="80%"
          //  h="50%"
          //  bg="red"
        >
          <form
            style={{ width: "80%" }}
            onSubmit={(e) => {
              e.preventDefault();
              signIn("credentials", {
                email: email,
                password: password,
              });
            }}
          >
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              <FormHelperText>We'll never share your email.</FormHelperText>

              <FormLabel>Password</FormLabel>

              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <FormHelperText>
                <Text color="teal">
                  <Link href="/SignUp">Sign up Now</Link>
                </Text>
              </FormHelperText>

              <Button colorScheme="teal" mt={2} type="submit">
                SignIn
              </Button>
            </FormControl>
          </form>
        </Center>
      </Center>
    </Stack>
  );
}
