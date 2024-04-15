import Image from "next/image";
import Link from "next/link"
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import AstrologyForm from "@/components/astrologyForm";

export default function Home() {
  return (
      <div key="1" className="flex w-full min-h-screen flex-col">
        <div className="h-[60px] w-full bg-gray-100 border-b border-gray-200 dark:bg-gray-950 dark:border-gray-950/10">
          <div className="container flex h-[60px] w-full items-center px-4 md:px-6">
            <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 text-sm font-medium"
                href="#"
            >
              Home
            </Link>
            <nav className="flex-1 ml-6">
              <ul className="flex space-x-4">
                <li>
                  <Link className="text-sm font-medium transition-colors hover:underline" href="#">
                    Astro
                  </Link>
                </li>
                <li>
                  <Link className="text-sm font-medium transition-colors hover:underline" href="#">
                    Medium
                  </Link>
                </li>
              </ul>
            </nav>
            <Button size="sm" variant="outline">
              Upgrade
            </Button>
          </div>
        </div>
        <main className="flex-1 w-full">
          <div className="container grid gap-4 py-10 text-center px-6 md:px-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Astrology</h1>
              <p className="text-gray-500 dark:text-gray-400">Horoscopes, Zodiac Signs, and Celestial Events</p>
              <AstrologyForm />
            </div>
          </div>
        </main>
      </div>
  );
}
