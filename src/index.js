/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import {blocks} from './blocks/prolog';
import {save, load} from './serialization';
import {toolbox} from './toolbox';
import './index.css';

import {prologGenerator} from './generators/prolog';

// Register the blocks and generator with Blockly
Blockly.common.defineBlocks(blocks);

// Set up UI elements and inject Blockly
const codeDiv = document.getElementById('generatedCode').firstChild;
const blocklyDiv = document.getElementById('blocklyDiv');
const ws = Blockly.inject(blocklyDiv, {toolbox});

// This function resets the code and output divs, shows the
// generated code from the workspace, and evals the code.
const runCode = () => {
	const preamble = ":- use_package(import(clpz)).\n";
	const code = preamble + prologGenerator.workspaceToCode(ws);
	codeDiv.innerText = code;
};

// Load the initial state from storage and run the code.
load(ws);
runCode();

// Every time the workspace changes state, save the changes to storage.
ws.addChangeListener((e) => {
	// UI events are things like scrolling, zooming, etc.
	// No need to save after one of these.
	if (e.isUiEvent) return;
	save(ws);
});

// Whenever the workspace changes meaningfully, run the code again.
ws.addChangeListener((e) => {
	// Don't run the code when the workspace finishes loading; we're
	// already running it once when the application starts.
	// Don't run the code during drags; we might have invalid state.
	if (
		e.isUiEvent ||
		e.type == Blockly.Events.FINISHED_LOADING ||
		ws.isDragging()
	) {
		return;
	}
	runCode();
});
