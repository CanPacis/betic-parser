// Generated automatically by nearley, version 2.19.3
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }
declare var ConditionSign: any;
declare var BooleanLiteral: any;
declare var NumberLiteral: any;
declare var BinaryLiteral: any;
declare var HexLiteral: any;
declare var OctalLiteral: any;
declare var StringLiteral: any;
declare var VariableType: any;
declare var Identifier: any;
declare var WhiteSpace: any;


import moo from "moo"

const lexer = moo.compile({
  WhiteSpace: { match: /[ \t\n\r]+/, lineBreaks: true },
  NumberLiteral: {
    match: /-?[0-9]+(?:\.[0-9]+)?/,
  },
  BinaryLiteral: {
    match: /-?#b[0-1]+/
  },
  HexLiteral: {
    match: /-?#x[0-9a-fA-F]+/
  },
  OctalLiteral: {
    match: /-?#o[0-7]+/
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
    value: (s: string) => JSON.parse(s)
  },
  BooleanLiteral: {
    match: /true|false/,
  },
  VariableType: {
    match: /Int|Double|String|Boolean|Occult|Void/
  },
  Identifier: {
    match: /[a-zA-Z_][a-zA-Z_0-9]*/,
    type: moo.keywords({
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
}) as unknown as NearleyLexer

function getCondition(condition: string) {
  switch(condition) {
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

function arithmetic(type: any, data: any) {
  return { 
    operation: "arithmetic", 
    type, 
    left: data[0], 
    right: data[4], 
    position: data[0].position 
  }
}

function primitive(type: any, data: any) {
  return { operation: "primitive", type, ...data }
}

function type(base: any, of?: any) {
  return { base, of }
}

function position(data: any) {
  return { line: data.line, col: data.col }
}


interface NearleyToken {  value: any;
  [key: string]: any;
};

interface NearleyLexer {
  reset: (chunk: string, info: any) => void;
  next: () => NearleyToken | undefined;
  save: () => any;
  formatError: (token: NearleyToken) => string;
  has: (tokenType: string) => boolean;
};

interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any;
};

type NearleySymbol = string | { literal: any } | { test: (token: any) => boolean };

interface Grammar {
  Lexer: NearleyLexer | undefined;
  ParserRules: NearleyRule[];
  ParserStart: string;
};

const grammar: Grammar = {
  Lexer: lexer,
  ParserRules: [
    {"name": "Program$ebnf$1", "symbols": []},
    {"name": "Program$ebnf$1$subexpression$1", "symbols": ["Import", "_"], "postprocess": id},
    {"name": "Program$ebnf$1", "symbols": ["Program$ebnf$1", "Program$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Program$ebnf$2", "symbols": []},
    {"name": "Program$ebnf$2$subexpression$1", "symbols": ["Main", "_"], "postprocess": id},
    {"name": "Program$ebnf$2", "symbols": ["Program$ebnf$2", "Program$ebnf$2$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Program$ebnf$3$subexpression$1", "symbols": ["TemplateWrapper", "_"], "postprocess": id},
    {"name": "Program$ebnf$3", "symbols": ["Program$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "Program$ebnf$3", "symbols": [], "postprocess": () => null},
    {"name": "Program", "symbols": ["_", "Program$ebnf$1", "Program$ebnf$2", "Program$ebnf$3"], "postprocess": d => ({ imports: d[1], program: d[2], template: d[3] || [] })},
    {"name": "Import$ebnf$1$subexpression$1", "symbols": ["_", {"literal":"as"}, "__", "Identifier"], "postprocess": d => d[3].value},
    {"name": "Import$ebnf$1", "symbols": ["Import$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "Import$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "Import", "symbols": [{"literal":"import"}, "__", "String", "Import$ebnf$1"], "postprocess":  d => ({ 
          source: { value: d[2].value, position: d[2].position },
          as: d[3],
          position: position(d[0])
        }) },
    {"name": "Provide$ebnf$1$subexpression$1", "symbols": ["__", "Expression"], "postprocess": d => d[1]},
    {"name": "Provide$ebnf$1", "symbols": ["Provide$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "Provide$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "Provide", "symbols": [{"literal":"provide"}, "Provide$ebnf$1"], "postprocess":  d => ({
          body: d[1],
          position: position(d[0])
        }) },
    {"name": "TemplateWrapper$ebnf$1", "symbols": []},
    {"name": "TemplateWrapper$ebnf$1$subexpression$1", "symbols": ["Template", "_"], "postprocess": id},
    {"name": "TemplateWrapper$ebnf$1", "symbols": ["TemplateWrapper$ebnf$1", "TemplateWrapper$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "TemplateWrapper", "symbols": [{"literal":"&"}, "_", {"literal":"{"}, "_", "TemplateWrapper$ebnf$1", {"literal":"}"}], "postprocess": d => d[4]},
    {"name": "Template", "symbols": ["Tag"], "postprocess": id},
    {"name": "Template", "symbols": ["TemplateIfStatement"], "postprocess": id},
    {"name": "Template", "symbols": ["TemplateForStatement"], "postprocess": id},
    {"name": "Template", "symbols": ["TemplateSwitchStatement"], "postprocess": id},
    {"name": "Template", "symbols": ["Comment"], "postprocess": id},
    {"name": "Tag$ebnf$1", "symbols": []},
    {"name": "Tag$ebnf$1$subexpression$1", "symbols": ["AttributeList", "_"], "postprocess": id},
    {"name": "Tag$ebnf$1", "symbols": ["Tag$ebnf$1", "Tag$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Tag$ebnf$2$subexpression$1$ebnf$1", "symbols": []},
    {"name": "Tag$ebnf$2$subexpression$1$ebnf$1$subexpression$1$subexpression$1", "symbols": ["Expression"], "postprocess": id},
    {"name": "Tag$ebnf$2$subexpression$1$ebnf$1$subexpression$1$subexpression$1", "symbols": ["Template"], "postprocess": id},
    {"name": "Tag$ebnf$2$subexpression$1$ebnf$1$subexpression$1", "symbols": ["Tag$ebnf$2$subexpression$1$ebnf$1$subexpression$1$subexpression$1", "_"], "postprocess": id},
    {"name": "Tag$ebnf$2$subexpression$1$ebnf$1", "symbols": ["Tag$ebnf$2$subexpression$1$ebnf$1", "Tag$ebnf$2$subexpression$1$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Tag$ebnf$2$subexpression$1", "symbols": ["_", {"literal":"("}, "_", "Tag$ebnf$2$subexpression$1$ebnf$1", {"literal":")"}], "postprocess": d => d[3]},
    {"name": "Tag$ebnf$2", "symbols": ["Tag$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "Tag$ebnf$2", "symbols": [], "postprocess": () => null},
    {"name": "Tag", "symbols": ["Identifier", "_", {"literal":"-"}, {"literal":">"}, "_", {"literal":"{"}, "_", "Tag$ebnf$1", {"literal":"}"}, "Tag$ebnf$2"], "postprocess":  d => ({
          operation: "tag",
          name: d[0].value,
          attributes: d[7][0],
          body: d[9] || [],
          position: position(d[0])
        }) },
    {"name": "AttributeList", "symbols": ["Attribute", "_", {"literal":","}, "_", "AttributeList"], "postprocess": d => [d[0], ...d[4]]},
    {"name": "AttributeList", "symbols": ["Attribute"], "postprocess": d => [d[0]]},
    {"name": "Attribute$subexpression$1", "symbols": ["Identifier"], "postprocess": id},
    {"name": "Attribute$subexpression$1", "symbols": ["AttributeKeyword"], "postprocess": id},
    {"name": "Attribute$ebnf$1$subexpression$1", "symbols": [{"literal":"="}, "Expression"], "postprocess": d => d[1]},
    {"name": "Attribute$ebnf$1", "symbols": ["Attribute$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "Attribute$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "Attribute", "symbols": ["Attribute$subexpression$1", "Attribute$ebnf$1"], "postprocess":  d => ({ 
            key: d[0].value, 
            value: d[1] || {
        	operation: "reference",
        	value: d[0].value,
        	position: position(d[0])
        }, 
            position: position(d[0]) 
          }) },
    {"name": "AttributeKeyword", "symbols": [{"literal":"try"}], "postprocess": id},
    {"name": "Main", "symbols": ["VariableDefinition"], "postprocess": id},
    {"name": "Main", "symbols": ["TypeDefinition"], "postprocess": id},
    {"name": "Main", "symbols": ["Expression"], "postprocess": id},
    {"name": "Main", "symbols": ["MicroDefinition"], "postprocess": id},
    {"name": "Main", "symbols": ["MacroDefinition"], "postprocess": id},
    {"name": "Main", "symbols": ["FunctionDefinition"], "postprocess": id},
    {"name": "Main", "symbols": ["ForStatement"], "postprocess": id},
    {"name": "Main", "symbols": ["IfStatement"], "postprocess": id},
    {"name": "Main", "symbols": ["SwitchStatement"], "postprocess": id},
    {"name": "Main", "symbols": ["AssignStatement"], "postprocess": id},
    {"name": "Main", "symbols": ["QuantityModifier"], "postprocess": id},
    {"name": "Main", "symbols": ["TryCatch"], "postprocess": id},
    {"name": "Main", "symbols": ["Comment"], "postprocess": id},
    {"name": "TryCatch", "symbols": [{"literal":"try"}, "_", "CodeBlock", "_", {"literal":"catch"}, "_", "FunctionArguments", "_", "CodeBlock"], "postprocess":  d => ({ 
          operation: "try_catch_block", 
          tries: d[2].block,
          catches: d[8].block, 
          arguments: d[6].data
        }) },
    {"name": "QuantityModifier", "symbols": ["Mutatable", {"literal":"+"}, {"literal":"+"}], "postprocess": d => ({ operation: "quantity_modifier", type: "increment", statement: d[0], position: d[0].position })},
    {"name": "QuantityModifier", "symbols": ["Mutatable", {"literal":"-"}, {"literal":"-"}], "postprocess": d => ({ operation: "quantity_modifier", type: "decrement", statement: d[0], position: d[0].position })},
    {"name": "QuantityModifier", "symbols": ["Mutatable", "_", {"literal":"+"}, {"literal":"="}, "_", "Expression"], "postprocess": d => ({ operation: "quantity_modifier", type: "add", statement: d[0], right: d[5], position: d[0].position })},
    {"name": "QuantityModifier", "symbols": ["Mutatable", "_", {"literal":"-"}, {"literal":"="}, "_", "Expression"], "postprocess": d => ({ operation: "quantity_modifier", type: "subtract", statement: d[0], right: d[5], position: d[0].position })},
    {"name": "QuantityModifier", "symbols": ["Mutatable", "_", {"literal":"*"}, {"literal":"="}, "_", "Expression"], "postprocess": d => ({ operation: "quantity_modifier", type: "multiply", statement: d[0], right: d[5], position: d[0].position })},
    {"name": "QuantityModifier", "symbols": ["Mutatable", "_", {"literal":"/"}, {"literal":"="}, "_", "Expression"], "postprocess": d => ({ operation: "quantity_modifier", type: "divide", statement: d[0], right: d[5], position: d[0].position })},
    {"name": "AssignStatement", "symbols": ["Mutatable", "_", {"literal":"="}, "_", "Expression"], "postprocess":  d => ({ 
          operation: "assign_statement", 
          left: d[0], 
          right: d[4],
          position: d[0].position 
        }) },
    {"name": "SwitchStatement$ebnf$1", "symbols": []},
    {"name": "SwitchStatement$ebnf$1$subexpression$1", "symbols": [{"literal":"case"}, "__", "Expression", "_", "CodeBlock", "_"], "postprocess": d => ({ case: d[2], body: d[4] })},
    {"name": "SwitchStatement$ebnf$1", "symbols": ["SwitchStatement$ebnf$1", "SwitchStatement$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "SwitchStatement", "symbols": [{"literal":"switch"}, "__", "Expression", "_", {"literal":"{"}, "_", "SwitchStatement$ebnf$1", {"literal":"}"}], "postprocess":  d => ({ 
          operation: "switch_statement", 
          condition: d[2],
          cases: d[6],
          position: position(d[0])
        }) },
    {"name": "TemplateSwitchStatement$ebnf$1", "symbols": []},
    {"name": "TemplateSwitchStatement$ebnf$1$subexpression$1", "symbols": [{"literal":"case"}, "__", "Expression", "_", "TemplateBlock", "_"], "postprocess": d => ({ case: d[2], body: d[4] })},
    {"name": "TemplateSwitchStatement$ebnf$1", "symbols": ["TemplateSwitchStatement$ebnf$1", "TemplateSwitchStatement$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "TemplateSwitchStatement", "symbols": [{"literal":"switch"}, "__", "Expression", "_", {"literal":"{"}, "_", "TemplateSwitchStatement$ebnf$1", {"literal":"}"}], "postprocess":  d => ({ 
          operation: "switch_statement", 
          condition: d[2],
          cases: d[6],
          position: position(d[0])
        }) },
    {"name": "IfStatement$ebnf$1", "symbols": []},
    {"name": "IfStatement$ebnf$1$subexpression$1", "symbols": ["_", {"literal":"elif"}, "__", "Expression", "_", "CodeBlock"], "postprocess": d => ({ condition: d[3], body: d[5] })},
    {"name": "IfStatement$ebnf$1", "symbols": ["IfStatement$ebnf$1", "IfStatement$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "IfStatement$ebnf$2$subexpression$1", "symbols": ["_", {"literal":"else"}, "_", "CodeBlock"], "postprocess": d => d[3]},
    {"name": "IfStatement$ebnf$2", "symbols": ["IfStatement$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "IfStatement$ebnf$2", "symbols": [], "postprocess": () => null},
    {"name": "IfStatement", "symbols": [{"literal":"if"}, "__", "Expression", "_", "CodeBlock", "IfStatement$ebnf$1", "IfStatement$ebnf$2"], "postprocess":  d => ({ 
          operation: "if_statement", 
          condition: d[2], 
          body: d[4],
          elifs: d[5],
          else: d[6],
          position: position(d[0])
        }) },
    {"name": "TemplateIfStatement$ebnf$1", "symbols": []},
    {"name": "TemplateIfStatement$ebnf$1$subexpression$1", "symbols": ["_", {"literal":"elif"}, "__", "Expression", "_", "TemplateBlock"], "postprocess": d => ({ condition: d[3], body: d[5] })},
    {"name": "TemplateIfStatement$ebnf$1", "symbols": ["TemplateIfStatement$ebnf$1", "TemplateIfStatement$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "TemplateIfStatement$ebnf$2$subexpression$1", "symbols": ["_", {"literal":"else"}, "_", "TemplateBlock"], "postprocess": d => d[3]},
    {"name": "TemplateIfStatement$ebnf$2", "symbols": ["TemplateIfStatement$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "TemplateIfStatement$ebnf$2", "symbols": [], "postprocess": () => null},
    {"name": "TemplateIfStatement", "symbols": [{"literal":"if"}, "__", "Expression", "_", "TemplateBlock", "TemplateIfStatement$ebnf$1", "TemplateIfStatement$ebnf$2"], "postprocess":  d => ({ 
          operation: "if_statement", 
          condition: d[2], 
          body: d[4],
          elifs: d[5],
          else: d[6],
          position: position(d[0])
        }) },
    {"name": "ForStatement", "symbols": [{"literal":"for"}, "__", "Expression", "__", {"literal":"as"}, "__", "Identifier", "_", "CodeBlock"], "postprocess":  d => ({ 
          operation: "for_statement", 
          statement: d[2], 
          placeholder: d[6].value, 
          body: d[8],
          position: position(d[0]) 
        }) },
    {"name": "TemplateForStatement", "symbols": [{"literal":"for"}, "__", "Expression", "__", {"literal":"as"}, "__", "Identifier", "_", "TemplateBlock"], "postprocess":  d => ({ 
          operation: "for_statement", 
          statement: d[2], 
          placeholder: d[6].value, 
          body: d[8],
          position: position(d[0]) 
        }) },
    {"name": "TypeDefinition$ebnf$1$subexpression$1", "symbols": ["TypedIdentifierList", "_"], "postprocess": id},
    {"name": "TypeDefinition$ebnf$1", "symbols": ["TypeDefinition$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "TypeDefinition$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "TypeDefinition", "symbols": [{"literal":"define"}, "__", "Identifier", "_", {"literal":"{"}, "_", "TypeDefinition$ebnf$1", {"literal":"}"}], "postprocess":  d => ({ 
          operation: "type_definition", 
          name: d[2].value,
          body: d[6] || [],
          position: position(d[0])
        }) },
    {"name": "VariableDefinition$subexpression$1", "symbols": [{"literal":"const"}, "__"], "postprocess": id},
    {"name": "VariableDefinition$subexpression$1", "symbols": [{"literal":"var"}, "__"], "postprocess": id},
    {"name": "VariableDefinition$ebnf$1$subexpression$1", "symbols": [{"literal":"expected"}, "__"], "postprocess": id},
    {"name": "VariableDefinition$ebnf$1", "symbols": ["VariableDefinition$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "VariableDefinition$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "VariableDefinition", "symbols": ["VariableDefinition$subexpression$1", "VariableDefinition$ebnf$1", "VariableType", "__", "Identifier", "_", {"literal":":"}, {"literal":"="}, "_", "Expression"], "postprocess":  d => ({ 
          operation: "variable_definition",
          constant: d[0].value === "const",
          expected: d[1] !== null,
          type: d[2],
          name: d[4].value, 
          value: d[9],
          position: position(d[0])
        }) },
    {"name": "FunctionDefinition", "symbols": [{"literal":"func"}, "_", {"literal":"-"}, {"literal":">"}, "_", "VariableType", "__", "Identifier", "_", "FunctionArguments", "_", "CodeBlock"], "postprocess":  d => ({ 
          operation: "function_definition", 
          return_type: d[5],
          name: d[7].value, 
          arguments: d[9].data,
          body: d[11],
          position: position(d[0])
        }) },
    {"name": "MicroDefinition", "symbols": [{"literal":"micro"}, "_", {"literal":"-"}, {"literal":">"}, "_", "VariableType", "__", "Identifier", "__", "TypedIdentifier", "_", "CodeBlock"], "postprocess":  d => ({ 
          operation: "micro_definition", 
          type: d[5],
          name: d[7].value, 
          prototype: d[9],
          body: d[11],
          position: position(d[0])
        }) },
    {"name": "MacroDefinition", "symbols": [{"literal":"macro"}, "_", {"literal":"-"}, {"literal":">"}, "_", "VariableType", "__", "Identifier", "__", "TypedIdentifier", "_", "FunctionArguments", "_", "CodeBlock"], "postprocess":  d => ({ 
          operation: "macro_definition", 
          type: d[5],
          name: d[7].value, 
          prototype: d[9],
          arguments: d[11].data,
          body: d[13],
          position: position(d[0])
        }) },
    {"name": "Comment$ebnf$1", "symbols": []},
    {"name": "Comment$ebnf$1", "symbols": ["Comment$ebnf$1", /[^#]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Comment", "symbols": [{"literal":"#"}, "Comment$ebnf$1", {"literal":"#"}], "postprocess":  d => ({ 
          operation: "comment", 
          value: d[1]?.map((d: any) => d.value).join(""),
          position: position(d[0])
        }) },
    {"name": "CodeBlock$ebnf$1", "symbols": []},
    {"name": "CodeBlock$ebnf$1$subexpression$1", "symbols": ["Main", "_"], "postprocess": id},
    {"name": "CodeBlock$ebnf$1", "symbols": ["CodeBlock$ebnf$1", "CodeBlock$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "CodeBlock$ebnf$2$subexpression$1", "symbols": ["Provide", "_"], "postprocess": id},
    {"name": "CodeBlock$ebnf$2", "symbols": ["CodeBlock$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "CodeBlock$ebnf$2", "symbols": [], "postprocess": () => null},
    {"name": "CodeBlock", "symbols": [{"literal":"{"}, "_", "CodeBlock$ebnf$1", "CodeBlock$ebnf$2", {"literal":"}"}], "postprocess": d => ({ block: d[2], provides: d[3] })},
    {"name": "TemplateBlock$ebnf$1", "symbols": []},
    {"name": "TemplateBlock$ebnf$1$subexpression$1", "symbols": ["Template", "_"], "postprocess": id},
    {"name": "TemplateBlock$ebnf$1", "symbols": ["TemplateBlock$ebnf$1", "TemplateBlock$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "TemplateBlock", "symbols": [{"literal":"{"}, "_", "TemplateBlock$ebnf$1", {"literal":"}"}], "postprocess": d => ({ block: d[2] })},
    {"name": "FunctionArguments$ebnf$1$subexpression$1", "symbols": ["TypedIdentifierList", "_"], "postprocess": id},
    {"name": "FunctionArguments$ebnf$1", "symbols": ["FunctionArguments$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "FunctionArguments$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "FunctionArguments", "symbols": [{"literal":"("}, "_", "FunctionArguments$ebnf$1", {"literal":")"}], "postprocess": d => ({ data: d[2] || [], ...position(d[0]) })},
    {"name": "Mutatable", "symbols": ["VariableReference"], "postprocess": id},
    {"name": "Mutatable", "symbols": ["MapValueGetter"], "postprocess": id},
    {"name": "Mutatable", "symbols": ["ListValueGetter"], "postprocess": id},
    {"name": "Expression", "symbols": ["Expression", "_", {"literal":"+"}, "_", "MultDiv"], "postprocess": d => arithmetic("addition", d)},
    {"name": "Expression", "symbols": ["Expression", "_", {"literal":"-"}, "_", "MultDiv"], "postprocess": d => arithmetic("subtraction", d)},
    {"name": "Expression", "symbols": ["MultDiv"], "postprocess": id},
    {"name": "MultDiv", "symbols": ["MultDiv", "_", {"literal":"*"}, "_", "Exponent"], "postprocess": d => arithmetic("multiplication", d)},
    {"name": "MultDiv", "symbols": ["MultDiv", "_", {"literal":"/"}, "_", "Exponent"], "postprocess": d => arithmetic("division", d)},
    {"name": "MultDiv", "symbols": ["Exponent"], "postprocess": id},
    {"name": "Exponent", "symbols": ["MVG_FC", "_", {"literal":"^"}, "_", "Exponent"], "postprocess": d => arithmetic("exponent", d)},
    {"name": "Exponent", "symbols": ["MVG_FC", "_", {"literal":"'"}, "_", "Exponent"], "postprocess": d => arithmetic("root", d)},
    {"name": "Exponent", "symbols": ["MVG_FC", "_", {"literal":"%"}, "_", "Exponent"], "postprocess": d => arithmetic("modulus", d)},
    {"name": "Exponent", "symbols": ["MVG_FC"], "postprocess": id},
    {"name": "MVG_FC", "symbols": ["MapValueGetter"], "postprocess": id},
    {"name": "MVG_FC", "symbols": ["ListValueGetter"], "postprocess": id},
    {"name": "MVG_FC", "symbols": ["FunctionCall"], "postprocess": id},
    {"name": "MVG_FC", "symbols": ["MicroCall"], "postprocess": id},
    {"name": "MVG_FC", "symbols": ["MacroCall"], "postprocess": id},
    {"name": "MVG_FC", "symbols": ["Conditions"], "postprocess": id},
    {"name": "MVG_FC", "symbols": ["SubExpression"], "postprocess": id},
    {"name": "MapValueGetter", "symbols": ["MVG_FC", {"literal":":"}, "SubExpression"], "postprocess":  d => ({ 
          operation: "map_value_getter", 
          left: d[0], 
          right: d[2],
          position: d[0].position 
        }) },
    {"name": "ListValueGetter", "symbols": ["MVG_FC", {"literal":"["}, "_", "Expression", "_", {"literal":"]"}], "postprocess":  d => ({ 
          operation: "list_value_getter", 
          source: d[0], 
          index: d[3],
          position: d[0].position 
        }) },
    {"name": "FunctionCall$ebnf$1$subexpression$1", "symbols": ["ArgumentList", "_"], "postprocess": id},
    {"name": "FunctionCall$ebnf$1", "symbols": ["FunctionCall$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "FunctionCall$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "FunctionCall", "symbols": ["MVG_FC", "_", {"literal":"("}, "_", "FunctionCall$ebnf$1", {"literal":")"}], "postprocess":  d => ({ 
          operation: "function_call", 
          name: d[0], 
          arguments: d[4] || [],
          position: d[0].position
        }) },
    {"name": "MicroCall", "symbols": ["MVG_FC", {"literal":"."}, "SubExpression"], "postprocess":  d => ({ 
          operation: "micro_call", 
          name: d[2], 
          arguments: [d[0]],
          position: d[0].position
        }) },
    {"name": "MacroCall$ebnf$1$subexpression$1", "symbols": ["ArgumentList", "_"], "postprocess": id},
    {"name": "MacroCall$ebnf$1", "symbols": ["MacroCall$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "MacroCall$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "MacroCall", "symbols": ["MVG_FC", {"literal":"-"}, {"literal":">"}, "SubExpression", "_", {"literal":"("}, "_", "MacroCall$ebnf$1", {"literal":")"}], "postprocess":  d => ({ 
          operation: "macro_call", 
          name: d[3], 
          arguments: [d[0], ...d[7]],
          position: d[0].position
        }) },
    {"name": "Conditions", "symbols": ["Expression", "_", (lexer.has("ConditionSign") ? {type: "ConditionSign"} : ConditionSign), "_", "SubExpression"], "postprocess":  d => ({ 
          operation: "condition", 
          type: getCondition(d[2].value), 
          left: d[0], 
          right: d[4],
          position: d[0].position 
        }) },
    {"name": "SubExpression", "symbols": ["Primitive"], "postprocess": id},
    {"name": "SubExpression", "symbols": ["VariableReference"], "postprocess": id},
    {"name": "SubExpression", "symbols": ["Grouping"], "postprocess": id},
    {"name": "ManuelCast", "symbols": ["Expression", "_", {"literal":"as"}, "_", "VariableType"], "postprocess":  d => ({ 
          operation: "manuel_cast", 
          expression: d[0], 
          type: d[4] 
        }) },
    {"name": "Grouping$subexpression$1", "symbols": ["Expression"], "postprocess": id},
    {"name": "Grouping$subexpression$1", "symbols": ["ManuelCast"], "postprocess": id},
    {"name": "Grouping", "symbols": [{"literal":"{"}, "Grouping$subexpression$1", {"literal":"}"}], "postprocess": d => d[1]},
    {"name": "ArgumentList", "symbols": ["Expression", "_", {"literal":","}, "_", "ArgumentList"], "postprocess": d => [d[0], ...d[4]]},
    {"name": "ArgumentList", "symbols": ["Expression"], "postprocess": d => [d[0]]},
    {"name": "VariableReference", "symbols": ["Identifier"], "postprocess":  d => ({ 
          operation: "reference", 
          value: d[0].value,
          position: { line: d[0].line, col: d[0].col }
        }) },
    {"name": "Primitive", "symbols": ["Number"], "postprocess": id},
    {"name": "Primitive", "symbols": ["String"], "postprocess": id},
    {"name": "Primitive", "symbols": ["Boolean"], "postprocess": id},
    {"name": "Primitive", "symbols": ["CustomMap"], "postprocess": id},
    {"name": "Primitive", "symbols": ["List"], "postprocess": id},
    {"name": "Primitive", "symbols": ["Map"], "postprocess": id},
    {"name": "Primitive", "symbols": ["Function"], "postprocess": id},
    {"name": "Primitive", "symbols": ["None"], "postprocess": id},
    {"name": "None", "symbols": [{"literal":"none"}], "postprocess":  d => primitive(type("None"), 
        { value: d[0].value, position: position(d[0]) }) },
    {"name": "Function", "symbols": ["FunctionArguments", "_", {"literal":"-"}, {"literal":">"}, "_", "VariableType", "_", "CodeBlock"], "postprocess":  d => primitive(type("Function", d[5]),
        { body: d[7], arguments: d[0].data, position: position(d[0]) }) },
    {"name": "List$ebnf$1$subexpression$1", "symbols": ["ArgumentList", "_"], "postprocess": id},
    {"name": "List$ebnf$1", "symbols": ["List$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "List$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "List", "symbols": [{"literal":"<"}, "_", "VariableType", "_", {"literal":">"}, {"literal":"["}, "_", "List$ebnf$1", {"literal":"]"}], "postprocess":  d => primitive(type("List", d[2]), 
        { value: d[7] || [], position: position(d[0]) }) },
    {"name": "Map$ebnf$1$subexpression$1", "symbols": ["KeyValueList", "_"], "postprocess": id},
    {"name": "Map$ebnf$1", "symbols": ["Map$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "Map$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "Map", "symbols": [{"literal":"<"}, "_", "VariableType", "_", {"literal":">"}, {"literal":"{"}, "_", "Map$ebnf$1", {"literal":"}"}], "postprocess":  d => primitive(type("Map", d[2]), 
        { value: d[7] || [], position: position(d[0]) }) },
    {"name": "CustomMap$ebnf$1$subexpression$1", "symbols": ["KeyValueList", "_"], "postprocess": id},
    {"name": "CustomMap$ebnf$1", "symbols": ["CustomMap$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "CustomMap$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "CustomMap", "symbols": ["Identifier", "_", {"literal":"{"}, "_", "CustomMap$ebnf$1", {"literal":"}"}], "postprocess":  d => primitive(type(d[0].value), 
        { value: d[4] || [], position: position(d[0]) }) },
    {"name": "Boolean", "symbols": [(lexer.has("BooleanLiteral") ? {type: "BooleanLiteral"} : BooleanLiteral)], "postprocess":  d => primitive(type("Boolean"), 
        { value: d[0].value, position: position(d[0]) }) },
    {"name": "Number", "symbols": [(lexer.has("NumberLiteral") ? {type: "NumberLiteral"} : NumberLiteral)], "postprocess":  d => primitive(d[0].value.includes(".") ? type("Double") : type("Int"), { 
          value: d[0].value,
          position: position(d[0])
        })  },
    {"name": "Number", "symbols": [(lexer.has("BinaryLiteral") ? {type: "BinaryLiteral"} : BinaryLiteral)], "postprocess":  d => primitive(type("Int"), { 
          value: parseInt(d[0].value.substr(2), 2).toString(),
          position: position(d[0])
        })  },
    {"name": "Number", "symbols": [(lexer.has("HexLiteral") ? {type: "HexLiteral"} : HexLiteral)], "postprocess":  d => primitive(type("Int"), { 
          value: parseInt(d[0].value.substr(2), 16).toString(),
          position: position(d[0])
        })  },
    {"name": "Number", "symbols": [(lexer.has("OctalLiteral") ? {type: "OctalLiteral"} : OctalLiteral)], "postprocess":  d => primitive(type("Int"), { 
          value: parseInt(d[0].value.substr(2), 8).toString(),
          position: position(d[0])
        })  },
    {"name": "String", "symbols": [(lexer.has("StringLiteral") ? {type: "StringLiteral"} : StringLiteral)], "postprocess":  d => primitive(type("String"), { 
          value: d[0].value,
          position: position(d[0])
        }) },
    {"name": "VariableType", "symbols": [(lexer.has("VariableType") ? {type: "VariableType"} : VariableType)], "postprocess": d => ({ base: d[0].value })},
    {"name": "VariableType", "symbols": [{"literal":"Function"}, {"literal":"<"}, "_", "VariableType", "_", {"literal":">"}], "postprocess": d => type("Function", d[3])},
    {"name": "VariableType", "symbols": [{"literal":"Map"}, {"literal":"<"}, "_", "VariableType", "_", {"literal":">"}], "postprocess": d => type("Map", d[3])},
    {"name": "VariableType", "symbols": [{"literal":"List"}, {"literal":"<"}, "_", "VariableType", "_", {"literal":">"}], "postprocess": d => type("List", d[3])},
    {"name": "VariableType", "symbols": ["Identifier"], "postprocess": d => type(d[0].value)},
    {"name": "KeyValue", "symbols": ["Identifier", "_", {"literal":":"}, "_", "Expression"], "postprocess": d => ({ key: d[0].value, value: d[4], position: position(d[0]) })},
    {"name": "KeyValueList", "symbols": ["KeyValue", "_", {"literal":","}, "_", "KeyValueList"], "postprocess": d => [d[0], ...d[4]]},
    {"name": "KeyValueList", "symbols": ["KeyValue"], "postprocess": d => [d[0]]},
    {"name": "TypedIdentifierList", "symbols": ["TypedIdentifier", "_", {"literal":","}, "_", "TypedIdentifierList"], "postprocess": d => [d[0], ...d[4]]},
    {"name": "TypedIdentifierList", "symbols": ["TypedIdentifier"], "postprocess": d => [d[0]]},
    {"name": "TypedIdentifier$ebnf$1", "symbols": [{"literal":"?"}], "postprocess": id},
    {"name": "TypedIdentifier$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "TypedIdentifier", "symbols": ["VariableType", "__", "Identifier", "TypedIdentifier$ebnf$1"], "postprocess": d => ({ type: d[0], value: d[2].value, optional: d[3] !== null })},
    {"name": "Identifier", "symbols": [(lexer.has("Identifier") ? {type: "Identifier"} : Identifier)], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("WhiteSpace") ? {type: "WhiteSpace"} : WhiteSpace)], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": (d) =>  null},
    {"name": "__$ebnf$1", "symbols": [(lexer.has("WhiteSpace") ? {type: "WhiteSpace"} : WhiteSpace)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (lexer.has("WhiteSpace") ? {type: "WhiteSpace"} : WhiteSpace)], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": (d) =>  null}
  ],
  ParserStart: "Program",
};

export default grammar;
