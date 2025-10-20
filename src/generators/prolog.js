import * as Blockly from 'blockly';

export const prologGenerator = new Blockly.CodeGenerator('prolog');

const Order = {
	ATOMIC: 0,
};

function generatePredicate(block, generator) {
	const predicate = block.getFieldValue("PRED_NAME");

	if (block.itemCount_ < 2) return [predicate.toLowerCase(), Order.ATOMIC];

	let items = [];

	let i;
	for (i = 0; i < block.itemCount_; i++) {
		let itemCode = generator.valueToCode(block, `ITEM${i}`, Order.ATOMIC);

		if (!itemCode) break;
		if (itemCode === '.') break;

		items.push(itemCode);
	}

	i = block.itemCount_ - 1;

	const lastInput = block.getInput(`ITEM${i}`);
	const last      = lastInput ? lastInput.connection.targetBlock() : null;
	console.log(last);

	if (last && last.type === 'predicate_body') {

		const args = items.slice(0, -1).join(',');
		const body = items[i];

		const code = `${predicate.toLowerCase()}(${args}) :- ${body}`;
		return [code, Order.ATOMIC];
	}

	const code = `${predicate.toLowerCase()}(${items.join(',')})`;
	return [code, Order.ATOMIC];
}

function generatePredicateBody(block, generator) {
	let items = [];

	let i;
	for (i = 0; i < block.itemCount_; i++) {
		let itemCode = generator.valueToCode(block, `ITEM${i}`, Order.ATOMIC);

		if (!itemCode) break;
		if (itemCode === '.') break;

		items.push(itemCode);
	}

	const code = `(${items.join(',')})`;

	return [code, Order.ATOMIC];
}

prologGenerator.forBlock['predicate_body'] = generatePredicateBody;
prologGenerator.forBlock['predicate_body_simple'] = generatePredicateBody;

prologGenerator.forBlock['predicate'] = generatePredicate;
prologGenerator.forBlock['predicate_simple'] = generatePredicate;

prologGenerator.forBlock['list_unif'] = function (block) {
	const variable = block.getFieldValue("VAR");
	const rest = block.getFieldValue("REST");

	const code = `[${variable} | ${rest}]`;

	return [code, Order.ATOMIC];
}

prologGenerator.forBlock['prolog_negate'] = function (block, generator) {
	const toNegate = generator.valueToCode(block, 'VALUE', Order.ATOMIC);

	const code = `\\+ ${toNegate}`;

	return [code, Order.ATOMIC];
};

prologGenerator.forBlock['prolog_stmt'] = function (block, generator) {
	const inner = generator.valueToCode(block, 'VALUE', Order.ATOMIC);

	const code = `${inner}.`;

	return code;
};

prologGenerator.forBlock['fact'] = function (block) {
	const textValue = block.getFieldValue("ATOM");
	const code = `${textValue}`;
	return [code, Order.ATOMIC];
};

prologGenerator.forBlock['dot'] = function (block) {
	return ['.', Order.ATOMIC];
};

