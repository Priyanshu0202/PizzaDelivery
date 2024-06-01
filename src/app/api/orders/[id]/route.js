import dbConnect from "../../../../../util/mongo";
import Order from "../../../../../models/Order";

export async function GET(req, { params }) {
  const { id } = params;
  await dbConnect();

  try {
    const orders = await Order.findById(id);
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

export async function PUT(req, { params }) {
  const { id } = params;

  await dbConnect();

  let body;
  try {
    body = await req.json();
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const order = await Order.findByIdAndUpdate(id, body, { new: true });

    if (!order) {
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(order), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
