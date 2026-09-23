import { NextResponse } from "next/server";
import { getAdminSession, hashPassword } from "@/lib/auth";
import { getAllAdmins, createAdmin, deleteAdmin, createAuditLog } from "@/lib/db/repo";

export async function GET() {
  const session = await getAdminSession();
  if (!session || session.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = getAllAdmins();
  return NextResponse.json({ users });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session || session.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { email, password, name, role } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, password, and name are required" }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);
    const user = createAdmin({
      email,
      passwordHash,
      name,
      role: role || "EDITOR",
    });

    createAuditLog({
      adminEmail: session.email,
      action: "ADMIN_USER_CREATED",
      entity: "ADMIN_USER",
      entityId: user?.id,
      details: `Created new admin user '${email}' with role ${role || "EDITOR"}`,
    });

    return NextResponse.json({ user });
  } catch (err) {
    console.error("Error creating admin user:", err);
    return NextResponse.json({ error: "Failed to create admin user" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getAdminSession();
  if (!session || session.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  if (id === session.id) {
    return NextResponse.json({ error: "Cannot delete your own admin account" }, { status: 400 });
  }

  deleteAdmin(id);

  createAuditLog({
    adminEmail: session.email,
    action: "ADMIN_USER_DELETED",
    entity: "ADMIN_USER",
    entityId: id,
    details: `Deleted admin user '${id}'`,
  });

  return NextResponse.json({ success: true });
}
