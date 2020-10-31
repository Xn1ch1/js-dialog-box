# Javascript Dialog Box
v1.0.0

Javascript Dialog Box is a simple to use library for making dialog boxes in pure Javscript. It comes with the following features

  - Minial mark up required
  - Async use for response handling
  - 3 button, true, false (optional) & neutral (optional)

## New Features!

  - Default layout, add only invoking code to show an error message


## Basic Use

By default the dialog will show an ok button and an error message.

```sh
const dialog = new DialogBox();
```

### Optional Parameters

```sh
trueButtonText: 'Message to show on the positive button'
falseButtonText: 'Message to show on the negative button'
neutralButtonText: 'Message to show on the neutral button'
messageText: 'Message to show in the body of the dialog'
titleText: 'Title text int he dialog'
```

### Full Use

```sh
async () => {
    const dialog = new DialogBox({
    	trueButtonText: "Yes",
    	falseButtonText: "No",
    	neutralButtonText: 'Cancel',
    	messageText: "Do you want to update both tables",
    	titleText: "Update"
    });
    if (await dialog.respond()) {
    	updateBothTables();
    } else {
        updateOneTable();
    };
}
```
