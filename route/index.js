const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/userRoutes")
const matchRoutes = require("./routes/matchRoutes")
const routes = {
    authRoutes,
    userRoutes,
    matchRoutes
}
module.exports = routes