import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

interface Props {
  params: { id: number };
}
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!product) {
    return NextResponse.json({ error: "Product Not Found" }, { status: 404 });
  }
  return NextResponse.json(product);
}
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 401 });
  }
  const exist = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!exist) {
    return NextResponse.json(
      { error: "Product Not Found please add this product" },
      { status: 404 }
    );
  }
  const updated = await prisma.product.update({
    where: { id: parseInt(params.id) },
    data: body,
  });
  return NextResponse.json(updated);
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!product) {
    return NextResponse.json(
      { error: "product does't exist" },
      { status: 401 }
    );
  }
  const d = await prisma.product.delete({ where: { id: parseInt(params.id) } });

  return NextResponse.json(d);
}
