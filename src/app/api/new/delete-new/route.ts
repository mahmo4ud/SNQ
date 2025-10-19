import { db } from "@/config/db";
import { verifyAuthToken } from "@/lib/verify-token";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const DELETE = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      {
        code: 400,
        messageEn: "Missing required query parameter: id",
        messageAr: "المعرف (id) مطلوب كمعامل استعلام",
      },
      { status: 400 }
    );
  }

  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          code: 401,
          messageEn: "No authorization token provided",
          messageAr: "لم يتم توفير رمز التوثيق",
        },
        { status: 401 }
      );
    }
    const token = authHeader.split(" ")[1];
    try {
      verifyAuthToken(token);
    } catch (err) {
      return NextResponse.json(
        {
          code: 401,
          messageEn: (err as Error).message || "Invalid or expired token",
          messageAr: "رمز التوثيق غير صالح أو منتهي الصلاحية",
        },
        { status: 401 }
      );
    }

    const existing = await db.news.findUnique({
      where: { id },
      select: { id: true, imageUrl: true },
    });

    if (!existing) {
      return NextResponse.json(
        {
          code: 404,
          messageEn: "News not found",
          messageAr: "الخبر غير موجود",
        },
        { status: 404 }
      );
    }

    try {
      if (existing.imageUrl) {
        const publicRoot = path.join(process.cwd(), "public");
        const relativeFromPublic = existing.imageUrl.startsWith("/")
          ? existing.imageUrl.slice(1)
          : existing.imageUrl;
        const absoluteImagePath = path.resolve(publicRoot, relativeFromPublic);

        const uploadsRoot = path.join(publicRoot, "uploads");
        if (absoluteImagePath.startsWith(path.resolve(uploadsRoot))) {
          if (fs.existsSync(absoluteImagePath)) {
            fs.unlinkSync(absoluteImagePath);
          }
        }
      }
    } catch {
      return NextResponse.json(
        {
          code: 500,
          messageEn: "Internal server error",
          messageAr: "خطأ في الخادم",
        },
        { status: 500 }
      );
    }

    await db.news.delete({ where: { id } });

    return NextResponse.json({
      code: 200,
      messageEn: "News deleted successfully",
      messageAr: "تم حذف الخبر بنجاح",
    });
  } catch (_error) {
    return NextResponse.json(
      {
        code: 500,
        messageEn: "Internal server error",
        messageAr: "خطأ في الخادم",
      },
      { status: 500 }
    );
  }
};
