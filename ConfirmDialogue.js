class ConfirmDialogue {

    constructor({

        titleText,
        messageText,
        trueButtonText,
        falseButtonText,
        cancelButtonText

    }) {

        this.titleText = titleText || 'Error';
        this.messageText = messageText || 'Something unexpected has gone wrong. If the problem persists, contact your administrator';
        this.trueButtonText = trueButtonText || 'OK';
        this.falseButtonText = falseButtonText || null;
        this.cancelButtonText = cancelButtonText || null;

        this.hasFalse = falseButtonText != null;
        this.hasCancel = cancelButtonText != null;

        this.dialogue = undefined;
        this.trueButton = undefined;
        this.falseButton = undefined;
        this.cancelButton = undefined;
        this.parent = document.body;

        this._createDialog();
        this._appendDialog();

    }

    _createDialog() {

        this.dialogue = document.createElement("div");
        this.dialogue.classList.add("confirm-dialogue");

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
        buttonContainer.appendChild(this.trueButton);

        if (this.hasFalse) {
            this.falseButton = document.createElement("a");
            this.falseButton.classList.add(
                "confirm-dialogue-button",
                "confirm-dialogue-button--false"
            );
            this.falseButton.textContent = this.falseButtonText;
            buttonContainer.appendChild(this.falseButton);
        }

        if (this.hasCancel) {
            this.cancelButton = document.createElement("a");
            this.cancelButton.classList.add(
                "confirm-dialogue-button",
                "confirm-dialogue-button--cancel"
            );
            this.cancelButton.textContent = this.cancelButtonText;
            buttonContainer.appendChild(this.cancelButton);
        }

    }

    _appendDialog() {
        this.parent.appendChild(this.dialogue);
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
                this._destroy();
            });

            if (this.hasFalse) {
                this.falseButton.addEventListener("click", () => {
                    resolve(false);
                    this._destroy();
                });
            }

            if (this.hasCancel) {
                this.cancelButton.addEventListener("click", () => {
                    this._destroy();
                });
            }

        });
    }

}