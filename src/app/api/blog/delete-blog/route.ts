import { db } from "@/config/db";
import { verifyAuthToken } from "@/lib/verify-token";
import { NextResponse } from "next/server";

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

    await db.blog.delete({
      where: { id },
    });

    return NextResponse.json({
      code: 200,
      messageEn: "Blog deleted successfully",
      messageAr: "تم حذف المقال بنجاح",
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
