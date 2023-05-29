"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const router = useRouter();
  const [error, setError] = useState(null);
  const handleRedirect = async () => {
    try {
      const url = `api/redirect/?urlID=${params.urlID}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      console.log("response", response);
      const data = await response.json();
      if (data.ok) {
        router.push(data.url);
      } else {
        setError(data.error);
        console.log("Error redirecting:", data.error);
      }
    } catch (error) {
      setError(error);
      console.log("Error redirecting:", error);
    }
  };

  useEffect(() => {
    handleRedirect();
  }, []);

  return (
    <>
      <main className="my-5">
        {!error && <p>Redirecting...</p>}
        {error && (
          <>
            <div className="flex flex-row gap-5">
              <p className="font-semibold text-xl">
                {JSON.stringify(error)} <span>{"  "}</span>
              </p>
              <p>
                <a
                  href="/"
                  className="bg-gray-50 ring-1 ring-gray-200 hover:bg-gray-100 active:scale-95 active:bg-gray-200 text-sm font-medium px-3 py-1.5 rounded-lg duration-150"
                >
                  Go back home &rarr;
                </a>
              </p>
            </div>
          </>
        )}
      </main>
    </>
  );
}
