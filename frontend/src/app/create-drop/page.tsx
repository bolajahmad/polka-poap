"use client";
import { AllowedEvents } from "@/models";
import { CreatePOAPSchema } from "@/utils";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  Text
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiPlusCircle } from "react-icons/fi";
import { TextInput } from "../(components)/(forms)/input";
import { useWalletStore } from "../(context)/(store)/wallet";
import { useWeb3Auth } from "../(context)/(web3-auth-provider)/web3-auth-provider";

export default function CreatePOAPDrop() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(CreatePOAPSchema),
  });
  const navigate = useRouter();
  const { login } = useWeb3Auth();
  const { user, connect } = useWalletStore((state) => state);
  const [authenticatedUser, setUser] = useState<any>();
  const isWalletConnected = false;

  /// handle signin function
  /// TODO: log users in using Polkadot wallet (or web3auth)
  const handleUserSignin = async () => {
    const user = await login();
    setUser(user);
    connect(user?.walletAddress as string);

    // call users contract to login as an organizer.
    // if organizer exists, then allow login
    // if organizer does not exist, create and allow login
  };

  /// Create user POAP drop schedule
  const onSubmit: SubmitHandler<Record<string, string>> = (model) => {
    console.log({ model });
    navigate.push('/drops');
  };

  return authenticatedUser ? (
    <Container h="screen" w="100%" maxW="100%" px={40} py="30">
      <Heading textAlign="center" color="blue">
        Create your POAP for Drop
      </Heading>

      <Box w="100%">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex pt="35" gap={10} alignItems="flex-start">
            <Box maxW={350} h="fit-content">
              <label htmlFor="artworkId">
                <Stack>
                  <Center className="px-4 py-8 border bg-[#f5f4ff] border-gray-400 rounded-3xl">
                    <Button as="div" colorScheme="blue">
                      <FiPlusCircle />
                      <Spacer w={2} />
                      Add POAP Artwork
                    </Button>
                  </Center>
                </Stack>
              </label>
              <input
                type="file"
                className="visually-hidden"
                name="artworkId"
                multiple={false}
                accept=".gif, .png, .jpg, .jpeg"
                id="artworkId"
              />
              <Text
                color="grayText"
                fontStyle="italic"
                textAlign="center"
                mt={4}
                fontSize={14}
              >
                Recommended for optimal performance: 500x500px, rounded shape,
                less than 200KB. Animated pngs are not supported.
              </Text>
            </Box>

            <Grid flexGrow={1} templateColumns="repeat(2, 1fr)" gap={6}>
              <GridItem colSpan={2}>
                <TextInput
                  label="POAP Title"
                  placeholder="Select a title for your POAP."
                  register={register}
                  name="title"
                />
              </GridItem>
              <GridItem colSpan={2}>
                <TextInput
                  register={register}
                  name="description"
                  placeholder="Write brief description about your POAP and what makes it special."
                  label="POAP Description"
                />
              </GridItem>
              <GridItem colSpan={2}>
                <TextInput name="website" type="url" label="Event Website" placeholder="Enter a website." register={register}  />
              </GridItem>
              <GridItem>
                <TextInput label="Event Start Date" placeholder="Select a date." register={register} type="date" name="startDate" />
              </GridItem>
              <GridItem>
                <TextInput name="endDate" type="date" placeholder="Select a date." register={register} label="POAP Mint date" />
              </GridItem>
              <GridItem>
                <TextInput label="Amount of Attendees" placeholder="000" type="number" name="attendeesCount" register={register} />
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Event Type</FormLabel>
                  <RadioGroup defaultValue="2">
                    <Stack spacing={5} direction="row">
                      <Radio colorScheme="green" value={AllowedEvents.InPerson} {...register('eventType')}>
                        In Person
                      </Radio>
                      <Radio colorScheme="green" value={AllowedEvents.Virtual} {...register('eventType')}>
                        Virtual
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </GridItem>
            </Grid>
          </Flex>

          <Box mt={12}>
            <Flex justifyContent="end" gap={8}>
              <Button type="button" colorScheme="green" variant="outline">Cancel</Button>

              <Button type="submit" colorScheme="green">Submit</Button>
            </Flex>
          </Box>
        </form>
      </Box>
    </Container>
  ) : (
    <Container h="screen" pt="40">
      <Heading as="h2" mb="20">
        Create a new POAP Drop
      </Heading>

      <Box>
        <Stack>
          <Text color="gray" fontWeight="bold" fontSize="20">
            Choose how you&apos;d like to
          </Text>

          <Box w="100%">
            <Button
              colorScheme="green"
              width="100%"
              size="lg"
              type="button"
              onClick={() => handleUserSignin()}
            >
              Sign In
            </Button>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
