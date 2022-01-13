/**
 * @typedef dialog_button One of 3 possible dialog buttons; neutral, positive & negative. Only negative will show if all buttons omitted.
 * @property {string|null} [title] Title text of button, required when defining a button.
 * @property {function} [action] Callback function to execute when button is pressed. Will also self close the dialog.
 */

/**
 * @typedef  dialog_options Optional parameters to be used in dialog creation. To be passed as an object.
 * @property {String} [title] Text to be shown on the title bar of the dialog. When omitted from options, will default to 'Alert'
 * @property {dialog_button} [neutral] Neutral button parameters; if none provided button will still be shown with defaults applied.
 * @property {dialog_button} [positive] Positive button parameters; if none provided button will be omitted.
 * @property {dialog_button} [negative] Negative button parameters; if none provided button will be omitted.
 * @property {string} [animate] Animation style when calling show() on a dialog.
 */

 class CustomDialog {

	positive = {
		title: undefined,
		action: null,
		button: undefined,
		set: false,
	}

	negative = {
		title: undefined,
		action: null,
		button: undefined,
		set: false,
	}

	neutral = {
		title: undefined,
		action: null,
		button: undefined,
		set: false,
	}

	dialog = {
		container: null,
		overlay: null,
		title: undefined,
		message: undefined,
		buttons: undefined,
		dismiss: CustomDialog.DISMISSIBLE.FALSE,
		animate: CustomDialog.ANIMATE.NONE
	}

	/**
	 * Creates a custom dialog box Object
	 * @param {string} message Message to be displayed in dialog.
	 * @param {dialog_options|null} [options] Optional parameters
	 */
    constructor(message, options = null) {

        this.dialog.message = message;
        this.dialog.title = options?.title || 'Alert';

		this.positive.title = options?.positive?.title;
		this.positive.action = options?.positive?.action || null;

		this.negative.title = options?.negative?.title;
		this.negative.action = options?.negative?.action || null;

		this.neutral.title = options?.neutral?.title;
		this.neutral.action = options?.neutral?.action || null;

		this.positive.set = this.positive.action !== null || this.positive.title !== undefined;
		this.negative.set = this.negative.action !== null || this.negative.title !== undefined;
		this.neutral.set = this.neutral.action !== null || this.neutral.title !== undefined;

		if (Object.values(CustomDialog.DISMISSIBLE).includes(options?.dismiss)) this.dialog.dismiss = options?.dismiss;
		if (Object.values(CustomDialog.ANIMATE).includes(options?.animate)) this.dialog.animate = options?.animate;

        if (this.dialog.message === undefined) throw(SyntaxError('Dialog message not defined'));

		if (typeof this.positive.action !== 'function' && this.positive.action !== null) throw(SyntaxError('Positive action is not of type function'));
		if (typeof this.negative.action !== 'function' && this.negative.action !== null) throw(SyntaxError('Negative action is not of type function'));
		if (typeof this.neutral.action !== 'function' && this.neutral.action !== null) throw(SyntaxError('Neutral action is not of type function'));

		this._init();

    }

	_init() {

		this.dialog.container = this._createDialogContainer();

		this._addMessage();

		if ((!this.positive.set && !this.negative.set) || this.neutral.set) {

			if (this.neutral.title === undefined) this.neutral.title = 'OK';

			this.neutral.button = this._createButton(this.neutral.title, this.neutral.action, 'neutral');
			this.dialog.buttons.appendChild(this.neutral.button);

		}

		if (this.negative.title !== undefined || this.negative.action !== null) {

			if (this.negative.title === undefined) this.negative.title = 'No';

			this.negative.button = this._createButton(this.negative.title, this.negative.action, 'negative');
			this.dialog.buttons.appendChild(this.negative.button);

		}

		if (this.positive.title !== undefined || this.positive.action !== null) {

			if (this.positive.title === undefined) this.positive.title = 'Yes';

			this.positive.button = this._createButton(this.positive.title, this.positive.action, 'positive');
			this.dialog.buttons.appendChild(this.positive.button);

		}

		document.body.appendChild(this.dialog.container);
		document.body.appendChild(this._createOverlay());

	}

	_createDialogContainer() {

		const div = document.createElement('div');
		const p = document.createElement('p');

		p.className = 'custom-dialog-title';
		p.textContent = this.dialog.title;

		div.className = 'custom-dialog-container';
		div.appendChild(p);

		if (this.dialog.animate !== CustomDialog.ANIMATE.NONE) {

			div.classList.add(this.dialog.animate.toString());

		}

		return div;

	}

	_addMessage() {

		const p = document.createElement('p');

		p.className = 'custom-dialog-message';
		p.textContent = this.dialog.message;

		this.dialog.container.appendChild(p);

	}

	_createButton(title, _callback = null, type = 'neutral') {

		if (this.dialog.buttons === undefined) this._createButtonContainer();

		const button = document.createElement('button');

		button.classList.add('custom-dialog-button');
		button.classList.add(`custom-dialog-button-${type}`)

		button.textContent = title;
		button.onclick = () => this._dismiss(_callback);

		return button;

	}

	_createButtonContainer() {

		const div = document.createElement('div');

		div.className = 'custom-dialog-buttons';

		this.dialog.buttons = div;
		this.dialog.container.appendChild(div);

	}

	_createOverlay() {

		const div = document.createElement('div');

		div.className = 'custom-dialog-overlay';

		this.dialog.overlay = div;

		if (this.dialog.dismiss) div.onclick = () => {
			this._dismiss(null);
		}

		return div;

	}

	_dismiss(_callback) {

		this.dialog.container.classList.remove('custom-dialog-container-visible');

		setTimeout(() => {
			this.dialog.container.remove();
			this.dialog.overlay.remove();
			this.dialog = null;
		}, 400);

		if (typeof _callback === 'function') _callback();

		return null;

	}

	show() {

		setTimeout(() => {

			this.dialog.container.classList.add('custom-dialog-container-visible');

		}, 10);

	}

	static DISMISSIBLE = {
		TRUE: true,
		FALSE: false
	}

	/**
	 *
	 * @type {{SLIDE_TOP: {string}, SLIDE_BOTTOM: string, SLIDE_RIGHT: string, NONE: string, FADE: string, SLIDE_LEFT: string}}
	 */
	static ANIMATE = {
		NONE: '',
		FADE: 'custom-dialog-container-slide-fade',
		SLIDE_LEFT: 'custom-dialog-container-slide-left',
		SLIDE_RIGHT: 'custom-dialog-container-slide-right',
		SLIDE_TOP: 'custom-dialog-container-slide-top',
		SLIDE_BOTTOM: 'custom-dialog-container-slide-bottom',
	}

}