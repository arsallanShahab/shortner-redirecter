"use client";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
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
        let redirectURL = "";
        if (data.ok) {
          // redirect to the url
          if (data.url.startsWith("http") || data.url.startsWith("https")) {
            redirectURL = data.url;
          } else {
            redirectURL = `https://${data.url}`;
          }

          router.push(redirectURL);
        } else {
          setError(data.error);
          console.log("Error redirecting:", data.error);
        }
      } catch (error) {
        setError(error);
        console.log("Error redirecting:", error);
      }
    };
    if (params.urlID) {
      handleRedirect();
    }
  }, [params.urlID]);

  return (
    <>
      <Head>
        <title>Redirecting...</title>
      </Head>
      <main className="flex h-screen justify-center items-center">
        {!error && (
          <div className="flex flex-row gap-5 items-center bg-[#ecf976] font-medium px-5 py-3 rounded-lg">
            <p className="font-semibold">Redirecting </p>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
          </div>
        )}
        {error && (
          <>
            <div className="flex flex-col items-center gap-5">
              <p className="font-semibold text-4xl">
                {error} <span>{"  "}</span>
              </p>
              <p>
                <a
                  href="/"
                  className="bg-[#ecf976] hover:opacity-80 active:scale-95 text-sm font-medium px-5 py-3 rounded-lg duration-150"
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
