'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const reactAvatar = require('@seed-design/react-avatar');
const reactCheckbox = require('@seed-design/react-checkbox');
const reactDialog = require('@seed-design/react-dialog');
const reactPopover = require('@seed-design/react-popover');
const reactProgress = require('@seed-design/react-progress');
const reactPullToRefresh = require('@seed-design/react-pull-to-refresh');
const reactRadioGroup = require('@seed-design/react-radio-group');
const reactSlider = require('@seed-design/react-slider');
const reactSnackbar = require('@seed-design/react-snackbar');
const reactSwitch = require('@seed-design/react-switch');
const reactTabs = require('@seed-design/react-tabs');
const reactToggle = require('@seed-design/react-toggle');



Object.keys(reactAvatar).forEach(k => {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: () => reactAvatar[k]
	});
});
Object.keys(reactCheckbox).forEach(k => {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: () => reactCheckbox[k]
	});
});
Object.keys(reactDialog).forEach(k => {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: () => reactDialog[k]
	});
});
Object.keys(reactPopover).forEach(k => {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: () => reactPopover[k]
	});
});
Object.keys(reactProgress).forEach(k => {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: () => reactProgress[k]
	});
});
Object.keys(reactPullToRefresh).forEach(k => {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: () => reactPullToRefresh[k]
	});
});
Object.keys(reactRadioGroup).forEach(k => {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: () => reactRadioGroup[k]
	});
});
Object.keys(reactSlider).forEach(k => {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: () => reactSlider[k]
	});
});
Object.keys(reactSnackbar).forEach(k => {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: () => reactSnackbar[k]
	});
});
Object.keys(reactSwitch).forEach(k => {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: () => reactSwitch[k]
	});
});
Object.keys(reactTabs).forEach(k => {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: () => reactTabs[k]
	});
});
Object.keys(reactToggle).forEach(k => {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: () => reactToggle[k]
	});
});
