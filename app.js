require("dotenv").config();

const express = require("express");
const app = express();
const env = process.env;
const path = require("path");
const PORT = env.PORT || 3000;
const querystring = require("querystring");

app
  .use(express.static(path.join(__dirname, "public")))
  .disable("etag")
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.render("pages/index"))
  .get("/debug", (req, res) =>
    res.send(console.log(env.LINE_CHANNEL_CHANNELID))
  )
  .get("/login", (req, res) => {
    const data = {
      response_type: "code",
      client_id: env.LINE_CHANNEL_CHANNELID,
      redirect_uri: env.URL,
      state: "hoge",
      scope: "profile",
    };
    const query = querystring.stringify(data);
    res.redirect(301, "https://access.line.me/oauth2/v2.1/authorize?" + query);
  })
  .get("/callback", (req, res) => {
    res.send("code: " + req.query.code);
  })
  .listen(PORT, () => console.log("STARTED: " + PORT));
