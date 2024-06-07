const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    console.log("Event Body:", event.body);

    let formData;
    if (typeof event.body === "string") {
      formData = JSON.parse(event.body);
    } else {
      formData = event.body; // Assuming it's already parsed
    }

    const mailchimpAPI = `https://us14.api.mailchimp.com/3.0/lists/8586e861b0/members/`;
    const apiKey = process.env.MAILCHIMP_API_KEY;

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
        },
      }),
    });

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
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error", details: error.message }),
    };
  }
};
