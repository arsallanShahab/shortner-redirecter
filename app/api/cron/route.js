import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = await client.db();
    const urls = await db.collection("urls");
    // update all the active urls to inactive
    const res = await urls.updateMany(
      {
        isActive: true,
      },
      {
        $set: {
          isActive: false,
        },
      }
    );
    if (res) {
      console.log("cron job ran successfully");
      return NextResponse.json({
        ok: true,
        message: "cron job ran successfully",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ ok: false, message: "cron job failed" });
  }
}
