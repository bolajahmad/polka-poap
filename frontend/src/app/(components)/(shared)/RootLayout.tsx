/**
 * v0 by Vercel.
 * @see https://v0.dev/t/gSZXTwZ0vEs
 */
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button, Center, Flex, Link, Spacer } from "@chakra-ui/react"
import { PropsWithChildren } from "react"

export function PageLayout({ children }: PropsWithChildren) {
    
  return (
    <Card key="1" className="w-full h-screen max-w-full">
      <CardHeader className="flex flex-col items-start p-6 bg-gray-100 dark:bg-gray-800">
        <div className="flex justify-between w-full">
          <div className="flex items-center">
          <h1>Polka POAP</h1>
            {/* <span className="text-sm font-semibold ml-2">Polka POAP</span> */}
          </div>
          <div>
            <Flex>
              <Center>
                <Button colorScheme="teal" variant="outline">
                  <span>View Collections</span>
                </Button>
              </Center>

              <Spacer w="6" />

              <Center>
                <Button as={Link} href="/create-drop" colorScheme="teal">Create POAP</Button>
              </Center>
            </Flex>
            {/* <AuthenticateUser /> */}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 h-full">
        {children}
      </CardContent>
    </Card>
  )
}

