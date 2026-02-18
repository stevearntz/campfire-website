const HUBSPOT_BASE = "https://api.hubapi.com";

function getToken(): string {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) throw new Error("HUBSPOT_ACCESS_TOKEN is not configured");
  return token;
}

interface ContactFields {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  message: string;
}

/** Create or update a HubSpot contact by email. */
export async function upsertHubSpotContact(fields: ContactFields) {
  const token = getToken();

  // Search for existing contact by email
  const searchRes = await fetch(`${HUBSPOT_BASE}/crm/v3/objects/contacts/search`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filterGroups: [
        {
          filters: [
            { propertyName: "email", operator: "EQ", value: fields.email },
          ],
        },
      ],
    }),
  });

  if (!searchRes.ok) {
    throw new Error(`HubSpot search returned ${searchRes.status}`);
  }

  const searchData = await searchRes.json();
  const properties: Record<string, string> = {
    email: fields.email,
  };
  if (fields.firstName) properties.firstname = fields.firstName;
  if (fields.lastName) properties.lastname = fields.lastName;
  if (fields.company) properties.company = fields.company;

  if (searchData.total > 0) {
    // Update existing contact
    const contactId = searchData.results[0].id;
    const updateRes = await fetch(
      `${HUBSPOT_BASE}/crm/v3/objects/contacts/${contactId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ properties }),
      },
    );
    if (!updateRes.ok) {
      throw new Error(`HubSpot contact update returned ${updateRes.status}`);
    }
  } else {
    // Create new contact
    const createRes = await fetch(`${HUBSPOT_BASE}/crm/v3/objects/contacts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ properties }),
    });
    if (!createRes.ok) {
      throw new Error(`HubSpot contact creation returned ${createRes.status}`);
    }
  }
}
