"use client";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Heading,
  Input,
  List,
  Select,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  HiOutlineSortAscending,
  HiOutlineSortDescending,
} from "react-icons/hi";
import { MdNavigateNext } from "react-icons/md";
import { MiniPOAPCardItem } from "../(components)/(list-items)/MiniPOAPCardItem";
import { RecentPOAPItems } from "../(components)/(list-items)/RecentPOAPLisItem";

export default function DropsPage() {
  const [query, setQuery] = useState("");
  return (
    <Container h="screen" w="100%" maxW="100%" px={40} py="30">
      <Box textAlign="center">
        <Heading>POAP Gallery</Heading>
        <Text>All adventures enjoyed by your fellow collectors.</Text>
      </Box>

      <Spacer h={20} />
      <Box mx="auto">
        <Box>
          <Heading>Recent Activities</Heading>

          <Flex gap={10}>
            <Grid gridTemplateColumns="3" className="flex-1 w-full">
              <GridItem>
                <Flex as={List}>
                  <RecentPOAPItems
                    id={1}
                    avatar=""
                    eventId={1}
                    eventType="minting"
                    parachainId={311}
                    timestamp={109276372}
                    key={123}
                  />
                  <RecentPOAPItems
                    id={2}
                    avatar=""
                    eventId={2}
                    eventType="minting"
                    parachainId={311}
                    timestamp={109276372}
                    key={213}
                  />
                  <RecentPOAPItems
                    id={3}
                    avatar=""
                    eventId={3}
                    eventType="minting"
                    parachainId={311}
                    timestamp={109276372}
                    key={321}
                  />
                </Flex>
              </GridItem>
            </Grid>
            <Box maxW={200} w="fit-content">
              <Button colorScheme="purple">
                View more
                <MdNavigateNext />
              </Button>
            </Box>
          </Flex>
        </Box>

        <Box>
          <Flex>
            <Box>
              <Input
                type="search"
                value={query}
                onChange={({ target }) => setQuery(target.value)}
                placeholder="Search drop by name or ID"
              />
            </Box>

            <Flex as={FormControl}>
              <label>
                Order By
                <Select defaultValue="id">
                  <option value="id">ID</option>
                  <option value="timestamp">Timestamp</option>
                  <option value="blockNumber">Block Number</option>
                  <option value="eventDate">Event Date</option>
                </Select>
              </label>

              <Button>
                {true ? (
                  <HiOutlineSortAscending />
                ) : (
                  <HiOutlineSortDescending />
                )}
              </Button>
            </Flex>
          </Flex>

          <Grid gridTemplateColumns="repeat(auto-fit, minmax(200px, 400px))" gridGap={14}>
            <GridItem>
              <MiniPOAPCardItem
                id={11}
                description="POlka POAP team gathering at special place(s)."
                startDate={109276372}
                endDate={109276372}
                eventType="In-Person"
                url="https://polka.network"
                address={{ city: "Lagos", country: "Nigeria" }}
              />
            </GridItem>
            <GridItem>
              <MiniPOAPCardItem
                id={10}
                description="POlka POAP team gathering at special place(s)."
                startDate={109276372}
                endDate={109276372}
                eventType="Virtual"
                url="https://polka.network"
                address={{ city: "Lagos", country: "Nigeria" }}
              />
              </GridItem>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
