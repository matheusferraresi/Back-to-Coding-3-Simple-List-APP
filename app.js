document.addEventListener('DOMContentLoaded', () => {

  // Create form elements and insert on page
  const form = document.getElementById('register');
  const input = form.querySelector('input');
  const mainDiv = document.querySelector('.main');
  const ul = document.getElementById('invitedList');

  const div = document.createElement('div');
  const filterLabel = document.createElement('label');
  const filterCheckBox = document.createElement('input');

  // Create the checkbox to see who has confirmed
  filterLabel.textContent = "Hide those who haven't responded";
  filterCheckBox.type = 'checkbox';
  div.appendChild(filterLabel);
  div.appendChild(filterCheckBox);
  mainDiv.insertBefore(div, ul);

  // Listen for each item to see if there's any change and apply the new style for the confirmed itens
  filterCheckBox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const lis = ul.children;

    if (isChecked) {
      for (let i = 0; i < lis.length; i++) {
        let li = lis[i];

        if (li.className === 'responded') {
          li.style.display = '';
          li.childNodes[1].style.display = 'none';
        } else {
          li.style.display = 'none';
        }
      }
    } else {
      for (let i = 0; i < lis.length; i++) {
        let li = lis[i];

        li.style.display = '';
        li.childNodes[1].style.display = '';
      }
    };
  });

  // Create each 'box' with the data from each person
  function createLi(text) {

    // Receive the data to create the html element and reduce redundant code
    function createElement(elementName, property, value) {
      const element = document.createElement(elementName);
      element[property] = value;

      return element;
    };

    // Was used just once to create and element to append, but was made to prevent redundant code on future updates
    function appendToLI(elementName, property, value) {
      const element = createElement(elementName, property, value);
      li.appendChild(element);

      return element;
    }

    // Create and append the elements for the li
    const li = document.createElement('li');
    appendToLI('span', 'textContent', text);
    appendToLI('label', 'textContent', 'Confirm')
      .appendChild(createElement('input', 'type', 'checkbox'));
    appendToLI('button', 'textContent', 'edit');
    appendToLI('button', 'textContent', 'remove');

    return li;
  };

  // Handler for the submit event to grab the name, create the box and reset the input value
  // Also to check if the submit was blank or if the name is duplicated
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    input.value = '';
    if (text != '' && text != null) {
      for (let i = 0; i < ul.children.length; i++) {
        if (text === ul.children[i].children[0].textContent) {
          alert('That name has already been entered, try another one.');
          return;
        }
      }
      const li = createLi(text);
      ul.appendChild(li);
      console.log(li);
    } else {
      alert('Please insert a valid name');
    }
  });

  // Handler for the changes on each boxes to apply new styles for the 'confirmed person'
  ul.addEventListener('change', (e) => {
    const checkbox = e.target;
    const checked = checkbox.checked;
    const label = checkbox.parentNode;
    const listItem = checkbox.parentNode.parentNode;

    console.log(e.target);

    if (checked) {
      listItem.className = 'responded';
      label.childNodes[0].textContent = 'Confirmed';
    } else {
      listItem.classList.remove('responded');
      label.childNodes[0].textContent = 'Confirm';
    };
  });

  // Handler for 'any' button on each li('Person') and then check for the action according with the button's name match`
  ul.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      const li = e.target.parentNode;
      const ul = li.parentNode;
      const action = button.textContent;

      const nameActions = {
        //Delete Item
        remove: () => {
          ul.removeChild(li);
        },
        // Change the edit button to save, create the input field
        edit: () => {
          const input = document.createElement('input');
          const span = li.firstElementChild;

          input.type = 'text';
          input.value = span.textContent;
          li.replaceChild(input, span);

          button.textContent = 'save';
        },
        // Get the value from the input and then save the changes made
        save: () => {
          const span = document.createElement('span');
          const input = li.firstElementChild;

          span.textContent = input.value;
          li.replaceChild(span, input);

          button.textContent = 'edit';
        }
      };

      // select and run action according to button's name
      nameActions[action]();
    }
  });

  //Methods to get and set Arrays on the local storage
  var setObj = function (key, obj) {
    return localStorage.setItem(key, JSON.stringify(obj));
  }
  var getObj = function (key) {
    return JSON.parse(localStorage.getItem(key));
  }

  const rsvpAPP = getObj('rsvpAPP');

  //Checks if local storage item exists then update the list if it's true
  if (rsvpAPP === null) {
    const rsvpAPP = {
      'Nome': 'Matheus',
      'Sobrenome': 'Rola'
    };
    setObj('rsvpAPP', rsvpAPP);
  }
  let test = getObj('rsvpAPP');
  console.log(test);

});