import { db } from "@/config/db";
import { verifyAuthToken } from "@/lib/verify-token";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
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
    let payload: any;
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

    const body = await request.json();
    const { titleAr, titleEn, contentAr, contentEn, imageUrl } = body || {};

    if (
      !titleAr ||
      !titleEn ||
      !contentAr ||
      !contentEn ||
      !imageUrl ||
      typeof titleAr !== "string" ||
      typeof titleEn !== "string" ||
      typeof contentAr !== "string" ||
      typeof contentEn !== "string" ||
      typeof imageUrl !== "string"
    ) {
      return NextResponse.json(
        {
          code: 400,
          messageEn:
            "Missing or invalid fields: titleAr, titleEn, contentAr, contentEn, imageUrl are required as strings",
          messageAr:
            "حقول غير صحيحة أو مفقودة: titleAr, titleEn, contentAr, contentEn, imageUrl مطلوبة كنصوص",
        },
        { status: 400 }
      );
    }

    await db.news.create({
      data: {
        titleAr,
        titleEn,
        contentAr,
        contentEn,
        imageUrl,
        userId: payload.userId,
      },
    });

    return NextResponse.json(
      {
        code: 201,
        messageEn: "News created successfully",
        messageAr: "تم إنشاء الخبر بنجاح",
      },
      { status: 201 }
    );
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
