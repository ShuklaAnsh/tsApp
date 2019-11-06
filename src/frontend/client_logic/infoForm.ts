var edit_mode: boolean = false;
var original_field_values: string[] = [];
var inputElems: HTMLInputElement[] = [];
var saveBtn: HTMLDivElement;
var editBtn: HTMLDivElement;
var form: HTMLFormElement;

/**
 * Loads original values
 * 
 * @param {string[]} inputElemIds - List of input element IDs to store values from
 * @param {string} editBtnId - id of the element 
 * @param {string} saveBtnId - id of the element 
 * @param {string} formId - id of the element 
 */
function load(inputElemIds: string[], editBtnId: string, saveBtnId: string, formId: string) {
    for (var i = 0; i < inputElemIds.length; i++) {
        var inputElem: HTMLInputElement = <HTMLInputElement>document.getElementById(inputElemIds[i]);
        original_field_values.push(inputElem.value);
        inputElems.push(inputElem);
    }
    editBtn = <HTMLDivElement>document.getElementById(editBtnId);
    saveBtn = <HTMLDivElement>document.getElementById(saveBtnId);
    form = <HTMLFormElement>document.getElementById(formId);
}

/**
 * Toggles edit mode on/off
 * 
 * @param {string} editText - the string to put on the edit button when in edit mode
 */
function toggleEditMode(editText: string) {
    if (edit_mode) {
        edit_mode = false;
        form.classList.add('disable-edit');
        form.classList.remove('enable-edit');
        editBtn.innerText = editText;
        saveBtn.style.display = "none";
        for (var i = 0; i < inputElems.length; i++) {
            inputElems[i].setAttribute('readonly', 'true');
            inputElems[i].value = original_field_values[i];
        }
    } else {
        console.log("editting")
        form.classList.remove('disable-edit');
        form.classList.add('enable-edit');
        editBtn.innerText = "Cancel";
        saveBtn.style.display = "block";
        edit_mode = true;
        for (var i = 0; i < inputElems.length; i++) {
            inputElems[i].removeAttribute('readonly');
        }
    }
}

/**
 * Saves the new profile information by sending a post request
 */
function save() {
    form.submit();
}

/**
 * Confirmation dialog to delete
 * 
 * @param {string} msg - the message to display in the confirm dialog
 * 
 * @returns {boolean} - true if selects to delete
 */
function confirmDelete(msg: string) {
    return confirm(msg);
}