'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const reactAvatar = require('@grape-design/react-avatar');
const reactCheckbox = require('@grape-design/react-checkbox');
const reactDialog = require('@grape-design/react-dialog');
const reactPopover = require('@grape-design/react-popover');
const reactProgress = require('@grape-design/react-progress');
const reactPullToRefresh = require('@grape-design/react-pull-to-refresh');
const reactRadioGroup = require('@grape-design/react-radio-group');
const reactSlider = require('@grape-design/react-slider');
const reactSnackbar = require('@grape-design/react-snackbar');
const reactSwitch = require('@grape-design/react-switch');
const reactTabs = require('@grape-design/react-tabs');
const reactToggle = require('@grape-design/react-toggle');



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
