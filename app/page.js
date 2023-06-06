import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main
        className={cn(
          "font-sora flex flex-col items-center text-center justify-center h-screen py-10 px-10"
        )}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <div className={cn("mb-4")}>
            <h1 className={cn("text-8xl font-bold tracking-tighter")}>
              <span className="color-effect">Shorten</span> your links
            </h1>
          </div>
          <div className={cn("mb-8")}>
            <p className="font-inter text-lg">
              Build and protect your brand using powerful, recognizable short
              links.
            </p>
          </div>
          <div className="flex flex-col gap-4 md:flex-row w-full items-center justify-center">
            <Link
              href={"https://shtr-shortner.vercel.app/"}
              className="bg-[#ecf976] hover:opacity-80 active:scale-95 text-sm font-medium px-5 py-3 rounded-lg duration-150"
            >
              Get Started
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
