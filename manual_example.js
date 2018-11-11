const oauth2 = require("simple-oauth2");
const fetch = require("node-fetch");

const redditApiUrl = "https://www.reddit.com/api";

const authenticate = async (credentials, tokenConfig) => {
  const oauth2instance = oauth2.create(credentials);
  const result = await oauth2instance.clientCredentials.getToken(tokenConfig);
  const accessToken = oauth2instance.accessToken.create(result);
  return accessToken.token.access_token;
};

const requestFrontPage = async jwt => {
  const res = await fetch(`${redditApiUrl}/best`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      "user-agent": "linux:MRFIYXKkk3wj9Q:v1.0.0"
    }
  });
  return res.json();
};

const credentials = {
  client: {
    id: "MRFIYXKkk3wj9Q",
    secret: "WmK0R0pYkjacc4Eg8QITIF3bKq4"
  },
  auth: {
    authorizeHost: "https://www.reddit.com",
    authorizePath: "/api/v1/authorize",
    tokenHost: "https://www.reddit.com",
    tokenPath: "/api/v1/access_token"
  }
};

const tokenConfig = {
  scope: "read"
};

authenticate(credentials, tokenConfig)
  .then(requestFrontPage)
  .then(console.log)
  .catch(console.error);
