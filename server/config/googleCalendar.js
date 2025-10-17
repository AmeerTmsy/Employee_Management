
  //  Setup Google API client
  const { google } = require("googleapis");
  const Employee = require("../models/employeeModel");

  async function getOAuthClient(userId) {
    // 1. Find user in DB
    const user = await Employee.findById({_id: userId});
    // console.log(user)
    if (!user || !user.refreshToken) {
      throw new Error("User not connected with Google");
    }

    // 2. Create OAuth2 client
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "http://localhost:3000/api/auth/google/callback"
    );

    // 3. Set credentials
    oAuth2Client.setCredentials({ refresh_token: user.refreshToken });

    return oAuth2Client;
  }

  module.exports = { getOAuthClient };
