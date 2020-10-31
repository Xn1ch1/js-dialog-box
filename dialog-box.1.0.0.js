class DialogBox {

	constructor({

		titleText,
		messageText,
		trueButtonText,
		falseButtonText,
		neutralButtonText

	}) {

		this.titleText = titleText || 'Error';
		this.messageText = messageText || 'Something unexpected has gone wrong. If the problem persists, contact your administrator';
		this.trueButtonText = trueButtonText || 'OK';
		this.falseButtonText = falseButtonText || null;
		this.neutralButtonText = neutralButtonText || null;

		this.hasFalse = falseButtonText != null;
		this.hasNeutral = neutralButtonText != null;

		this.dialogue = undefined;
		this.trueButton = undefined;
		this.falseButton = undefined;
		this.neutralButton = undefined;
		this.parent = document.body;

		this._createDialog(this);
		this._appendDialog();


	}

	_createDialog(context) {

		this.dialogue = document.createElement("div");
		this.dialogue.classList.add("confirm-dialogue");

		this.dialogue.style.opacity = 0;

		const title = document.createElement("h3");
		title.textContent = this.titleText;
		title.classList.add("confirm-dialogue-title");
		this.dialogue.appendChild(title);

		const question = document.createElement("h4");
		question.textContent = this.messageText;
		question.classList.add("confirm-dialogue-message");
		this.dialogue.appendChild(question);

		const buttonContainer = document.createElement('div');
		buttonContainer.classList.add('confirm-dialogue-button-container');
		this.dialogue.appendChild(buttonContainer);

		this.trueButton = document.createElement("a");
		this.trueButton.classList.add(
			"confirm-dialogue-button",
			"confirm-dialogue-button--true"
		);
		this.trueButton.textContent = this.trueButtonText;
		this.trueButton.addEventListener('click', function() {
			context._destroy();
		});
		buttonContainer.appendChild(this.trueButton);

		if (this.hasFalse) {
			this.falseButton = document.createElement("a");
			this.falseButton.classList.add(
				"confirm-dialogue-button",
				"confirm-dialogue-button--false"
			);
			this.falseButton.textContent = this.falseButtonText;
			this.falseButton.addEventListener('click', function() {
				context._destroy();
			});
			buttonContainer.appendChild(this.falseButton);
		}

		if (this.hasNeutral) {
			this.neutralButton = document.createElement("a");
			this.neutralButton.classList.add(
				"confirm-dialogue-button",
				"confirm-dialogue-button--neutral"
			);
			this.neutralButton.textContent = this.neutralButtonText;
			this.neutralButton.addEventListener('click', function() {
				context._destroy();
			});
			buttonContainer.appendChild(this.neutralButton);
		}

	}

	_appendDialog() {
		var d = this.dialogue;
		this.parent.appendChild(d);
		setTimeout(function(){
			d.style.opacity = 1;
		}, 0);
	}

	_destroy() {
		this.parent.removeChild(this.dialogue);
		delete this;
	}

	respond() {
		return new Promise((resolve, reject) => {

			const somethingWentWrongUponCreation = !this.dialogue || !this.trueButton;

			if (somethingWentWrongUponCreation) {
				reject("Something went wrong upon modal creation");
			}

			this.trueButton.addEventListener("click", () => {
				resolve(true);
			});

			if (this.hasFalse) {
				this.falseButton.addEventListener("click", () => {
					resolve(false);
				});
			}

		});
	}

}