import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold">Event Details</h1>
        <div className="grid gap-1 text-sm">
          <dl className="grid grid-cols-2 gap-1">
            <dt>Date</dt>
            <dd>March 22, 2023</dd>
            <dt>Time</dt>
            <dd>10:00 AM - 12:00 PM</dd>
            <dt>Location</dt>
            <dd>Virtual</dd>
          </dl>
        </div>
        <p className="mt-4 text-sm leading-loose md:text-base">
          This is a description of the event that the organizer has provided.
        </p>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-800" />
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <img
              alt="Avatar for Emma Lewis"
              className="rounded-full"
              height="40"
              src="/placeholder.svg"
              style={{
                aspectRatio: "40/40",
                objectFit: "cover",
              }}
              width="40"
            />
            <div>
              <h3 className="font-semibold">Emma Lewis</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">emma@example.com</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <img
              alt="Avatar for Alex Johnson"
              className="rounded-full"
              height="40"
              src="/placeholder.svg"
              style={{
                aspectRatio: "40/40",
                objectFit: "cover",
              }}
              width="40"
            />
            <div>
              <h3 className="font-semibold">Alex Johnson</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">alex@example.com</p>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-800" />
        <div className="mt-8 space-y-4">
          <Button>Mint Token</Button>
        </div>
    </main>
  );
}
