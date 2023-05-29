import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const { urlID } = req.query;

  try {
    const client = await clientPromise;
    const db = await client.db();
    const urls = await db.collection("urls");
    const result = await urls.findOneAndUpdate(
      { nanoId: urlID },
      {
        $inc: { clicks: 1 },
        $set: { lastClickedAt: new Date(), isActive: true },
      }
    );
    if (result.value) {
      res.status(200).json({
        ok: true,
        url: result.value.url,
      });
    } else {
      res.status(404).json({ error: "Url not found" });
    }
  } catch (error) {
    console.error("Error redirecting:", error);
    res.status(500).json({ error: "Error redirecting: Server error" });
  }
}
