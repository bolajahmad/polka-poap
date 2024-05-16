import { IPOAPInformation } from "@/models/poap";
import { Avatar, Badge, Box, Link, Spacer, Stack, Text } from "@chakra-ui/react";
import { FiCalendar } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";

export const MiniPOAPCardItem = ({
  id,
  description,
  startDate,
  endDate,
  eventType,
  url,
  address,
}: Omit<IPOAPInformation, 'metadataCid' | 'eventId' | 'name' | 'timestamp' | 'mintDate' | 'blockNumber'>) => {

  return (
    <Box className="border rounded-xl border-[#473e6b]">
      <Stack p={8} as={Link} href={`/drop/${id}`}>
        <Box textAlign="center" bg="#f5f4ff" className="rounded-xl">
          <Avatar mx="auto" size="lg" />
          <Badge>
            {1} collector{true ? "s" : ""}
          </Badge>
        </Box>

        <Box>
          <Text className="text-[##79728D] block text-lg">ID {id}</Text>
          <Text className="overflow-hidden block text-[#473e6b] font-bold h-20">
            {description}
          </Text>
        </Box>

        <Spacer h={20} />

        <Box className="text-[#797292] text-md">
          <Text>
            <FiCalendar size={14} />
            {new Date(startDate).toLocaleString()} -{" "}
            {new Date(endDate).toLocaleString()}
          </Text>

          <Text>
            <MdLocationOn size={14} />
            {eventType === 'Virtual' ? url : address?.city + ", " + address?.country}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};
