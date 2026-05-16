import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("New Lead:", data);
    
    // In a real application, you would save this to a database or CRM here.
    
    return NextResponse.json({ success: true, message: "Lead captured successfully" });
  } catch (error) {
    console.error("Error processing lead:", error);
    return NextResponse.json({ success: false, error: "Failed to process lead" }, { status: 500 });
  }
}
