"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const DocsController_1 = require("@controllers/DocsController");
const routes = (0, express_1.Router)();
exports.routes = routes;
routes
    .get('/', DocsController_1.DocsController.docs);
