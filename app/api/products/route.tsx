// import { error } from "console";
// import { NextRequest, NextResponse } from "next/server";
// import schema from "./schema";
// import prisma from "@/prisma/client";

// export async function GET(request: NextRequest) {
//   const user = await prisma.product.findMany();
//   return NextResponse.json(user);
// }
// export async function POST(request: NextRequest) {
//   const body = await request.json();
//   const validation = schema.safeParse(body);
//   console.log(body);
//   console.log(validation);

//   if (!validation.success) {
//     return NextResponse.json(validation.error.errors, { status: 400 });
//   }
//   const newUser = await prisma.product.create({ data: body });
//   return NextResponse.json(newUser);
// }
