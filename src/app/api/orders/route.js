import { NextResponse } from "next/server";
import dbConnect from "../../../../util/mongo";
import Order from "../../../../models/Order";

export async function GET(req) {
  await dbConnect();

  try {
    const orders = await Order.find();
    return new Response(JSON.stringify(orders), {
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

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const order = await Order.create(body);
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
