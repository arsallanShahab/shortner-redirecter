import clientPromise from "@/lib/mongodb";

export async function GET(request, res) {
  const { searchParams } = new URL(request.url);
  const urlID = searchParams.get("urlID");
  console.log(`urlID: ${urlID}`);

  if (!urlID) {
    return new Response(
      JSON.stringify({
        error: `Missing urlID`,
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
  try {
    const client = await clientPromise;
    const db = client.db();
    const urls = db.collection("urls");

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
    console.log(`result: ${JSON.stringify(result)}`);
    const { value } = result;
    const { expiration: expirationDate } = value; //expire date is in this format 2023-06-23
    const today = new Date();
    const expiration = new Date(expirationDate);
    console.log(`today: ${today}`);
    console.log(`expiration: ${expiration}`);
    //return expirate message if expired
    if (today > expiration) {
      return new Response(
        JSON.stringify({
          error: "url expired",
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
          error: "url not found",
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
  } catch (error) {
    console.error("Error redirecting:", error);
    return new Response(
      JSON.stringify({
        ok: false,
        error: `Error redirecting: ${JSON.stringify(error)}}`,
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
