"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var connectionString = process.env.DATABASE_URL || " ";
function connect() {
    return mysql_1.default.createConnection(connectionString);
}
exports.default = connect;
//# sourceMappingURL=connect.js.map