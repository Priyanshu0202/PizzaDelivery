import { NextResponse } from "next/server";
import dbConnect from "../../../../util/mongo";
import Product from "../../../../models/Product";

export async function GET() {
  await dbConnect();

  try {
    const products = await Product.find();
    return NextResponse.json(products, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    // Validate and sanitize the input body if necessary
    // For example:
    // if (!body.name || !body.price) {
    //   throw new Error("Missing required fields");
    // }

    const product = await Product.create(body);

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
