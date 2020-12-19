@{%

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
})

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

%}

@preprocessor typescript
@lexer lexer

Program 
  -> _ (Import _ {% id %}):*
  (Main _ {% id %}):* 
  (TemplateWrapper _ {% id %}):?
  {% d => ({ imports: d[1], program: d[2], template: d[3] || [] }) %}

Import -> "import" __ String (_ "as" __ Identifier {% d => d[3].value %}):?
  {% d => ({ 
    source: { value: d[2].value, position: d[2].position },
    as: d[3],
    position: position(d[0])
  }) %}

Provide -> "provide" (__ Expression {% d => d[1] %}):? 
  {% d => ({
    body: d[1],
    position: position(d[0])
  }) %}

## Templating Stuff

TemplateWrapper -> "&" _ 
  "{" _ (Template _ {% id %}):* "}" {% d => d[4] %}

Template
  -> Tag {% id %}
  | TemplateIfStatement {% id %}
  | TemplateForStatement {% id %}
  | TemplateSwitchStatement {% id %}
  | Comment {% id %}

Tag -> Identifier _ "-" ">" _ "{" _ (AttributeList _ {% id %}):* "}"
  (_ "(" _ ((Expression {% id %}| Template {% id %}) _ {% id %}):* ")" 
  {% d => d[3] %}):?
  {% d => ({
    operation: "tag",
    name: d[0].value,
    attributes: d[7][0],
    body: d[9] || [],
    position: position(d[0])
  }) %}

AttributeList 
  -> Attribute _ "," _ AttributeList {% d => [d[0], ...d[4]] %}
  | Attribute {% d => [d[0]] %}

Attribute -> (Identifier {% id %}| AttributeKeyword {% id %}) 
  ("=" Expression {% d => d[1] %}):?
  {% d => ({ 
    key: d[0].value, 
    value: d[1] || {
			operation: "reference",
			value: d[0].value,
			position: position(d[0])
		}, 
    position: position(d[0]) 
  }) %}

AttributeKeyword 
  -> "try" {% id %}

Main 
  -> VariableDefinition {% id %}
  | TypeDefinition {% id %}
  | Expression {% id %}
  | MicroDefinition {% id %}
  | MacroDefinition {% id %}
  | FunctionDefinition {% id %}
  | ForStatement {% id %}
  | IfStatement {% id %}
  | SwitchStatement {% id %}
  | AssignStatement {% id %}
  | QuantityModifier {% id %}
  | TryCatch {% id %}
  | Comment {% id %}

## Statements

TryCatch -> "try" _ CodeBlock _ "catch" _ FunctionArguments _ CodeBlock
  {% d => ({ 
    operation: "try_catch_block", 
    tries: d[2].block,
    catches: d[8].block, 
    arguments: d[6].data
  }) %}

QuantityModifier 
  -> Mutatable "+" "+" 
    {% d => ({ operation: "quantity_modifier", type: "increment", statement: d[0], position: d[0].position }) %}
  | Mutatable "-" "-"
    {% d => ({ operation: "quantity_modifier", type: "decrement", statement: d[0], position: d[0].position }) %}
  | Mutatable _ "+" "=" _ Expression
    {% d => ({ operation: "quantity_modifier", type: "add", statement: d[0], right: d[5], position: d[0].position }) %}
  | Mutatable _ "-" "=" _ Expression
    {% d => ({ operation: "quantity_modifier", type: "subtract", statement: d[0], right: d[5], position: d[0].position }) %}
  | Mutatable _ "*" "=" _ Expression
    {% d => ({ operation: "quantity_modifier", type: "multiply", statement: d[0], right: d[5], position: d[0].position }) %}
  | Mutatable _ "/" "=" _ Expression
    {% d => ({ operation: "quantity_modifier", type: "divide", statement: d[0], right: d[5], position: d[0].position }) %}

