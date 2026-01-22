import { NextResponse } from "next/server";

const HUBSPOT_PROPERTIES_URL = "https://api.hubapi.com/properties/v2/contacts/properties";
const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN; // Use your private app token

export async function GET() {
  try {
    const response = await fetch(HUBSPOT_PROPERTIES_URL, {
      headers: {
        Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching properties:", errorData);
      return NextResponse.json(errorData, { status: response.status });
    }

    const properties = await response.json();
    return NextResponse.json(properties, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
