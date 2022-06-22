"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
app_1.server.listen(app_1.server.get("port"), () => {
    console.log("Server on port", app_1.server.get("port"));
});
