import clientPromise from "@/lib/mongodb";

export async function GET(request, res) {
  const { searchParams } = new URL(request.url);
  const urlID = searchParams.get("urlID");

  if (!urlID) {
    return new Response(
      JSON.stringify({
        error: "Url not found",
      }),
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }

  const client = await clientPromise;
  const db = await client.db();
  const urls = await db.collection("urls");
  const result = await urls.findOneAndUpdate(
    {
      nanoId: urlID,
    },
    {
      $inc: {
        clicks: 1,
      },
      $set: {
        lastClickedAt: new Date(),
        isActive: true,
      },
    }
  );

  if (result.value) {
    return new Response(
      JSON.stringify({
        ok: true,
        url: result.value.url,
      }),
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } else {
    return new Response(
      JSON.stringify({
        error: "Url not found",
      }),
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
}
