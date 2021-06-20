const os = require("os")

const cluster = require("cluster")
const express = require("express")
const once = require("events")
const cookieParser = require("cookie-parser")
const csrf = require("csurf")

const next = require("next")
const dev = process.env.NODE_ENV !== "production"
const nextApp = next({ dev })
const { parse } = require("url")
const handle = nextApp.getRequestHandler()

const bodyParser = require("body-parser")
const app = express()
const numCPUs = app.get("env") === "development" ? 1 : os.cpus().length

if (cluster.isMaster) {
  console.log(`Clustering to ${numCPUs} processes`)
  for (let i = 0; i < numCPUs; i++) {
    console.log(`Master : Cluster Fork ${i}`)
    cluster.fork()
  }

  cluster.on("exit", (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(
        `Worker ${worker.process.pid} crashed. ` + "Starting a new worker"
      )
      cluster.fork()
    }
  })

  process.on("SIGUSR2", async () => {
    const workers = Object.values(cluster.workers)
    for (const worker of workers) {
      console.log(`Stopping worker: ${worker.process.pid}`)
      worker.disconnect()
      await once(worker, "exit")
      if (!worker.exitedAfterDisconnect) continue
      const newWorker = cluster.fork()
      await once(newWorker, "listening")
    }
  })
} else {
  const { pid } = process
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
      console.log(`> Ready on http://localhost:3000, PID: ${pid}`)
    })
  })
}
