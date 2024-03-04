/**
 * v0 by Vercel.
 * @see https://v0.dev/t/gSZXTwZ0vEs
 */
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import { PropsWithChildren } from "react"
import { AuthenticateUser } from "../(ui)/AuthenticateUser"

export function PageLayout({ children }: PropsWithChildren) {
    
  return (
    <Card key="1" className="w-full max-w-full">
      <CardHeader className="flex flex-col items-start p-6 bg-gray-100 dark:bg-gray-800">
        <div className="flex justify-between w-full">
          <div className="flex items-center">
            {true ? (
                <h1>Polka POAP</h1>
            ) : <Image 
                alt="Polka POAP Logo" 
                className="h-8 w-auto" 
                height={40} 
                width={40} 
                src="/placeholder.svg" 
            />}
            {/* <span className="text-sm font-semibold ml-2">Polka POAP</span> */}
          </div>
          <div>
            <AuthenticateUser />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  )
}

