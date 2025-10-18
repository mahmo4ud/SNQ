import { db } from "@/config/db";
import { verifyAuthToken } from "@/lib/verify-token";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const PATCH = async (request: Request) => {
  try {
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

    const body = await request.json();
    const { titleAr, titleEn, contentAr, contentEn, imageUrl } = body || {};

    const data: Partial<{
      titleAr: string;
      titleEn: string;
      contentAr: string;
      contentEn: string;
      imageUrl: string;
    }> = {};
    if (typeof titleAr === "string") data.titleAr = titleAr;
    if (typeof titleEn === "string") data.titleEn = titleEn;
    if (typeof contentAr === "string") data.contentAr = contentAr;
    if (typeof contentEn === "string") data.contentEn = contentEn;
    if (typeof imageUrl === "string") data.imageUrl = imageUrl;

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        {
          code: 400,
          messageEn: "No valid fields provided to update",
          messageAr: "لم يتم تقديم حقول صالحة للتعديل",
        },
        { status: 400 }
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

    if (
      typeof imageUrl === "string" &&
      imageUrl &&
      imageUrl !== existing.imageUrl
    ) {
      try {
        if (existing.imageUrl) {
          const publicRoot = path.join(process.cwd(), "public");
          const relativeFromPublic = existing.imageUrl.startsWith("/")
            ? existing.imageUrl.slice(1)
            : existing.imageUrl;
          const absoluteOldPath = path.resolve(publicRoot, relativeFromPublic);

          const uploadsRoot = path.resolve(publicRoot, "uploads");
          if (
            absoluteOldPath.startsWith(uploadsRoot) &&
            fs.existsSync(absoluteOldPath)
          ) {
            fs.unlinkSync(absoluteOldPath);
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
    }

    await db.news.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      code: 200,
      messageEn: "News updated successfully",
      messageAr: "تم تعديل الخبر بنجاح",
    });
  } catch (error) {
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
