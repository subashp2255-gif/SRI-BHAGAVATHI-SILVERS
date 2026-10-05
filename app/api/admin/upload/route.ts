import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { createMediaItem } from "@/lib/db/repo";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const files: File[] = [];

    // Collect all uploaded files from form data
    const allFiles = formData.getAll("files");
    if (allFiles.length > 0) {
      for (const item of allFiles) {
        if (item instanceof File) {
          files.push(item);
        }
      }
    }

    const singleFile = formData.get("file");
    if (singleFile instanceof File && !files.includes(singleFile)) {
      files.push(singleFile);
    }

    if (files.length === 0) {
      return NextResponse.json({ error: "No image files provided" }, { status: 400 });
    }

    // Ensure destination directory exists
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const uploadedResults: Array<{ url: string; name: string; size: number }> = [];

    for (const file of files) {
      const originalName = file.name || "image.jpg";
      // Sanitize extension
      const extMatch = originalName.match(/\.([a-zA-Z0-9]+)$/);
      const ext = extMatch ? extMatch[1].toLowerCase() : "jpg";

      // Create safe unique filename
      const cleanBase = originalName
        .replace(/\.[^/.]+$/, "")
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, "_")
        .substring(0, 30);

      const uniqueFilename = `${cleanBase}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
      const filePath = path.join(uploadsDir, uniqueFilename);

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await fs.promises.writeFile(filePath, buffer);

      const publicUrl = `/uploads/${uniqueFilename}`;

      createMediaItem({
        name: originalName,
        url: publicUrl,
        fileType: file.type || `image/${ext}`,
        size: file.size || buffer.length,
      });

      uploadedResults.push({
        url: publicUrl,
        name: originalName,
        size: file.size,
      });
    }

    return NextResponse.json({
      success: true,
      url: uploadedResults[0]?.url,
      urls: uploadedResults.map((r) => r.url),
      files: uploadedResults,
    });
  } catch (err: any) {
    console.error("File upload error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to process image upload" },
      { status: 500 }
    );
  }
}
