import { db } from "@/config/db";
import { verifyAuthToken } from "@/lib/verify-token";
import { NextResponse } from "next/server";

export const PATCH = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const { titleAr, titleEn, contentAr, contentEn } = await request.json();

    if (!id) {
      return NextResponse.json(
        {
          code: 400,
          messageEn: "Missing required field: id",
          messageAr: "الحقل المطلوب (id) غير موجود",
        },
        { status: 400 }
      );
    }

    const authHeader = request.headers.get("authorization");
    console.log(authHeader);
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
    let payload;
    try {
      payload = verifyAuthToken(token);
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

    const data: Partial<{
      titleAr: string;
      titleEn: string;
      contentAr: string;
      contentEn: string;
    }> = {};

    if (typeof titleAr === "string") data.titleAr = titleAr;
    if (typeof titleEn === "string") data.titleEn = titleEn;
    if (typeof contentAr === "string") data.contentAr = contentAr;
    if (typeof contentEn === "string") data.contentEn = contentEn;

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

    const existing = await db.blog.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existing) {
      return NextResponse.json(
        {
          code: 404,
          messageEn: "Blog not found",
          messageAr: "المقال غير موجود",
        },
        { status: 404 }
      );
    }

    await db.blog.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      code: 200,
      messageEn: "Blog updated successfully",
      messageAr: "تم تعديل المقال بنجاح",
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
