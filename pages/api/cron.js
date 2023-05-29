import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const client = await clientPromise;
    const db = client.db();
    const urls = db.collection("urls");
    const result = await urls.updateMany(
      { isActive: true },
      { $set: { isActive: false } }
    );
    if (result.modifiedCount > 0) {
      console.log("Deactivated", result.modifiedCount, "urls");
      return res.status(200).json({
        ok: true,
        result: `Deactivated ${result.modifiedCount} urls`,
      });
    }
    return res.status(200).json({
      ok: true,
      result: `No urls deactivated`,
    });
  }
}
