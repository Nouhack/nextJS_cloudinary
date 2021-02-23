import {
  Stack,
  Center,
  Progress,
  Button,
  Box,
  useToast,
  Flex,
  Wrap,
  WrapItem,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import ImagesSkeleton from "../components/ImagesSkeleton";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Image, Transformation } from "cloudinary-react";
import useSWR, { trigger } from "swr";
import { useSession, signOut } from "next-auth/client";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Authentified() {
  const [session] = useSession();
  const toast = useToast();
  const [show, setshow] = useState(false);

  const { data, error } = useSWR("/api/GetAllImages", fetcher);

  const onDrop = useCallback(async (acceptedFiles) => {
    setshow(true);

    const { signature, timestamp } = await getSignature();

    // Do something with the files
    console.log(acceptedFiles[0]);

    const data = new FormData();

    data.append("file", acceptedFiles[0]);
    data.append("signature", signature);
    data.append("timestamp", timestamp);
    data.append("api_key", process.env.NEXT_PUBLIC_API_Key);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const cloudinary_image_uploaded = await response.json();

    const res = await fetch("/api/SaveImageToDataBase", {
      method: "POST",
      body: JSON.stringify({
        public_id: cloudinary_image_uploaded.public_id,
        user_image: session.user.name,
      }),
    });

    console.log(cloudinary_image_uploaded.public_id);
    setshow(false);
    trigger("/api/GetAllImages");
    toast({
      title: "Image uploaded.",
      description: "We've uploaded your images for you.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  }, []);

  //----------------------------
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  return (
    <Stack direction="column" spacing="5px" h="100vh">
      <Flex h="8vh" alignItems="center" justifyContent="flex-end">
        <Button onClick={signOut} mr={20} mt={5}>
          {" "}
          LOG OUT{" "}
        </Button>
      </Flex>

      <Stack direction="column">
        <Center>
          <Center {...getRootProps()} style={{ width: "50%" }}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <Center w="100%" h="100px" mt={5} mb={5}>
                <img
                  src="https://image.flaticon.com/icons/png/512/1589/1589085.png"
                  alt="Drag here ..."
                  width="100px"
                />
              </Center>
            ) : (
              <Center w="100%" h="100px" mt={5} mb={5}>
                <img
                  src="https://icon-library.com/images/drag-and-drop-icon/drag-and-drop-icon-8.jpg"
                  alt="Drag here ..."
                  width="100px"
                />
              </Center>
            )}
          </Center>
        </Center>
        <Box h="5px">{show && <Progress size="xs" isIndeterminate />}</Box>
      </Stack>
      <Wrap spacing="0" justify="center" pb={10} w="100%">
        {error && (
          <Box w="100%">
            <Alert
              status="error"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="200px"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                Error while uploading images from the server
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                Sorry for that , please refresh your browser or try Later
              </AlertDescription>
            </Alert>
          </Box>
        )}
        {!data && !error && <ImagesSkeleton />}
        {data &&
          data.map((item, key) => {
            return (
              <WrapItem
                mt={10}
                key={key}
                w={{ base: "100%", md: "50%", lg: "30%" }}
                h="300px"
              >
                <Center w="100%" h="100%">
                  <Image
                    cloudName={process.env.NEXT_PUBLIC_CLOUD_NAME}
                    style={{
                      width: "90%",
                      height: "300px",
                      objectFit: "cover",
                      border: "1px solid black",
                    }}
                    publicId={item.public_id}
                  />
                </Center>
              </WrapItem>
            );
          })}
      </Wrap>
    </Stack>
  );
}

const getSignature = async () => {
  const response = await fetch("/api/signGen");
  const data = await response.json();
  return data;
};

/*
 <WrapItem w={{ base: "100%", md: "30%" }}>
          <img
            src="https://media.gqmagazine.fr/photos/5faa3f4de690636ab1e3e2ce/master/pass/cristiano-ronaldo.jpg"
            alt="none"
            style={{ objectFit: "cover", height: "300px", width: "100%" }}
          />
        </WrapItem>
        <WrapItem w={{ base: "100%", md: "30%" }}>
          <img
            src="https://static1.ozap.com/articles/1/58/52/11/@/4624606-cristiano-ronaldo-article_media_image-2.jpg"
            alt="none"
            style={{ objectFit: "cover", height: "300px", width: "100%" }}
          />
        </WrapItem>
        <WrapItem w={{ base: "100%", md: "30%" }}>
          <img
            src="https://www.dw.com/image/46453360_401.jpg"
            alt="none"
            style={{ objectFit: "cover", height: "300px", width: "100%" }}
          />
        </WrapItem>
        <WrapItem w={{ base: "100%", md: "30%" }}>
          <img
            src="https://gololy.com/gallery/2019/image_05/20190220_193927_1540.jpg"
            alt="none"
            style={{ objectFit: "cover", height: "300px", width: "100%" }}
          />
        </WrapItem>
        <WrapItem w={{ base: "100%", md: "30%" }}>
          <img
            src="https://medias.lequipe.fr/img-photo-jpg/gold-ball-real-madrid-forward-cristiano-ronaldo-dos-santos-ronaldo-number-7-round-octavos-of-t/1500000000982282/511:96%2C2500:1421-1000-666-70/dbc5f.jpg"
            alt="none"
            style={{ objectFit: "cover", height: "300px", width: "100%" }}
          />
        </WrapItem>

        DC:89:83:32:0C:6B
*/
