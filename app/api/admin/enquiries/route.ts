import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getEnquiries, updateEnquiryStatus, createAuditLog } from "@/lib/db/repo";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || undefined;

  const enquiries = getEnquiries(status);
  return NextResponse.json({ enquiries });
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();
    if (!id || !["NEW", "IN_PROGRESS", "RESOLVED"].includes(status)) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    updateEnquiryStatus(id, status);

    createAuditLog({
      adminEmail: session.email,
      action: "ENQUIRY_STATUS_UPDATED",
      entity: "ENQUIRY",
      entityId: id,
      details: `Updated enquiry status to ${status}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error updating enquiry:", err);
    return NextResponse.json({ error: "Failed to update enquiry" }, { status: 500 });
  }
}