AssignStatement -> Mutatable _ "=" _ Expression
  {% d => ({ 
    operation: "assign_statement", 
    left: d[0], 
    right: d[4],
    position: d[0].position 
  }) %}

SwitchStatement -> "switch" __ Expression _ 
  "{" _ ("case" __ Expression _ CodeBlock _ 
  {% d => ({ case: d[2], body: d[4] }) %}):* "}"
  {% d => ({ 
    operation: "switch_statement", 
    condition: d[2],
    cases: d[6],
    position: position(d[0])
  }) %}

TemplateSwitchStatement -> "switch" __ Expression _ 
  "{" _ ("case" __ Expression _ TemplateBlock _ 
  {% d => ({ case: d[2], body: d[4] }) %}):* "}"
  {% d => ({ 
    operation: "switch_statement", 
    condition: d[2],
    cases: d[6],
    position: position(d[0])
  }) %}

IfStatement -> "if" __ Expression _ CodeBlock 
  (_ "elif" __ Expression _ CodeBlock 
  {% d => ({ condition: d[3], body: d[5] }) %}):*
  (_ "else" _ CodeBlock {% d => d[3] %}):?
  {% d => ({ 
    operation: "if_statement", 
    condition: d[2], 
    body: d[4],
    elifs: d[5],
    else: d[6],
    position: position(d[0])
  }) %}

TemplateIfStatement -> "if" __ Expression _ TemplateBlock 
  (_ "elif" __ Expression _ TemplateBlock 
  {% d => ({ condition: d[3], body: d[5] }) %}):*
  (_ "else" _ TemplateBlock {% d => d[3] %}):?
  {% d => ({ 
    operation: "if_statement", 
    condition: d[2], 
    body: d[4],
    elifs: d[5],
    else: d[6],
    position: position(d[0])
  }) %}

ForStatement -> "for" __ Expression __ "as" __ Identifier _ CodeBlock
  {% d => ({ 
    operation: "for_statement", 
    statement: d[2], 
    placeholder: d[6].value, 
    body: d[8],
    position: position(d[0]) 
  }) %}

TemplateForStatement 
  -> "for" __ Expression __ "as" __ Identifier _ TemplateBlock
  {% d => ({ 
    operation: "for_statement", 
    statement: d[2], 
    placeholder: d[6].value, 
    body: d[8],
    position: position(d[0]) 
  }) %}

TypeDefinition 
  -> "define" __ Identifier _ "{" _ (TypedIdentifierList _ {% id %}):? "}"
  {% d => ({ 
    operation: "type_definition", 
    name: d[2].value,
    body: d[6] || [],
    position: position(d[0])
  }) %}

VariableDefinition 
  -> ("const" __ {% id %} | "var" __ {% id %}) ("expected" __ {% id %}):?  VariableType __ Identifier _ ":" "=" _ Expression 
  {% d => ({ 
    operation: "variable_definition",
    constant: d[0].value === "const",
    expected: d[1] !== null,
    type: d[2],
    name: d[4].value, 
    value: d[9],
    position: position(d[0])
  }) %}

FunctionDefinition 
  -> "func" _ "-" ">" _ VariableType __ Identifier _ 
  FunctionArguments _ 
  CodeBlock
  {% d => ({ 
    operation: "function_definition", 
    return_type: d[5],
    name: d[7].value, 
    arguments: d[9].data,
    body: d[11],
    position: position(d[0])
  }) %}

MicroDefinition 
  -> "micro" _ "-" ">" _ VariableType __ Identifier __ 
  TypedIdentifier _ 
  CodeBlock
  {% d => ({ 
    operation: "micro_definition", 
    type: d[5],
    name: d[7].value, 
    prototype: d[9],
    body: d[11],
    position: position(d[0])
  }) %}

