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
    const blog = await db.blog.findUnique({
      where: { id },
      select: {
        id: true,
        titleAr: true,
        titleEn: true,
        contentAr: true,
        contentEn: true,
        createdAt: true,
        user: {
          select: { firstName: true, lastName: true },
        },
      },
    });

    if (!blog) {
      return NextResponse.json(
        {
          code: 404,
          messageEn: "Blog not found",
          messageAr: "المقال غير موجود",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      code: 200,
      messageEn: "Blog fetched successfully",
      messageAr: "تم جلب المقال بنجاح",
      data: blog,
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
