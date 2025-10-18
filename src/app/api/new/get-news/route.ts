import { db } from "@/config/db";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const items = await db.news.findMany({
      orderBy: { createdAt: "desc" },
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

    return NextResponse.json({
      code: 200,
      messageEn: "News fetched successfully",
      messageAr: "تم جلب الأخبار بنجاح",
      data: items,
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
