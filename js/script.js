function main() {
    loadNotes()
    console.log(localStorage);
    const addButton = document.getElementById('create-note-btn');
    addButton.addEventListener('click', addNote);
    const loadButton = document.getElementById('logo');
    loadButton.addEventListener('click', clear);
    const container = document.getElementById('container');
    container.addEventListener('keyup', saveToLocalStorage);
}

let index = localStorage.getItem('index');

function addNote() {
    let container = document.getElementById('container');
    let form = document.createElement('form');
    form.className = "note";
    form.setAttribute('id', `note-${index}`)
    container.appendChild(form);
    form.appendChild(createLabelFor('title'));
    form.appendChild(createDiv(""));
    form.appendChild(createLabelFor('description'));
    form.appendChild(createTextArea(""));
    index += 1;
}

function createEmptyNote(id, inputValue, textareaValue) {
    let container = document.getElementById('container');
    let form = document.createElement('form');
    form.className = "note";
    form.setAttribute('id', `${id}`)
    container.appendChild(form);
    form.appendChild(createLabelFor('title'));
    form.appendChild(createDiv(inputValue));
    form.appendChild(createLabelFor('description'));
    form.appendChild(createTextArea(textareaValue));
}

function createLabelFor(name) {
    let label = document.createElement('label');
    label.setAttribute('for', 'note-' + name);
    return label;
}

function createDiv(inputValue) {
    let div = document.createElement('div');
    div.className = 'note-header';
    div.appendChild(createInput(inputValue));
    div.appendChild(createRemoveButton())
    return div;
}

function createInput(inputValue) {
    let input = document.createElement('input');
    input.setAttribute('type', "text");
    input.setAttribute('name', `note_title`);
    input.setAttribute('placeholder', 'Add title...');
    input.value = inputValue;
    return input;
}

function createRemoveButton() {
    let img = document.createElement('img');
    img.className = 'remove-note-btn';
    img.setAttribute('src', 'images/whiteX.png');
    img.setAttribute('alt', 'removeBtn');
    img.addEventListener('click', removeNote);
    return img;
}

function removeNote() {
    let item = this.parentNode.parentNode;
    let parent = item.parentNode;
    let noteID = item.getAttribute('id');
    console.log(noteID + ' removed');
    let slicedID = noteID.slice(5);
    console.log(('sliced:' + slicedID));
    localStorage.removeItem(slicedID);
    console.log(localStorage);
    parent.removeChild(item);
    saveToLocalStorage();
}

function createTextArea(textareaValue) {
    let textarea = document.createElement('textarea');
    textarea.setAttribute('type', "text");
    textarea.setAttribute('name', `note_description`);
    textarea.setAttribute('placeholder', 'Add note...');
    textarea.value = textareaValue;
    return textarea;
}

function saveToLocalStorage() {
    let notes = document.getElementsByTagName('form');
    console.log('notes length:'+notes.length);
    localStorage.clear();
    localStorage.setItem('index', index);
    let name = 1;
    for (e of notes) {
        let id = e.getAttribute('id').valueOf();
        let input = e.children[1].children[0].value;
        let textarea = e.lastChild.value;
        let newObj = {'input': input, 'textarea': textarea, 'id': id};
        localStorage.setItem((name++).toString(), JSON.stringify(newObj));
    }
    console.log(localStorage)
}

function loadNotes() {
    let numberOfNotes = localStorage.length - 1
    if (numberOfNotes > 0) {
        for (let i = 1; i <= localStorage.length; i++) {
            try {
                let retrievedObject = localStorage.getItem(i.toString());
                let obj = JSON.parse(retrievedObject);
                createEmptyNote(obj.id, obj.input, obj.textarea)
            } catch (e) {
            }
        }
    }
}

function clear() {
    localStorage.clear();
}

main();