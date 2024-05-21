import { IPOAPInformation } from "@/models/poap";
import { Avatar, Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { FiCalendar, FiDatabase } from "react-icons/fi";
import { MdLocationOn, MdSwapHoriz } from "react-icons/md";

export const POAPCard = ({
  id,
  name,
  startDate,
  description,
  endDate,
  eventType,
  url,
  website,
  address,
}: Omit<
  IPOAPInformation,
  "metadataCid" | "eventId" | "timestamp" | "blockNumber" | "mintDate"
>) => {
  return (
    <Box>
      <Flex>
        <Box>
          <Avatar size="xl" />
        </Box>

        <Box>
          <Stack>
            <Text>
              <span>
                Drop ID: <strong>${id}</strong>
              </span>
            </Text>

            <Box>
              <Heading>{name}</Heading>
              <Text>
                <FiCalendar size={14} />
                {new Date(startDate).toLocaleString()} -{" "}
                {new Date(endDate).toLocaleString()}
              </Text>

              <Text>
                <MdLocationOn size={14} />
                {eventType === "Virtual"
                  ? url
                  : address?.city + ", " + address?.country}
              </Text>
            </Box>

            <Text>{description}</Text>

            {website ? <Text>{website}</Text> : null}

            <Box>
              <Flex>
                <Flex>
                  <Text>
                    <FiDatabase size={14} />
                    {7} Supply
                  </Text>

                  <Text>
                    <MdSwapHoriz size={14} />
                    {7} Transfers
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};
