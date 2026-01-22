import { NextResponse } from "next/server";

// const HUBSPOT_API_URL = "https://api.hubapi.com/crm/v3/objects/contacts";
const HUBSPOT_API_URL = "https://api.hubapi.com";
const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

export async function POST(request) {
   try {
      const contactData = await request.json(); // Parse the JSON body from the request
      const email = contactData.properties.email;

      if (!email) {
         return NextResponse.json({ message: "Email is required" }, { status: 400 });
      }

      // Step 1: Search for existing contact by email
      const searchResponse = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts/search`, {
         method: "POST",
         headers: {
            Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            filterGroups: [
               {
                  filters: [{ propertyName: "email", operator: "EQ", value: email }],
               },
            ],
         }),
      });

      const searchResult = await searchResponse.json();

      if (!searchResponse.ok) {
         return NextResponse.json(searchResult, { status: searchResponse.status });
      }

      // Step 2: Check if contact exists
      if (searchResult.total > 0) {
         const existingContactId = searchResult.results[0].id;

         // Update the contact
         const updateResponse = await fetch(
            `${HUBSPOT_API_URL}/crm/v3/objects/contacts/${existingContactId}`,
            {
               method: "PATCH",
               headers: {
                  Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(contactData),
            }
         );

         if (!updateResponse.ok) {
            const errorData = await updateResponse.json();
            return NextResponse.json(errorData, { status: updateResponse.status });
         }

         return NextResponse.json({ message: "Contact updated successfully" }, { status: 200 });
      } else {
         // Step 3: Create a new contact
         const createResponse = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts`, {
            method: "POST",
            headers: {
               Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
               "Content-Type": "application/json",
            },
            body: JSON.stringify(contactData),
         });

         if (!createResponse.ok) {
            const errorData = await createResponse.json();
            return NextResponse.json(errorData, { status: createResponse.status });
         }

         return NextResponse.json({ message: "Contact created successfully" }, { status: 201 });
      }
   } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
   }
}
