'use client'
import { useWeb3Auth } from "@/app/(context)/(web3-auth-provider)/web3-auth-provider";
import { useContractInteractions } from "@/hooks/useContractInteractions";
import { useEventsContract } from "@/hooks/useEventContract";
import { AllowedEvents, AllowedUsers } from "@/models";
import { CreatePOAPSchema } from "@/utils";
import { IPFSBucket } from "@/utils/ipfs-bucket";
import { Box, Button, Center, Flex, FormControl, FormLabel, Grid, GridItem, Radio, RadioGroup, Spacer, Square, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { getBalance, useInkathon } from "@scio-labs/use-inkathon";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiPlusCircle } from "react-icons/fi";
import { MdFindReplace } from "react-icons/md";
import { TextInput } from "./input";

export const CreatePOAPDataForm = () => {
    const { api } = useInkathon();
    const { state: { provider, userInfo: { encodedSecretKey,walletAddress } } } = useWeb3Auth();
    const [fileData, setFileData] = useState<{uri: string, file: File}>();
    const { handleSubmit, register } = useForm({
        resolver: zodResolver(CreatePOAPSchema)
    });
    const { verifyUser } = useContractInteractions();
    const { registerEvent } = useEventsContract();

    const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) {
            toast.error("No file selected", { position: "top-left" });
            return;
        }
        if (files.length == 1) {
                const file = files[0];
                if (file.size > 1000000) {
                    toast.error("File must not exceed 200kb", { position: "top-left" });
                    return;
                }
                const reader = new FileReader();
                reader.onload = (e) => {
                    const fileURI = e.target?.result as string;
                    // Use the fileURI as needed
                    setFileData({uri:fileURI, file});
                };
                reader.readAsDataURL(file);
        } else {
            toast.error("Multiple files not allowed", { position: "top-left" });
        }
    }

    const onSubmit: SubmitHandler<Record<string, string>> = async (model) => {
        console.log({ model, artworkId: fileData?.file });

        if (!fileData) {
            toast.error("Please upload an artwork!!");
            return;
        }

        let balance = await getBalance(api!, walletAddress as string,);
        console.log({ balance })

        if (provider) {
          const ipfs = new IPFSBucket(provider);
          const imageCid = await ipfs.saveToIPFS(encodedSecretKey as string, fileData.file);

          // create new JSON for metadata
          const metadataJSON = JSON.stringify(Object.assign(model, { artworkId: imageCid }));
          // convert to blob
          const metadataBlob = new Blob([metadataJSON], { type: "application/json" });
          console.log({ metadataBlob })

          const poapCid = await ipfs.saveToIPFS(encodedSecretKey as string, metadataBlob);
          console.log({ poapCid })

          // call contract to create poap.
          await registerEvent(walletAddress as string, poapCid as string, new Date(model.startDate).getTime(), new Date(model.endDate).getTime());
        }
    }

    useEffect(() => {
      if (encodedSecretKey) {
        console.log("checking existence", encodedSecretKey, walletAddress)
        verifyUser(AllowedUsers.Organizer, walletAddress as string, encodedSecretKey)
      }
    }, [walletAddress, encodedSecretKey, verifyUser]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex pt="35" gap={10} alignItems="flex-start">
            <Box maxW={350} h="fit-content">
              <label htmlFor="artworkId">
                <Stack>
                  <Center className="px-4 py-8 border bg-[#f5f4ff] border-gray-400 rounded-3xl">
                    {fileData?.uri ? (
                        <Stack>
                            <Square>
                                <Image src={fileData.uri} alt="uploaded file URI" height={100} width={100} />
                            </Square>

                            <Text colorScheme="info" color="blue" className="center font-bold italic text-xs">{fileData.file.name}</Text>

                            <Button as="div" colorScheme="blue" className="text-sm" size="sm">
                                <MdFindReplace size={14} />
                                <Spacer w={2} />
                                Replace Artwork
                            </Button>
                        </Stack>
                    ) : (
                        <Button as="div" colorScheme="blue">
                            <FiPlusCircle />
                            <Spacer w={2} />
                            Add POAP Artwork
                        </Button>
                    )}
                  </Center>
                </Stack>
              </label>
              <input
                type="file"
                className="visually-hidden"
                name="artworkId"
                onChange={handleFileSelect}
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
                less than 1MB. Animated pngs are not supported.
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
    )
}