MacroDefinition 
  -> "macro" _ "-" ">" _ VariableType __ Identifier __ 
  TypedIdentifier _ FunctionArguments _
  CodeBlock
  {% d => ({ 
    operation: "macro_definition", 
    type: d[5],
    name: d[7].value, 
    prototype: d[9],
    arguments: d[11].data,
    body: d[13],
    position: position(d[0])
  }) %}

Comment -> "#" [^#]:* "#"  
  {% d => ({ 
    operation: "comment", 
    value: d[1]?.map((d: any) => d.value).join(""),
    position: position(d[0])
  }) %}

## Misc

CodeBlock -> "{" _ (Main _ {% id %}):* (Provide _ {% id %}):? "}"
  {% d => ({ block: d[2], provides: d[3] }) %}

TemplateBlock -> "{" _ (Template _ {% id %}):* "}"
  {% d => ({ block: d[2] }) %}

FunctionArguments -> "(" _ (TypedIdentifierList _ {% id %}):? ")"
  {% d => ({ data: d[2] || [], ...position(d[0]) }) %}

Mutatable 
  -> VariableReference {% id %}
  | MapValueGetter {% id %}
  | ListValueGetter {% id %} 

## Expressions

Expression
  -> Expression _ "+" _ MultDiv {% d => arithmetic("addition", d) %}
  | Expression _ "-" _ MultDiv {% d => arithmetic("subtraction", d) %}
  | MultDiv {% id %}

MultDiv 
  -> MultDiv _ "*" _ Exponent {% d => arithmetic("multiplication", d) %}
  | MultDiv _ "/" _ Exponent {% d => arithmetic("division", d) %}
  | Exponent {% id %}

Exponent 
  -> MVG_FC _ "^" _ Exponent {% d => arithmetic("exponent", d) %}
  | MVG_FC _ "'" _ Exponent {% d => arithmetic("root", d) %}
  | MVG_FC _ "%" _ Exponent {% d => arithmetic("modulus", d) %}
  | MVG_FC {% id %}

MVG_FC 
  -> MapValueGetter {% id %}
  | ListValueGetter {% id %}
  | FunctionCall {% id %}
  | MicroCall {% id %}
  | MacroCall {% id %}
  | Conditions {% id %}
  | SubExpression {% id %}

MapValueGetter -> MVG_FC ":" SubExpression
  {% d => ({ 
    operation: "map_value_getter", 
    left: d[0], 
    right: d[2],
    position: d[0].position 
  }) %}

ListValueGetter -> MVG_FC "[" _ Expression _ "]"
  {% d => ({ 
    operation: "list_value_getter", 
    source: d[0], 
    index: d[3],
    position: d[0].position 
  }) %}

FunctionCall 
  -> MVG_FC _ "(" _ (ArgumentList _ {% id %}):? ")"
    {% d => ({ 
      operation: "function_call", 
      name: d[0], 
      arguments: d[4] || [],
      position: d[0].position
    }) %}

MicroCall -> MVG_FC "." SubExpression
  {% d => ({ 
    operation: "micro_call", 
    name: d[2], 
    arguments: [d[0]],
    position: d[0].position
  }) %}

MacroCall -> MVG_FC "-" ">" SubExpression 
  _ "(" _ (ArgumentList _ {% id %}):? ")"
  {% d => ({ 
    operation: "macro_call", 
    name: d[3], 
    arguments: [d[0], ...d[7]],
    position: d[0].position
  }) %}

Conditions -> Expression _ %ConditionSign _ SubExpression
  {% d => ({ 
    operation: "condition", 
    type: getCondition(d[2].value), 
    left: d[0], 
    right: d[4],
    position: d[0].position 
  }) %}

SubExpression
  -> Primitive {% id %}
  | VariableReference {% id %}
  | Grouping {% id %}

ManuelCast -> Expression _ "as" _ VariableType
  {% d => ({ 
    operation: "manuel_cast", 
    expression: d[0], 
    type: d[4] 
  }) %}

Grouping -> "{" (Expression {% id %}| ManuelCast {% id %}) "}"
  {% d => d[1] %}

ArgumentList 
  -> Expression _ "," _ ArgumentList {% d => [d[0], ...d[4]] %}
  | Expression {% d => [d[0]] %}


VariableReference -> Identifier 
  {% d => ({ 
    operation: "reference", 
    value: d[0].value,
    position: { line: d[0].line, col: d[0].col }
  }) %}

Primitive 
  -> Number {% id %} 
  | String {% id %}
  | Boolean {% id %}
  | CustomMap {% id %}
  | List {% id %}
  | Map {% id %}
  | Function {% id %}
  | None {% id %}

None -> "none" 
  {% d => primitive(type("None"), 
  { value: d[0].value, position: position(d[0]) }) %}

Function 
  -> FunctionArguments _ "-" ">" _ VariableType _ 
  CodeBlock
  {% d => primitive(type("Function", d[5]),
  { body: d[7], arguments: d[0].data, position: position(d[0]) }) %}

List -> "<" _ VariableType _ ">" "[" _ (ArgumentList _ {% id %}):? "]"
  {% d => primitive(type("List", d[2]), 
  { value: d[7] || [], position: position(d[0]) }) %}

Map -> "<" _ VariableType _ ">" "{" _ (KeyValueList _ {% id %}):? "}"
  {% d => primitive(type("Map", d[2]), 
  { value: d[7] || [], position: position(d[0]) }) %}

CustomMap -> Identifier _ "{" _ (KeyValueList _ {% id %}):? "}"
  {% d => primitive(type(d[0].value), 
  { value: d[4] || [], position: position(d[0]) }) %}

Boolean -> %BooleanLiteral 
  {% d => primitive(type("Boolean"), 
  { value: d[0].value, position: position(d[0]) }) %}

Number -> %NumberLiteral {% d => primitive(d[0].value.includes(".") ? type("Double") : type("Int"), { 
    value: d[0].value,
    position: position(d[0])
  })  %} | %BinaryLiteral {% d => primitive(type("Int"), { 
    value: parseInt(d[0].value.substr(2), 2).toString(),
    position: position(d[0])
  })  %} | %HexLiteral {% d => primitive(type("Int"), { 
    value: parseInt(d[0].value.substr(2), 16).toString(),
    position: position(d[0])
  })  %} | %OctalLiteral {% d => primitive(type("Int"), { 
    value: parseInt(d[0].value.substr(2), 8).toString(),
    position: position(d[0])
  })  %}

String -> %StringLiteral {% d => primitive(type("String"), { 
    value: d[0].value,
    position: position(d[0])
  }) %}

VariableType
  -> %VariableType 
    {% d => ({ base: d[0].value }) %} 
  | "Function" "<" _ VariableType _ ">"
    {% d => type("Function", d[3]) %}
  | "Map" "<" _ VariableType _ ">"
    {% d => type("Map", d[3]) %}
  | "List" "<" _ VariableType _ ">"
    {% d => type("List", d[3]) %}
  | Identifier {% d => type(d[0].value) %}

KeyValue -> Identifier _ ":" _ Expression
  {% d => ({ key: d[0].value, value: d[4], position: position(d[0]) }) %}

KeyValueList 
  -> KeyValue _ "," _ KeyValueList {% d => [d[0], ...d[4]] %}
  | KeyValue {% d => [d[0]] %}

TypedIdentifierList
  -> TypedIdentifier _ "," _ TypedIdentifierList {% d => [d[0], ...d[4]] %}
  | TypedIdentifier {% d => [d[0]] %}

TypedIdentifier -> VariableType __ Identifier "?":?
  {% d => ({ type: d[0], value: d[2].value, optional: d[3] !== null }) %}

Identifier -> %Identifier {% id %}

_ -> %WhiteSpace:*  {% (d) =>  null %}
__ -> %WhiteSpace:+     {% (d) =>  null %}