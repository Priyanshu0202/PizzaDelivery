import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../../util/mongo";
import Product from "../../../../../models/Product";

export async function GET(req, { params }) {
  const { id } = params;
  await dbConnect();

  try {
    const products = await Product.findById(id);
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  await dbConnect();

  try {
    await Product.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "The product has been deleted!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Product deletion failed" },
      { status: 500 }
    );
  }
}
