const express = require("express")
var cookieParser = require("cookie-parser")
var csrf = require("csurf")

const next = require("next")
const dev = process.env.NODE_ENV !== "production"
const nextApp = next({ dev })
const { parse } = require("url")
const handle = nextApp.getRequestHandler()

const bodyParser = require("body-parser")
const app = express()

nextApp.prepare().then(() => {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(cookieParser(process.env.COOKIE_PARSER_SECRET))
  app.use(csrf({ cookie: true }))

  app.get("*", function (req, res) {
    res.cookie("XSRF-TOKEN", req.csrfToken())
    const parsedUrl = parse(req.url, true)
    return handle(req, res, parsedUrl)
  })

  const csrfProtection = csrf({ cookie: true })
  app.post("/api/*", csrfProtection, function (req, res) {
    const parsedUrl = parse(req.url, true)
    return handle(req, res, parsedUrl)
  })

  app.listen(3000, (err) => {
    if (err) throw err
    console.log("> Ready on http://localhost:3000")
  })
})
