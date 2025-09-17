import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";
import handleError from "@/lib/handlers/error";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file) {
      throw new Error("No file provided");
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Invalid file type. Only JPEG, PNG, and WebP are allowed.");
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error("File too large. Maximum size is 5MB.");
    }

    // Generate unique filename
    const fileExtension = path.extname(file.name);
    const fileName = `${crypto.randomUUID()}${fileExtension}`;
    
    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Process image with Sharp
    const optimizedBuffer = await sharp(buffer)
      .resize(1200, 800, { 
        fit: 'inside', 
        withoutEnlargement: true 
      })
      .jpeg({ 
        quality: 85,
        progressive: true 
      })
      .toBuffer();

    // Create thumbnail
    const thumbnailBuffer = await sharp(buffer)
      .resize(400, 300, { 
        fit: 'cover' 
      })
      .jpeg({ 
        quality: 80 
      })
      .toBuffer();

    // Save files
    const uploadsDir = path.join(process.cwd(), "public/uploads/posts");
    const imagePath = path.join(uploadsDir, fileName.replace(fileExtension, '.jpg'));
    const thumbnailPath = path.join(uploadsDir, `thumb_${fileName.replace(fileExtension, '.jpg')}`);

    await writeFile(imagePath, optimizedBuffer);
    await writeFile(thumbnailPath, thumbnailBuffer);

    // Return URLs
    const imageUrl = `/uploads/posts/${fileName.replace(fileExtension, '.jpg')}`;
    const thumbnailUrl = `/uploads/posts/thumb_${fileName.replace(fileExtension, '.jpg')}`;

    return NextResponse.json({
      success: true,
      data: {
        imageUrl,
        thumbnailUrl,
        originalName: file.name,
        size: optimizedBuffer.length,
      }
    });

  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}