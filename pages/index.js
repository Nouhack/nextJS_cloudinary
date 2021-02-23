import Head from "next/head";
import SignIn from "../components/SignIn";
import Authentified from "../components/Authentified";
import { useSession, signIn, signOut } from "next-auth/client";
import { Center, Spinner } from "@chakra-ui/react";

export default function Home() {
  const [session, loading] = useSession();
  if (loading) {
    return (
      <Center w="100%" h="100vh">
        {" "}
        <Spinner size="xl" />
      </Center>
    );
  }

  if (session) {
    return (
      <>
        <Head>
          <title>Welcome</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Authentified />
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Log In</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignIn />
    </>
  );
}
