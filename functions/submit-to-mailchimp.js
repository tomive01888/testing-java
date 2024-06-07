const fetch = require("node-fetch");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  // Parse the form data
  const formData = JSON.parse(event.body);

  // Mailchimp API details
  const mailchimpAPI = `https://us14.api.mailchimp.com/3.0/lists/8586e861b0/members/`;
  const apiKey = process.env.MAILCHIMP_API_KEY;

  // Construct the request
  const response = await fetch(mailchimpAPI, {
    method: "POST",
    headers: {
      Authorization: `apikey ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_address: formData.email,
      status: "subscribed",
      merge_fields: {
        FNAME: formData.name,
        MESSAGE: formData.message,
      },
    }),
  });

  // Handle response
  if (response.ok) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Subscription successful" }),
    };
  } else {
    const errorData = await response.json();
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Subscription failed", details: errorData }),
    };
  }
};
