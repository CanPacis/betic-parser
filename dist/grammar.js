"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Generated automatically by nearley, version 2.19.3
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d) { return d[0]; }
var moo_1 = __importDefault(require("moo"));
var lexer = moo_1.default.compile({
    WhiteSpace: { match: /[ \t\n\r]+/, lineBreaks: true },
    NumberLiteral: {
        match: /-?[0-9]+(?:\.[0-9]+)?/,
    },
    BinaryLiteral: {
        match: /-?@b[0-1]+/
    },
    HexLiteral: {
        match: /-?@x[0-9a-fA-F]+/
    },
    OctalLiteral: {
        match: /-?@o[0-7]+/
    },
    Dot: ".",
    Colon: ":",
    SemiColon: ";",
    Comma: ",",
    LeftParens: "(",
    RightParens: ")",
    LeftCurlyBrackets: "{",
    RightCurlyBrackets: "}",
    LeftBrackets: "[",
    RightBrackets: "]",
    Plus: "+",
    Minus: "-",
    Multiplier: "*",
    Pound: "#",
    Divider: "/",
    Power: "^",
    QuestionMark: "?",
    Apostrophe: "'",
    Percent: "%",
    ConditionSign: {
        match: /!?(?:&&|\|\||<=|>=|<|>|==)/,
    },
    Ampersand: "&",
    EqualsTo: "=",
    Bar: "|",
    StringLiteral: {
        match: /"(?:[^\n\\"]|\\["\\ntbfr])*"/,
        value: function (s) { return JSON.parse(s); }
    },
    BooleanLiteral: {
        match: /true|false/,
    },
    VariableType: {
        match: /Int|Double|String|Boolean|Occult|Void/
    },
    Identifier: {
        match: /[a-zA-Z_][a-zA-Z_0-9]*/,
        type: moo_1.default.keywords({
            Import: "import",
            Func: "func",
            Micro: "micro",
            Macro: "macro",
            Define: "define",
            Expected: "expected",
            As: "as",
            If: "if",
            Elif: "elif",
            Else: "else",
            For: "for",
            Try: "try",
            Catch: "catch",
            Provide: "provide",
            None: "none",
            Switch: "switch",
            Case: "case",
            Constant: "const"
        })
    }
});
function getCondition(condition) {
    switch (condition) {
        case "&&":
            return "and";
        case "||":
            return "or";
        case "<":
            return "less_than";
        case ">":
            return "greater_than";
        case "<=":
            return "less_than_equals";
        case ">=":
            return "greater_than_equals";
        case "==":
            return "equals";
        case "!&&":
            return "nand";
        case "!||":
            return "nor";
        case "!<":
            return "not_less_than";
        case "!>":
            return "not_greater_than";
        case "!<=":
            return "not_less_than_equals";
        case "!>=":
            return "not_greater_than_equals";
        case "!==":
            return "not_equals";
    }
}
function arithmetic(type, data) {
    return {
        operation: "arithmetic",
        type: type,
        left: data[0],
        right: data[4],
        position: data[0].position
    };
}
function primitive(type, data) {
    return __assign({ operation: "primitive", type: type }, data);
}
function type(base, of) {
    return { base: base, of: of };
}
function position(data) {
    return { line: data.line, col: data.col };
}
;
;
;
;
var grammar = {
    Lexer: lexer,
    ParserRules: [
        { "name": "Program$ebnf$1", "symbols": [] },
        { "name": "Program$ebnf$1$subexpression$1", "symbols": ["Import", "_"], "postprocess": id },
        { "name": "Program$ebnf$1", "symbols": ["Program$ebnf$1", "Program$ebnf$1$subexpression$1"], "postprocess": function (d) { return d[0].concat([d[1]]); } },
        { "name": "Program$ebnf$2", "symbols": [] },
        { "name": "Program$ebnf$2$subexpression$1", "symbols": ["Main", "_"], "postprocess": id },
        { "name": "Program$ebnf$2", "symbols": ["Program$ebnf$2", "Program$ebnf$2$subexpression$1"], "postprocess": function (d) { return d[0].concat([d[1]]); } },
        { "name": "Program$ebnf$3$subexpression$1", "symbols": ["TemplateWrapper", "_"], "postprocess": id },
        { "name": "Program$ebnf$3", "symbols": ["Program$ebnf$3$subexpression$1"], "postprocess": id },
        { "name": "Program$ebnf$3", "symbols": [], "postprocess": function () { return null; } },
        { "name": "Program", "symbols": ["_", "Program$ebnf$1", "Program$ebnf$2", "Program$ebnf$3"], "postprocess": function (d) { return ({ imports: d[1], program: d[2], template: d[3] || [] }); } },
        { "name": "Import$ebnf$1$subexpression$1", "symbols": ["_", { "literal": "as" }, "__", "Identifier"], "postprocess": function (d) { return d[3].value; } },
        { "name": "Import$ebnf$1", "symbols": ["Import$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "Import$ebnf$1", "symbols": [], "postprocess": function () { return null; } },
        { "name": "Import", "symbols": [{ "literal": "import" }, "__", "String", "Import$ebnf$1"], "postprocess": function (d) { return ({
                source: { value: d[2].value, position: d[2].position },
                as: d[3],
                position: position(d[0])
            }); } },
        { "name": "Provide$ebnf$1$subexpression$1", "symbols": ["__", "Expression"], "postprocess": function (d) { return d[1]; } },
        { "name": "Provide$ebnf$1", "symbols": ["Provide$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "Provide$ebnf$1", "symbols": [], "postprocess": function () { return null; } },
        { "name": "Provide", "symbols": [{ "literal": "provide" }, "Provide$ebnf$1"], "postprocess": function (d) { return ({
                body: d[1],
                position: position(d[0])
            }); } },
        { "name": "TemplateWrapper$ebnf$1", "symbols": [] },
        { "name": "TemplateWrapper$ebnf$1$subexpression$1", "symbols": ["Template", "_"], "postprocess": id },
        { "name": "TemplateWrapper$ebnf$1", "symbols": ["TemplateWrapper$ebnf$1", "TemplateWrapper$ebnf$1$subexpression$1"], "postprocess": function (d) { return d[0].concat([d[1]]); } },
        { "name": "TemplateWrapper", "symbols": [{ "literal": "&" }, "_", { "literal": "{" }, "_", "TemplateWrapper$ebnf$1", { "literal": "}" }], "postprocess": function (d) { return d[4]; } },
        { "name": "Template", "symbols": ["Tag"], "postprocess": id },
        { "name": "Template", "symbols": ["TemplateIfStatement"], "postprocess": id },
        { "name": "Template", "symbols": ["TemplateForStatement"], "postprocess": id },
        { "name": "Template", "symbols": ["TemplateSwitchStatement"], "postprocess": id },
        { "name": "Template", "symbols": ["Comment"], "postprocess": id },
        { "name": "Tag$ebnf$1", "symbols": [] },
        { "name": "Tag$ebnf$1$subexpression$1", "symbols": ["AttributeList", "_"], "postprocess": id },
        { "name": "Tag$ebnf$1", "symbols": ["Tag$ebnf$1", "Tag$ebnf$1$subexpression$1"], "postprocess": function (d) { return d[0].concat([d[1]]); } },
        { "name": "Tag$ebnf$2$subexpression$1$ebnf$1", "symbols": [] },
        { "name": "Tag$ebnf$2$subexpression$1$ebnf$1$subexpression$1$subexpression$1", "symbols": ["Expression"], "postprocess": id },
        { "name": "Tag$ebnf$2$subexpression$1$ebnf$1$subexpression$1$subexpression$1", "symbols": ["Template"], "postprocess": id },
        { "name": "Tag$ebnf$2$subexpression$1$ebnf$1$subexpression$1", "symbols": ["Tag$ebnf$2$subexpression$1$ebnf$1$subexpression$1$subexpression$1", "_"], "postprocess": id },
        { "name": "Tag$ebnf$2$subexpression$1$ebnf$1", "symbols": ["Tag$ebnf$2$subexpression$1$ebnf$1", "Tag$ebnf$2$subexpression$1$ebnf$1$subexpression$1"], "postprocess": function (d) { return d[0].concat([d[1]]); } },
        { "name": "Tag$ebnf$2$subexpression$1", "symbols": ["_", { "literal": "(" }, "_", "Tag$ebnf$2$subexpression$1$ebnf$1", { "literal": ")" }], "postprocess": function (d) { return d[3]; } },
        { "name": "Tag$ebnf$2", "symbols": ["Tag$ebnf$2$subexpression$1"], "postprocess": id },
        { "name": "Tag$ebnf$2", "symbols": [], "postprocess": function () { return null; } },
        { "name": "Tag", "symbols": ["Identifier", "_", { "literal": "-" }, { "literal": ">" }, "_", { "literal": "{" }, "_", "Tag$ebnf$1", { "literal": "}" }, "Tag$ebnf$2"], "postprocess": function (d) { return ({
                operation: "tag",
                name: d[0].value,
                attributes: d[7][0],
                body: d[9] || [],
                position: position(d[0])
            }); } },
        { "name": "AttributeList", "symbols": ["Attribute", "_", { "literal": "," }, "_", "AttributeList"], "postprocess": function (d) { return __spreadArrays([d[0]], d[4]); } },
        { "name": "AttributeList", "symbols": ["Attribute"], "postprocess": function (d) { return [d[0]]; } },
        { "name": "Attribute$subexpression$1", "symbols": ["Identifier"], "postprocess": id },
        { "name": "Attribute$subexpression$1", "symbols": ["AttributeKeyword"], "postprocess": id },
        { "name": "Attribute$ebnf$1$subexpression$1", "symbols": [{ "literal": "=" }, "Expression"], "postprocess": function (d) { return d[1]; } },
        { "name": "Attribute$ebnf$1", "symbols": ["Attribute$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "Attribute$ebnf$1", "symbols": [], "postprocess": function () { return null; } },
        { "name": "Attribute", "symbols": ["Attribute$subexpression$1", "Attribute$ebnf$1"], "postprocess": function (d) { return ({
                key: d[0].value,
                value: d[1] || {
                    operation: "reference",
                    value: d[0].value,
                    position: position(d[0])
                },
                position: position(d[0])
            }); } },
        { "name": "AttributeKeyword", "symbols": [{ "literal": "try" }], "postprocess": id },
        { "name": "Main", "symbols": ["VariableDefinition"], "postprocess": id },
        { "name": "Main", "symbols": ["TypeDefinition"], "postprocess": id },
        { "name": "Main", "symbols": ["Expression"], "postprocess": id },
        { "name": "Main", "symbols": ["MicroDefinition"], "postprocess": id },
        { "name": "Main", "symbols": ["MacroDefinition"], "postprocess": id },
        { "name": "Main", "symbols": ["FunctionDefinition"], "postprocess": id },
        { "name": "Main", "symbols": ["ForStatement"], "postprocess": id },
        { "name": "Main", "symbols": ["IfStatement"], "postprocess": id },
        { "name": "Main", "symbols": ["SwitchStatement"], "postprocess": id },
        { "name": "Main", "symbols": ["AssignStatement"], "postprocess": id },
        { "name": "Main", "symbols": ["QuantityModifier"], "postprocess": id },
        { "name": "Main", "symbols": ["TryCatch"], "postprocess": id },
        { "name": "Main", "symbols": ["Comment"], "postprocess": id },
        { "name": "TryCatch", "symbols": [{ "literal": "try" }, "_", "CodeBlock", "_", { "literal": "catch" }, "_", "FunctionArguments", "_", "CodeBlock"], "postprocess": function (d) { return ({
                operation: "try_catch_block",
                tries: d[2].block,
                catches: d[8].block,
                arguments: d[6].data
            }); } },
        { "name": "QuantityModifier", "symbols": ["Mutatable", { "literal": "+" }, { "literal": "+" }], "postprocess": function (d) { return ({ operation: "quantity_modifier", type: "increment", statement: d[0], position: d[0].position }); } },
        { "name": "QuantityModifier", "symbols": ["Mutatable", { "literal": "-" }, { "literal": "-" }], "postprocess": function (d) { return ({ operation: "quantity_modifier", type: "decrement", statement: d[0], position: d[0].position }); } },
        { "name": "QuantityModifier", "symbols": ["Mutatable", "_", { "literal": "+" }, { "literal": "=" }, "_", "Expression"], "postprocess": function (d) { return ({ operation: "quantity_modifier", type: "add", statement: d[0], right: d[5], position: d[0].position }); } },
        { "name": "QuantityModifier", "symbols": ["Mutatable", "_", { "literal": "-" }, { "literal": "=" }, "_", "Expression"], "postprocess": function (d) { return ({ operation: "quantity_modifier", type: "subtract", statement: d[0], right: d[5], position: d[0].position }); } },
        { "name": "QuantityModifier", "symbols": ["Mutatable", "_", { "literal": "*" }, { "literal": "=" }, "_", "Expression"], "postprocess": function (d) { return ({ operation: "quantity_modifier", type: "multiply", statement: d[0], right: d[5], position: d[0].position }); } },
        { "name": "QuantityModifier", "symbols": ["Mutatable", "_", { "literal": "/" }, { "literal": "=" }, "_", "Expression"], "postprocess": function (d) { return ({ operation: "quantity_modifier", type: "divide", statement: d[0], right: d[5], position: d[0].position }); } },
        { "name": "AssignStatement", "symbols": ["Mutatable", "_", { "literal": "=" }, "_", "Expression"], "postprocess": function (d) { return ({
                operation: "assign_statement",
                left: d[0],
                right: d[4],
                position: d[0].position
            }); } },
        { "name": "SwitchStatement$ebnf$1", "symbols": [] },
        { "name": "SwitchStatement$ebnf$1$subexpression$1", "symbols": [{ "literal": "case" }, "__", "Expression", "_", "CodeBlock", "_"], "postprocess": function (d) { return ({ case: d[2], body: d[4] }); } },
        { "name": "SwitchStatement$ebnf$1", "symbols": ["SwitchStatement$ebnf$1", "SwitchStatement$ebnf$1$subexpression$1"], "postprocess": function (d) { return d[0].concat([d[1]]); } },
        { "name": "SwitchStatement", "symbols": [{ "literal": "switch" }, "__", "Expression", "_", { "literal": "{" }, "_", "SwitchStatement$ebnf$1", { "literal": "}" }], "postprocess": function (d) { return ({
                operation: "switch_statement",
                condition: d[2],
                cases: d[6],
                position: position(d[0])
            }); } },
        { "name": "TemplateSwitchStatement$ebnf$1", "symbols": [] },
        { "name": "TemplateSwitchStatement$ebnf$1$subexpression$1", "symbols": [{ "literal": "case" }, "__", "Expression", "_", "TemplateBlock", "_"], "postprocess": function (d) { return ({ case: d[2], body: d[4] }); } },
        { "name": "TemplateSwitchStatement$ebnf$1", "symbols": ["TemplateSwitchStatement$ebnf$1", "TemplateSwitchStatement$ebnf$1$subexpression$1"], "postprocess": function (d) { return d[0].concat([d[1]]); } },
        { "name": "TemplateSwitchStatement", "symbols": [{ "literal": "switch" }, "__", "Expression", "_", { "literal": "{" }, "_", "TemplateSwitchStatement$ebnf$1", { "literal": "}" }], "postprocess": function (d) { return ({
                operation: "switch_statement",
                condition: d[2],
                cases: d[6],
                position: position(d[0])
            }); } },
        { "name": "IfStatement$ebnf$1", "symbols": [] },
        { "name": "IfStatement$ebnf$1$subexpression$1", "symbols": ["_", { "literal": "elif" }, "__", "Expression", "_", "CodeBlock"], "postprocess": function (d) { return ({ condition: d[3], body: d[5] }); } },
        { "name": "IfStatement$ebnf$1", "symbols": ["IfStatement$ebnf$1", "IfStatement$ebnf$1$subexpression$1"], "postprocess": function (d) { return d[0].concat([d[1]]); } },
        { "name": "IfStatement$ebnf$2$subexpression$1", "symbols": ["_", { "literal": "else" }, "_", "CodeBlock"], "postprocess": function (d) { return d[3]; } },
        { "name": "IfStatement$ebnf$2", "symbols": ["IfStatement$ebnf$2$subexpression$1"], "postprocess": id },
        { "name": "IfStatement$ebnf$2", "symbols": [], "postprocess": function () { return null; } },
        { "name": "IfStatement", "symbols": [{ "literal": "if" }, "__", "Expression", "_", "CodeBlock", "IfStatement$ebnf$1", "IfStatement$ebnf$2"], "postprocess": function (d) { return ({
                operation: "if_statement",
                condition: d[2],
                body: d[4],
                elifs: d[5],
                else: d[6],
                position: position(d[0])
            }); } },
        { "name": "TemplateIfStatement$ebnf$1", "symbols": [] },
        { "name": "TemplateIfStatement$ebnf$1$subexpression$1", "symbols": ["_", { "literal": "elif" }, "__", "Expression", "_", "TemplateBlock"], "postprocess": function (d) { return ({ condition: d[3], body: d[5] }); } },
        { "name": "TemplateIfStatement$ebnf$1", "symbols": ["TemplateIfStatement$ebnf$1", "TemplateIfStatement$ebnf$1$subexpression$1"], "postprocess": function (d) { return d[0].concat([d[1]]); } },
        { "name": "TemplateIfStatement$ebnf$2$subexpression$1", "symbols": ["_", { "literal": "else" }, "_", "TemplateBlock"], "postprocess": function (d) { return d[3]; } },
        { "name": "TemplateIfStatement$ebnf$2", "symbols": ["TemplateIfStatement$ebnf$2$subexpression$1"], "postprocess": id },
        { "name": "TemplateIfStatement$ebnf$2", "symbols": [], "postprocess": function () { return null; } },
        { "name": "TemplateIfStatement", "symbols": [{ "literal": "if" }, "__", "Expression", "_", "TemplateBlock", "TemplateIfStatement$ebnf$1", "TemplateIfStatement$ebnf$2"], "postprocess": function (d) { return ({
                operation: "if_statement",
                condition: d[2],
                body: d[4],
                elifs: d[5],
                else: d[6],
                position: position(d[0])
            }); } },
        { "name": "ForStatement", "symbols": [{ "literal": "for" }, "__", "Expression", "__", { "literal": "as" }, "__", "Identifier", "_", "CodeBlock"], "postprocess": function (d) { return ({
                operation: "for_statement",
                statement: d[2],
                placeholder: d[6].value,
                body: d[8],
                position: position(d[0])
            }); } },
        { "name": "TemplateForStatement", "symbols": [{ "literal": "for" }, "__", "Expression", "__", { "literal": "as" }, "__", "Identifier", "_", "TemplateBlock"], "postprocess": function (d) { return ({
                operation: "for_statement",
                statement: d[2],
                placeholder: d[6].value,
                body: d[8],
                position: position(d[0])
            }); } },
        { "name": "TypeDefinition$ebnf$1$subexpression$1", "symbols": ["TypedIdentifierList", "_"], "postprocess": id },
        { "name": "TypeDefinition$ebnf$1", "symbols": ["TypeDefinition$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "TypeDefinition$ebnf$1", "symbols": [], "postprocess": function () { return null; } },
        { "name": "TypeDefinition", "symbols": [{ "literal": "define" }, "__", "Identifier", "_", { "literal": "{" }, "_", "TypeDefinition$ebnf$1", { "literal": "}" }], "postprocess": function (d) { return ({
                operation: "type_definition",
                name: d[2].value,
                body: d[6] || [],
                position: position(d[0])
            }); } },
        { "name": "VariableDefinition$subexpression$1", "symbols": [{ "literal": "const" }, "__"], "postprocess": id },
        { "name": "VariableDefinition$subexpression$1", "symbols": [{ "literal": "var" }, "__"], "postprocess": id },
        { "name": "VariableDefinition$ebnf$1$subexpression$1", "symbols": [{ "literal": "expected" }, "__"], "postprocess": id },
        { "name": "VariableDefinition$ebnf$1", "symbols": ["VariableDefinition$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "VariableDefinition$ebnf$1", "symbols": [], "postprocess": function () { return null; } },
        { "name": "VariableDefinition", "symbols": ["VariableDefinition$subexpression$1", "VariableDefinition$ebnf$1", "Identifier", "_", { "literal": ":" }, { "literal": "=" }, "_", "Expression"], "postprocess": function (d) { return ({
                operation: "variable_definition",
                constant: d[0].value === "const",
                expected: d[1] !== null,
                name: d[2].value,
                value: d[7],
                position: position(d[0])
            }); } },
        { "name": "FunctionDefinition", "symbols": [{ "literal": "func" }, "_", { "literal": "-" }, { "literal": ">" }, "_", "VariableType", "__", "Identifier", "_", "FunctionArguments", "_", "CodeBlock"], "postprocess": function (d) { return ({
                operation: "function_definition",
                type: d[5],
                name: d[7].value,
                arguments: d[9].data,
                body: d[11],
                position: position(d[0])
            }); } },
        { "name": "MicroDefinition", "symbols": [{ "literal": "micro" }, "_", { "literal": "-" }, { "literal": ">" }, "_", "VariableType", "__", "Identifier", "__", "TypedIdentifier", "_", "CodeBlock"], "postprocess": function (d) { return ({
                operation: "micro_definition",
                type: d[5],
                name: d[7].value,
                prototype: d[9],
                body: d[11],
                position: position(d[0])
            }); } },
        { "name": "MacroDefinition", "symbols": [{ "literal": "macro" }, "_", { "literal": "-" }, { "literal": ">" }, "_", "VariableType", "__", "Identifier", "__", "TypedIdentifier", "_", "FunctionArguments", "_", "CodeBlock"], "postprocess": function (d) { return ({
                operation: "macro_definition",
                type: d[5],
                name: d[7].value,
                prototype: d[9],
                arguments: d[11].data,
                body: d[13],
                position: position(d[0])
            }); } },
        { "name": "Comment$ebnf$1", "symbols": [] },
        { "name": "Comment$ebnf$1", "symbols": ["Comment$ebnf$1", /[^#]/], "postprocess": function (d) { return d[0].concat([d[1]]); } },
        { "name": "Comment", "symbols": [{ "literal": "#" }, "Comment$ebnf$1", { "literal": "#" }], "postprocess": function (d) {
                var _a;
                return ({
                    operation: "comment",
                    value: (_a = d[1]) === null || _a === void 0 ? void 0 : _a.map(function (d) { return d.value; }).join(""),
                    position: position(d[0])
                });
            } },
        { "name": "CodeBlock$ebnf$1", "symbols": [] },
        { "name": "CodeBlock$ebnf$1$subexpression$1", "symbols": ["Main", "_"], "postprocess": id },
        { "name": "CodeBlock$ebnf$1", "symbols": ["CodeBlock$ebnf$1", "CodeBlock$ebnf$1$subexpression$1"], "postprocess": function (d) { return d[0].concat([d[1]]); } },
        { "name": "CodeBlock$ebnf$2$subexpression$1", "symbols": ["Provide", "_"], "postprocess": id },
        { "name": "CodeBlock$ebnf$2", "symbols": ["CodeBlock$ebnf$2$subexpression$1"], "postprocess": id },
        { "name": "CodeBlock$ebnf$2", "symbols": [], "postprocess": function () { return null; } },
        { "name": "CodeBlock", "symbols": [{ "literal": "{" }, "_", "CodeBlock$ebnf$1", "CodeBlock$ebnf$2", { "literal": "}" }], "postprocess": function (d) { return ({ block: d[2], provides: d[3] }); } },
        { "name": "TemplateBlock$ebnf$1", "symbols": [] },
        { "name": "TemplateBlock$ebnf$1$subexpression$1", "symbols": ["Template", "_"], "postprocess": id },
        { "name": "TemplateBlock$ebnf$1", "symbols": ["TemplateBlock$ebnf$1", "TemplateBlock$ebnf$1$subexpression$1"], "postprocess": function (d) { return d[0].concat([d[1]]); } },
        { "name": "TemplateBlock", "symbols": [{ "literal": "{" }, "_", "TemplateBlock$ebnf$1", { "literal": "}" }], "postprocess": function (d) { return ({ block: d[2] }); } },
        { "name": "FunctionArguments$ebnf$1$subexpression$1", "symbols": ["TypedIdentifierList", "_"], "postprocess": id },
        { "name": "FunctionArguments$ebnf$1", "symbols": ["FunctionArguments$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "FunctionArguments$ebnf$1", "symbols": [], "postprocess": function () { return null; } },
        { "name": "FunctionArguments", "symbols": [{ "literal": "(" }, "_", "FunctionArguments$ebnf$1", { "literal": ")" }], "postprocess": function (d) { return (__assign({ data: d[2] || [] }, position(d[0]))); } },
        { "name": "Mutatable", "symbols": ["VariableReference"], "postprocess": id },
        { "name": "Mutatable", "symbols": ["MapValueGetter"], "postprocess": id },
        { "name": "Mutatable", "symbols": ["ListValueGetter"], "postprocess": id },
        { "name": "Expression", "symbols": ["Conditions"], "postprocess": id },
        { "name": "Expression", "symbols": ["Arithmetic"], "postprocess": id },
        { "name": "Arithmetic", "symbols": ["Arithmetic", "_", { "literal": "+" }, "_", "MultDiv"], "postprocess": function (d) { return arithmetic("addition", d); } },
        { "name": "Arithmetic", "symbols": ["Arithmetic", "_", { "literal": "-" }, "_", "MultDiv"], "postprocess": function (d) { return arithmetic("subtraction", d); } },
        { "name": "Arithmetic", "symbols": ["MultDiv"], "postprocess": id },
        { "name": "MultDiv", "symbols": ["MultDiv", "_", { "literal": "*" }, "_", "Exponent"], "postprocess": function (d) { return arithmetic("multiplication", d); } },
        { "name": "MultDiv", "symbols": ["MultDiv", "_", { "literal": "/" }, "_", "Exponent"], "postprocess": function (d) { return arithmetic("division", d); } },
        { "name": "MultDiv", "symbols": ["Exponent"], "postprocess": id },
        { "name": "Exponent", "symbols": ["MVG_FC", "_", { "literal": "^" }, "_", "Exponent"], "postprocess": function (d) { return arithmetic("exponent", d); } },
        { "name": "Exponent", "symbols": ["MVG_FC", "_", { "literal": "'" }, "_", "Exponent"], "postprocess": function (d) { return arithmetic("root", d); } },
        { "name": "Exponent", "symbols": ["MVG_FC", "_", { "literal": "%" }, "_", "Exponent"], "postprocess": function (d) { return arithmetic("modulus", d); } },
        { "name": "Exponent", "symbols": ["MVG_FC"], "postprocess": id },
        { "name": "MVG_FC", "symbols": ["MapValueGetter"], "postprocess": id },
        { "name": "MVG_FC", "symbols": ["ListValueGetter"], "postprocess": id },
        { "name": "MVG_FC", "symbols": ["FunctionCall"], "postprocess": id },
        { "name": "MVG_FC", "symbols": ["MicroCall"], "postprocess": id },
        { "name": "MVG_FC", "symbols": ["MacroCall"], "postprocess": id },
        { "name": "MVG_FC", "symbols": ["SubExpression"], "postprocess": id },
        { "name": "MapValueGetter", "symbols": ["MVG_FC", { "literal": ":" }, "SubExpression"], "postprocess": function (d) { return ({
                operation: "map_value_getter",
                left: d[0],
                right: d[2],
                position: d[0].position
            }); } },
        { "name": "ListValueGetter", "symbols": ["MVG_FC", { "literal": "[" }, "_", "Expression", "_", { "literal": "]" }], "postprocess": function (d) { return ({
                operation: "list_value_getter",
                source: d[0],
                index: d[3],
                position: d[0].position
            }); } },
        { "name": "FunctionCall$ebnf$1$subexpression$1", "symbols": ["ArgumentList", "_"], "postprocess": id },
        { "name": "FunctionCall$ebnf$1", "symbols": ["FunctionCall$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "FunctionCall$ebnf$1", "symbols": [], "postprocess": function () { return null; } },
        { "name": "FunctionCall", "symbols": ["MVG_FC", "_", { "literal": "(" }, "_", "FunctionCall$ebnf$1", { "literal": ")" }], "postprocess": function (d) { return ({
                operation: "function_call",
                name: d[0],
                arguments: d[4] || [],
                position: d[0].position
            }); } },
        { "name": "MicroCall", "symbols": ["MVG_FC", { "literal": "." }, "SubExpression"], "postprocess": function (d) { return ({
                operation: "micro_call",
                name: d[2],
                arguments: [d[0]],
                position: d[0].position
            }); } },
        { "name": "MacroCall$ebnf$1$subexpression$1", "symbols": ["ArgumentList", "_"], "postprocess": id },
        { "name": "MacroCall$ebnf$1", "symbols": ["MacroCall$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "MacroCall$ebnf$1", "symbols": [], "postprocess": function () { return null; } },
        { "name": "MacroCall", "symbols": ["MVG_FC", { "literal": "-" }, { "literal": ">" }, "SubExpression", "_", { "literal": "(" }, "_", "MacroCall$ebnf$1", { "literal": ")" }], "postprocess": function (d) { return ({
                operation: "macro_call",
                name: d[3],
                arguments: __spreadArrays([d[0]], d[7]),
                position: d[0].position
            }); } },
        { "name": "Conditions", "symbols": ["Expression", "_", (lexer.has("ConditionSign") ? { type: "ConditionSign" } : ConditionSign), "_", "Arithmetic"], "postprocess": function (d) { return ({
                operation: "condition",
                type: getCondition(d[2].value),
                left: d[0],
                right: d[4],
                position: d[0].position
            }); } },
        { "name": "SubExpression", "symbols": ["Primitive"], "postprocess": id },
        { "name": "SubExpression", "symbols": ["VariableReference"], "postprocess": id },
        { "name": "SubExpression", "symbols": ["Grouping"], "postprocess": id },
        { "name": "ManuelCast", "symbols": ["Expression", "_", { "literal": "as" }, "_", "VariableType"], "postprocess": function (d) { return ({
                operation: "manuel_cast",
                expression: d[0],
                type: d[4],
                position: d[0].position
            }); } },
        { "name": "Grouping$subexpression$1", "symbols": ["Expression"], "postprocess": id },
        { "name": "Grouping$subexpression$1", "symbols": ["ManuelCast"], "postprocess": id },
        { "name": "Grouping", "symbols": [{ "literal": "{" }, "Grouping$subexpression$1", { "literal": "}" }], "postprocess": function (d) { return d[1]; } },
        { "name": "ArgumentList", "symbols": ["Expression", "_", { "literal": "," }, "_", "ArgumentList"], "postprocess": function (d) { return __spreadArrays([d[0]], d[4]); } },
        { "name": "ArgumentList", "symbols": ["Expression"], "postprocess": function (d) { return [d[0]]; } },
        { "name": "VariableReference", "symbols": ["Identifier"], "postprocess": function (d) { return ({
                operation: "reference",
                value: d[0].value,
                position: { line: d[0].line, col: d[0].col }
            }); } },
        { "name": "Primitive", "symbols": ["Number"], "postprocess": id },
        { "name": "Primitive", "symbols": ["String"], "postprocess": id },
        { "name": "Primitive", "symbols": ["Boolean"], "postprocess": id },
        { "name": "Primitive", "symbols": ["CustomMap"], "postprocess": id },
        { "name": "Primitive", "symbols": ["List"], "postprocess": id },
        { "name": "Primitive", "symbols": ["Map"], "postprocess": id },
        { "name": "Primitive", "symbols": ["Function"], "postprocess": id },
        { "name": "Primitive", "symbols": ["None"], "postprocess": id },
        { "name": "None", "symbols": [{ "literal": "none" }], "postprocess": function (d) { return primitive(type("None"), { value: d[0].value, position: position(d[0]) }); } },
        { "name": "Function", "symbols": ["FunctionArguments", "_", { "literal": "-" }, { "literal": ">" }, "_", "VariableType", "_", "CodeBlock"], "postprocess": function (d) { return primitive(type("Function", d[5]), { body: d[7], arguments: d[0].data, position: position(d[0]) }); } },
        { "name": "List$ebnf$1$subexpression$1", "symbols": ["ArgumentList", "_"], "postprocess": id },
        { "name": "List$ebnf$1", "symbols": ["List$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "List$ebnf$1", "symbols": [], "postprocess": function () { return null; } },
        { "name": "List", "symbols": [{ "literal": "<" }, "_", "VariableType", "_", { "literal": ">" }, { "literal": "[" }, "_", "List$ebnf$1", { "literal": "]" }], "postprocess": function (d) { return primitive(type("List", d[2]), { value: d[7] || [], position: position(d[0]) }); } },
        { "name": "Map$ebnf$1$subexpression$1", "symbols": ["KeyValueList", "_"], "postprocess": id },
        { "name": "Map$ebnf$1", "symbols": ["Map$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "Map$ebnf$1", "symbols": [], "postprocess": function () { return null; } },
        { "name": "Map", "symbols": [{ "literal": "<" }, "_", "VariableType", "_", { "literal": ">" }, { "literal": "{" }, "_", "Map$ebnf$1", { "literal": "}" }], "postprocess": function (d) { return primitive(type("Map", d[2]), { value: d[7] || [], position: position(d[0]) }); } },
        { "name": "CustomMap$ebnf$1$subexpression$1", "symbols": ["KeyValueList", "_"], "postprocess": id },
        { "name": "CustomMap$ebnf$1", "symbols": ["CustomMap$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "CustomMap$ebnf$1", "symbols": [], "postprocess": function () { return null; } },
        { "name": "CustomMap", "symbols": ["Identifier", "_", { "literal": "{" }, "_", "CustomMap$ebnf$1", { "literal": "}" }], "postprocess": function (d) { return primitive(type(d[0].value), { value: d[4] || [], position: position(d[0]) }); } },
        { "name": "Boolean", "symbols": [(lexer.has("BooleanLiteral") ? { type: "BooleanLiteral" } : BooleanLiteral)], "postprocess": function (d) { return primitive(type("Boolean"), { value: d[0].value, position: position(d[0]) }); } },
        { "name": "Number", "symbols": [(lexer.has("NumberLiteral") ? { type: "NumberLiteral" } : NumberLiteral)], "postprocess": function (d) { return primitive(d[0].value.includes(".") ? type("Double") : type("Int"), {
                value: d[0].value,
                position: position(d[0])
            }); } },
        { "name": "Number", "symbols": [(lexer.has("BinaryLiteral") ? { type: "BinaryLiteral" } : BinaryLiteral)], "postprocess": function (d) { return primitive(type("Int"), {
                value: parseInt(d[0].value.substr(2), 2).toString(),
                position: position(d[0])
            }); } },
        { "name": "Number", "symbols": [(lexer.has("HexLiteral") ? { type: "HexLiteral" } : HexLiteral)], "postprocess": function (d) { return primitive(type("Int"), {
                value: parseInt(d[0].value.substr(2), 16).toString(),
                position: position(d[0])
            }); } },
        { "name": "Number", "symbols": [(lexer.has("OctalLiteral") ? { type: "OctalLiteral" } : OctalLiteral)], "postprocess": function (d) { return primitive(type("Int"), {
                value: parseInt(d[0].value.substr(2), 8).toString(),
                position: position(d[0])
            }); } },
        { "name": "String", "symbols": [(lexer.has("StringLiteral") ? { type: "StringLiteral" } : StringLiteral)], "postprocess": function (d) { return primitive(type("String"), {
                value: d[0].value,
                position: position(d[0])
            }); } },
        { "name": "VariableType", "symbols": [(lexer.has("VariableType") ? { type: "VariableType" } : VariableType)], "postprocess": function (d) { return ({ base: d[0].value }); } },
        { "name": "VariableType", "symbols": [{ "literal": "Function" }, { "literal": "<" }, "_", "VariableType", "_", { "literal": ">" }], "postprocess": function (d) { return type("Function", d[3]); } },
        { "name": "VariableType", "symbols": [{ "literal": "-" }, { "literal": ">" }, "VariableType"], "postprocess": function (d) { return type("Function", d[2]); } },
        { "name": "VariableType", "symbols": [{ "literal": "Map" }, { "literal": "<" }, "_", "VariableType", "_", { "literal": ">" }], "postprocess": function (d) { return type("Map", d[3]); } },
        { "name": "VariableType", "symbols": [{ "literal": "{" }, { "literal": "}" }, "VariableType"], "postprocess": function (d) { return type("Map", d[2]); } },
        { "name": "VariableType", "symbols": [{ "literal": "List" }, { "literal": "<" }, "_", "VariableType", "_", { "literal": ">" }], "postprocess": function (d) { return type("List", d[3]); } },
        { "name": "VariableType", "symbols": [{ "literal": "[" }, { "literal": "]" }, "VariableType"], "postprocess": function (d) { return type("List", d[2]); } },
        { "name": "VariableType", "symbols": ["Identifier"], "postprocess": function (d) { return type(d[0].value); } },
        { "name": "KeyValue", "symbols": ["Identifier", "_", { "literal": ":" }, "_", "Expression"], "postprocess": function (d) { return ({ key: d[0].value, value: d[4], position: position(d[0]) }); } },
        { "name": "KeyValueList", "symbols": ["KeyValue", "_", { "literal": "," }, "_", "KeyValueList"], "postprocess": function (d) { return __spreadArrays([d[0]], d[4]); } },
        { "name": "KeyValueList", "symbols": ["KeyValue"], "postprocess": function (d) { return [d[0]]; } },
        { "name": "TypedIdentifierList", "symbols": ["TypedIdentifier", "_", { "literal": "," }, "_", "TypedIdentifierList"], "postprocess": function (d) { return __spreadArrays([d[0]], d[4]); } },
        { "name": "TypedIdentifierList", "symbols": ["TypedIdentifier"], "postprocess": function (d) { return [d[0]]; } },
        { "name": "TypedIdentifier$ebnf$1", "symbols": [{ "literal": "?" }], "postprocess": id },
        { "name": "TypedIdentifier$ebnf$1", "symbols": [], "postprocess": function () { return null; } },
        { "name": "TypedIdentifier", "symbols": ["VariableType", "__", "Identifier", "TypedIdentifier$ebnf$1"], "postprocess": function (d) { return ({ type: d[0], value: d[2].value, optional: d[3] !== null }); } },
        { "name": "Identifier", "symbols": [(lexer.has("Identifier") ? { type: "Identifier" } : Identifier)], "postprocess": id },
        { "name": "_$ebnf$1", "symbols": [] },
        { "name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("WhiteSpace") ? { type: "WhiteSpace" } : WhiteSpace)], "postprocess": function (d) { return d[0].concat([d[1]]); } },
        { "name": "_", "symbols": ["_$ebnf$1"], "postprocess": function (d) { return null; } },
        { "name": "__$ebnf$1", "symbols": [(lexer.has("WhiteSpace") ? { type: "WhiteSpace" } : WhiteSpace)] },
        { "name": "__$ebnf$1", "symbols": ["__$ebnf$1", (lexer.has("WhiteSpace") ? { type: "WhiteSpace" } : WhiteSpace)], "postprocess": function (d) { return d[0].concat([d[1]]); } },
        { "name": "__", "symbols": ["__$ebnf$1"], "postprocess": function (d) { return null; } }
    ],
    ParserStart: "Program",
};
exports.default = grammar;
