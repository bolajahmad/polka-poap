import { Box, Container, Stack } from "@chakra-ui/react";
import { POAPCard } from "../../(components)/(list-items)/POAPCard";
import { CollectorsTable } from "../../(tables)/collectors";

export default function DropByIDPage({ params }: { params: { slug: string } }) {
    const id = params.slug;
    return (
        <Container>
            <Stack>
                <POAPCard
                    id={id}
                    description="POlka POAP team gathering at special place(s)."
                    name="Polka Network Team Gathering"
                    website="https://polka.network"
                    startDate={109276372}
                    endDate={109276372}
                    eventType="In-Person"
                    url="https://polka.network"
                    address={{ city: "Lagos", country: "Nigeria" }}
                />

                <Box mt={20}>
                    <CollectorsTable />
                </Box>
            </Stack>
        </Container>
    )
}