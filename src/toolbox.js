/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/*
This toolbox contains nearly every single built-in block that Blockly offers,
in addition to the custom block 'add_text' this sample app adds.
You probably don't need every single block, and should consider either rewriting
your toolbox from scratch, or carefully choosing whether you need each block
listed here.
*/

export const toolbox = {
	kind: 'categoryToolbox',
	contents: [
		{
			kind: 'category',
			name: 'Logic',
			contents: [
				{
					type: 'prolog_negate',
					kind: 'block',
				},
				{
					'kind': 'block',
					'type': 'predicate_body'
				},
				{
					'kind': 'block',
					'type': 'predicate_body_simple'
				},
			],
		},
		{
			kind: 'category',
			name: 'Relational',
			contents: [
				{
					'kind': 'block',
					'type': 'list_unif'
				},
				{
					'kind': 'block',
					'type': 'dot'
				},
				{
					'kind': 'block',
					'type': 'predicate'
				},
				{
					'kind': 'block',
					'type': 'predicate_simple'
				},
				{
					'kind': 'block',
					'type': 'fact'
				},
			],
		},
		{
			kind: 'category',
			name: 'Structure',
			contents:
			[
				{
					type: 'prolog_stmt',
					kind: 'block',
				},
			]
		}
	]
};
