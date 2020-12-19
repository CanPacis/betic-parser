"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nearley_1 = __importDefault(require("nearley"));
var grammar_1 = __importDefault(require("./grammar"));
var BeticParser = /** @class */ (function () {
    function BeticParser() {
        this.parser = new nearley_1.default.Parser(nearley_1.default.Grammar.fromCompiled(grammar_1.default));
    }
    BeticParser.prototype.parse = function (input) {
        this.parser.feed(input);
        return this.parser.results[0];
    };
    return BeticParser;
}());
exports.default = BeticParser;
