import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <>
      <main
        className={cn(
          "font-sora flex flex-col items-center text-center justify-center pt-40 pb-16 px-10"
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
            <button className="bg-gray-50 ring-1 ring-gray-200 hover:bg-gray-100 active:scale-95 active:bg-gray-200 text-sm font-medium px-5 py-3 rounded-lg duration-150">
              Get Started
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
