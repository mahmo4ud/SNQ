import { db } from "@/config/db";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
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
    const item = await db.news.findUnique({
      where: { id },
      select: {
        id: true,
        titleAr: true,
        titleEn: true,
        contentAr: true,
        contentEn: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
        user: { select: { firstName: true, lastName: true } },
      },
    });

    if (!item) {
      return NextResponse.json(
        {
          code: 404,
          messageEn: "News not found",
          messageAr: "الخبر غير موجود",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      code: 200,
      messageEn: "News fetched successfully",
      messageAr: "تم جلب الخبر بنجاح",
      data: item,
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
