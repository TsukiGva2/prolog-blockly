import * as Blockly from 'blockly';

/* AI GENERATED */
/*
 * MODEL: CHATGPT
 */

const TUPLE_MUTATOR_MIXIN = {
	itemCount_: 1,

	mutationToDom: function() {
		const container = Blockly.utils.xml.createElement('mutation');
		container.setAttribute('items', this.itemCount_);
		return container;
	},

	domToMutation: function(xmlElement) {
		const items = parseInt(xmlElement.getAttribute('items'), 10);
		this.itemCount_ = isNaN(items) ? 1 : items;
		this.updateShape_();
	},

	updateShape_: function() {
		for (let i = 0; i < this.itemCount_; i++) {
			if (!this.getInput('ITEM' + i)) {
				const input = this.appendValueInput('ITEM' + i);
				if (i > 0) input.appendField('→');
			}
		}
	},

	onchange: function(e) {
		if (!e || e.isUiEvent) return;

		const lastIndex = this.itemCount_ - 1;
		const lastInput = this.getInput('ITEM' + lastIndex);
		if (!lastInput) return;

		const lastBlock = lastInput.connection.targetBlock();

		if (!lastBlock) return;

		if (['predicate_body_simple', 'predicate_body', 'dot'].includes(lastBlock.type)) return;

		this.itemCount_++;
		const input = this.appendValueInput('ITEM' + (this.itemCount_ - 1));
		input.appendField('→');
		if (this.rendered) {
			this.initSvg();
			this.render();
		}
	}
};

Blockly.Extensions.registerMutator(
	'tuple_mutator',
	TUPLE_MUTATOR_MIXIN,
	null,
	[]
);

Blockly.Extensions.register('prolog_negation_style', function() {
	this.svgGroup.classList.add('prologNegation');
});

Blockly.Extensions.register('prolog_predicate_style', function() {
	this.svgGroup.classList.add('prologPredicate');
});

Blockly.Extensions.register('prolog_dot_style', function() {
	this.svgGroup.classList.add('prologDot');
});

Blockly.Extensions.register('prolog_rule_style', function() {
	this.svgGroup.classList.add('prologRule');
});

Blockly.Extensions.register('prolog_iff_style', function() {
	this.svgGroup.classList.add('prologIff');
});

Blockly.Extensions.register('prolog_atom_style', function() {
	this.svgGroup.classList.add('prologAtom');
});
/* END AI BLOCK */

const themes =
	[
		{
			'predicate':"F5D2D2",
			'special':"F8F7BA",
			'math':"BDE3C3",
			'fact':"A3CCDA"
		},
		{
			'predicate':"B77466",
			'special':"FFE1AF",
			'math':"E2B59A",
			'fact':"957C62"
		}
	];
const theme = themes[1];


export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([

	/* main stuff */
	{
		"type": "predicate",
		"message0": "%1",
		"args0": [
			{
				"type": "field_input",
				"name": "PRED_NAME",
				"text": "P",
			},
		],
		"output": null,
		"colour": "#"+theme.predicate,
		"inputsInline": false,
		"mutator": "tuple_mutator",
		"extensions": ["prolog_predicate_style"]
	},
	{
		"type": "predicate_simple",
		"message0": "inline %1",
		"args0": [
			{
				"type": "field_input",
				"name": "PRED_NAME",
				"text": "P"
			},
		],
		"output": null,
		"colour": "#"+theme.predicate,
		"inputsInline": true,
		"extensions": ["prolog_predicate_style"],
		"mutator": "tuple_mutator"
	},
	{
		"type": "predicate_body",
		"message0": "α",
		"args0": [],
		"output": null,
		"colour": "#"+theme.special,
		"inputsInline": false,
		"extensions": ["prolog_rule_style"],
		"mutator": "tuple_mutator"
	},
	{
		"type": "predicate_body_simple",
		"message0": "inline α",
		"args0": [],
		"output": null,
		"colour": "#"+theme.special,
		"inputsInline": true,
		"extensions": ["prolog_iff_style"],
		"mutator": "tuple_mutator"
	},
	{
		"type": "fact",
		"message0": "%1",
		"args0": [
			{
				"type": "field_input",
				"name": "ATOM",
				"text": "c"
			}
		],
		"output": null,
		"extensions": ["prolog_atom_style"],
		"colour": "#"+theme.fact,
	},
	{
		"type": "dot",
		"message0": "ϕ",
		"args0": [],
		"output": null,
		"extensions": ["prolog_dot_style"],
		"colour": "#"+theme.fact,
	},
	{
		"type": "list_unif",
		"message0": "%1 | %2",
		"args0": [
			{
				"type": "field_input",
				"name": "VAR",
				"text": "X"
			},
			{
				"type": "field_input",
				"name": "REST",
				"text": "Xs"
			}
		],
		"output": null,
		"extensions": ["prolog_atom_style"],
		"colour": "#"+theme.fact,
	},
	{
		"type": "prolog_negate",
		"message0": "%1 %2",
		"args0": [
			{
				"type": "field_image",
				"src": "https://cdn4.iconfinder.com/data/icons/maths-symbol/128/mathematics-28-512.png",
				"width": 15,
				"height": 15,
				"alt": "~"
			},
			{
				"type": "input_value",
				"name": "VALUE",
			},
		],
		"output": null,
		"extensions": ["prolog_negation_style"],
		"colour": "#"+theme.special
	},
	{
		"type": "prolog_stmt",
		"message0": "%1 %2",
		"args0": [
			{
				"type": "input_value",
				"name": "VALUE",
			},
			{
				"type": "field_image",
				"src": "https://media.pronunciationstudio.com/2023/02/glottal-stop.png",
				"width": 15,
				"height": 15,
				"alt": "."
			},
		],
		"inputsInline": true,
		"extensions": ["prolog_negation_style"],
		"colour": "#"+theme.fact
	},
]);

