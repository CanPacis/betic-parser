interface BeticProgram {
	imports: BeticImportStatement[];
	program: BeticProgramStatement[];
	template: [];
}

interface BeticImportStatement {
	source: {
		value: string;
		position: IBeticPosition;
	};
	as: string;
	position: IBeticPosition;
}

type BeticProgramStatement =
	| BeticVariableDefinitionStatement
	| BeticTypeDefinitionStatement
	| BeticFunctionDefinitionStatement
	| BeticMicroDefinitionStatement
	| BeticMacroDefinitionStatement
	| BeticForStatement
	| BeticIfStatement
	| BeticSwitchStatement
	| BeticAssignStatement
	| BeticQuantityModifierStatement
	| BeticTryCatchStatement
	| BeticCommentStatement
	| BeticExpressionStatement;

interface BeticVariableDefinitionStatement {
	operation: 'variable_definition';
	constant: boolean;
	expected: boolean;
	type: IBeticPrimitiveType;
	name: string;
	value: BeticExpressionStatement;
	position: IBeticPosition;
}
interface BeticTypeDefinitionStatement {
	operation: 'type_definition';
	name: string;
	body: IBeticArgument[];
	position: IBeticPosition;
}
interface BeticFunctionDefinitionStatement {
	operation: 'function_definition';
	name: string;
	type: IBeticPrimitiveType;
	arguments: IBeticArgument[];
	body: IBeticCodeBlock;
	position: IBeticPosition;
}
interface BeticMicroDefinitionStatement {
	operation: 'micro_definition';
	name: string;
	type: IBeticPrimitiveType;
	prototype: IBeticArgument;
	body: IBeticCodeBlock;
	position: IBeticPosition;
}
interface BeticMacroDefinitionStatement {
	operation: 'macro_definition';
	name: string;
	type: IBeticPrimitiveType;
	prototype: IBeticArgument;
	arguments: IBeticArgument[];
	body: IBeticCodeBlock;
	position: IBeticPosition;
}
interface BeticForStatement {
	operation: 'for_statement';
	statement: BeticExpressionStatement;
	placeholder: string;
	body: IBeticCodeBlock;
	position: IBeticPosition;
}
interface BeticIfStatement {
	operation: 'if_statement';
	condition: BeticExpressionStatement;
	body: IBeticCodeBlock;
	elifs: {
		condition: BeticExpressionStatement;
		body: IBeticCodeBlock;
	}[];
	else: IBeticCodeBlock;
	position: IBeticPosition;
}
interface BeticSwitchStatement {
	operation: 'switch_statement';
	condition: BeticExpressionStatement;
	cases: {
		case: BeticExpressionStatement;
		body: IBeticCodeBlock;
	}[];
	position: IBeticPosition;
}
interface BeticAssignStatement {
	operation: 'assign_statement';
	left: BeticExpressionStatement;
	right: BeticExpressionStatement;
	position: IBeticPosition;
}
interface BeticQuantityModifierStatement {
	operation: 'quantity_modifier';
	type: TBeticQuantityModifierType;
	statement: BeticExpressionStatement;
	position: IBeticPosition;
}
interface BeticTryCatchStatement {
	operation: 'try_catch_block';
	tries: BeticProgramStatement[];
	catches: BeticProgramStatement[];
	arguments: IBeticArgument[];
}
interface BeticCommentStatement {
	operation: 'comment';
	value: string;
	position: IBeticPosition;
}

type BeticExpressionStatement =
	| BeticArithmeticExpression
	| BeticMapValueGetterExpression
	| BeticListValueGetterExpression
	| BeticFunctionCallExpression
	| BeticMicroCallExpression
	| BeticMacroCallExpression
	| BeticConditionExpression
	| BeticPrimitiveExpression
	| BeticReferenceExpression;

interface BeticArithmeticExpression {
	operation: 'arithmetic';
	type: TBeticArithmeticType;
	left: BeticExpressionStatement;
	right: BeticExpressionStatement;
	position: IBeticPosition;
}
interface BeticMapValueGetterExpression {
	operation: 'map_value_getter';
	left: BeticExpressionStatement;
	right: BeticExpressionStatement;
	position: IBeticPosition;
}
interface BeticListValueGetterExpression {
	operation: 'list_value_getter';
	source: BeticExpressionStatement;
	index: BeticExpressionStatement;
	position: IBeticPosition;
}
interface BeticFunctionCallExpression {
	operation: 'function_call';
	name: BeticExpressionStatement;
	arguments: BeticExpressionStatement[];
	position: IBeticPosition;
}
interface BeticMicroCallExpression {
	operation: 'micro_call';
	name: BeticExpressionStatement;
	arguments: BeticExpressionStatement[];
	position: IBeticPosition;
}
interface BeticMacroCallExpression {
	operation: 'macro_call';
	name: BeticExpressionStatement;
	arguments: BeticExpressionStatement[];
	position: IBeticPosition;
}
interface BeticConditionExpression {
	operation: 'condition';
	type: TBeticConditionType;
	left: BeticExpressionStatement;
	right: BeticExpressionStatement;
}
interface BeticPrimitiveExpression {
	operation: 'primitive';
	type: IBeticPrimitiveType;
	value: string;
	position: IBeticPosition;
}
interface BeticReferenceExpression {
	opration: 'reference';
	value: string;
	position: IBeticPosition;
}

interface IBeticPosition {
	col: number;
	line: number;
}

interface IBeticCodeBlock {
	block: BeticProgramStatement[];
	provides: BeticExpressionStatement | null;
}

type TBeticQuantityModifierType =
	| 'increment'
	| 'decrement'
	| 'add'
	| 'subtract'
	| 'multiply'
	| 'divide';

type TBeticArithmeticType =
	| 'addition'
	| 'subtraction'
	| 'multiplication'
	| 'division'
	| 'exponent'
	| 'root'
	| 'modulus';

type TBeticConditionType =
	| 'and'
	| 'or'
	| 'less_than'
	| 'greater_than'
	| 'less_than_equals'
	| 'greater_than_equals'
	| 'equals'
	| 'nand'
	| 'nor'
	| 'not_less_than'
	| 'not_greater_than'
	| 'not_less_than_equals'
	| 'not_greater_than_equals'
	| 'not_equals';

interface IBeticPrimitiveType {
	base: TBeticPrimitiveType;
	of?: IBeticPrimitiveType;
}

interface IBeticArgument {
	type: IBeticPrimitiveType;
	value: string;
	optional: boolean;
}

type TBeticPrimitiveType =
	| 'Int'
	| 'Double'
	| 'String'
	| 'Boolean'
	| 'Occult'
	| 'Void'
	| 'Map'
	| 'List'
	| 'Function'
	| string;

declare class BeticParser {
	constructor();
	parse: (input: string) => BeticProgram;
}
