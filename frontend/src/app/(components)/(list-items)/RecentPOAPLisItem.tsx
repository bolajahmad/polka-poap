import { POAPActivity } from "@/models/poap";
import {
    Avatar,
    Badge,
    Box,
    Flex,
    Link,
    ListItem,
    Spacer,
    Stack,
    Text,
} from "@chakra-ui/react";
import NextLink from "next/link";

type RecentPOAPListItemProps = Omit<
  POAPActivity,
  "blockNumber" | "metadataCid" | 'name' | 'mintDate'
> & { avatar: string };

export const RecentPOAPItems = ({
  avatar,
  eventType,
  eventId,
}: RecentPOAPListItemProps) => {
  return (
    <ListItem>
      <Flex>
        <Box>
          <Avatar/>
        </Box>

        <Stack>
          <Flex gap={6}>
            <Badge className="capitalize">{eventType}</Badge>

            <Text className="text-gray-400 text-sm">7 minutes ago</Text>
          </Flex>
          <Spacer />
          <Text className="font-semibold text-sm">
            POAP {eventType} on drop{" "}
            <Link as={NextLink} href={`/drops/${eventId}`}>
              #{eventId}
            </Link>{" "}
            on Paseo
          </Text>
        </Stack>
      </Flex>
    </ListItem>
  );
};
