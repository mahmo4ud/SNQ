import { db } from "@/config/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key_change_me";

export const POST = async (request: Request) => {
  const { email, password } = await request.json();

  try {
    const user = await db.user.findFirst({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        {
          code: 404,
          messageEn: "User not found",
          messageAr: "المستخدم غير موجود",
        },
        { status: 404 }
      );
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json(
        {
          code: 401,
          messageEn: "Invalid credentials",
          messageAr: "البيانات المدخلة غير صحيحة",
        },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return NextResponse.json({
      code: 200,
      messageEn: "Login successful",
      messageAr: "تم تسجيل الدخول بنجاح",
      token,
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
