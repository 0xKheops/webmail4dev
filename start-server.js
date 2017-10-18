const { startServer } = require("./server/server");

// client app in dev mode is configured to proxy 2581 port
startServer(25, 2581, "./data");