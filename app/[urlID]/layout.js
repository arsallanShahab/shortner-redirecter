import Head from "next/head";

export default function Layout({ params, children }) {
  return (
    <>
      <Head>
        <title>Redirecting...</title>
        <meta name="description" content="Redirecting..." />
      </Head>
      <main>{children}</main>
    </>
  );
}
