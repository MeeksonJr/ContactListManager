// Array to store contacts as objects
let contacts = [];

// Load contacts from local storage on page load
document.addEventListener("DOMContentLoaded", () => {
  loadContacts();
});

// Function to load contacts from local storage
function loadContacts() {
  const storedContacts = localStorage.getItem("contacts");
  if (storedContacts) {
    // Parse the stored contacts into an array
    contacts = JSON.parse(storedContacts); 
    // Display the contacts
    displayContacts(); 
  }
}

// Function to save contacts to local storage
function saveContacts() {
    // Stringify and save contacts
  localStorage.setItem("contacts", JSON.stringify(contacts)); 
}

// Function to show the relevant form based on the selected action
function showForm(action) {
  const forms = document.querySelectorAll('.form-container');
  forms.forEach(form => {
    form.classList.add('hidden');
  });

  const selectedForm = document.getElementById(`${action}-form`);
  // Show the selected form
  selectedForm.classList.remove('hidden'); 
}

// Function to add a new contact
function addContact() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const address = document.getElementById("address").value;

  // Create a new contact object
  const newContact = { firstName, lastName, phoneNumber, address };
  contacts.push(newContact);
  contacts.sort((a, b) => (a.lastName + a.firstName).localeCompare(b.lastName + b.firstName));

  // Save updated contacts to local storage
  saveContacts(); 
  displayContacts();
  clearFields("firstName", "lastName", "phoneNumber", "address");
}

// Function to delete a contact
function deleteContact() {
  const firstName = document.getElementById("deleteFirstName").value;
  const lastName = document.getElementById("deleteLastName").value;

  contacts = contacts.filter(contact => !(contact.firstName === firstName && contact.lastName === lastName));
  // Save updated contacts to local storage
  saveContacts(); 
  displayContacts();
  clearFields("deleteFirstName", "deleteLastName");
}

// Function to modify a contact's address
function modifyContact() {
  const firstName = document.getElementById("modifyFirstName").value;
  const lastName = document.getElementById("modifyLastName").value;
  const newAddress = document.getElementById("newAddress").value;

  const contact = contacts.find(contact => contact.firstName === firstName && contact.lastName === lastName);

  if (contact) {
    contact.address = newAddress;
    alert("Address updated.");
    // Save updated contacts to local storage
    saveContacts(); 
  } else {
    alert("Contact not found.");
  }

  displayContacts();
  clearFields("modifyFirstName", "modifyLastName", "newAddress");
}

// Function to search for a contact by name
function searchContact() {
  const firstName = document.getElementById("searchFirstName").value;
  const lastName = document.getElementById("searchLastName").value;
  const contact = contacts.find(contact => contact.firstName === firstName && contact.lastName === lastName);

  if (contact) {
    alert(`Found Contact:\nName: ${contact.firstName} ${contact.lastName}\nPhone: ${contact.phoneNumber}\nAddress: ${contact.address}`);
  } else {
    alert("Contact not found.");
  }

  clearFields("searchFirstName", "searchLastName");
}

// Function to display all contacts
function displayContacts() {
  const contactList = document.getElementById("contacts");
  // Clear the previous contact list
  contactList.innerHTML = ''; 

  contacts.forEach(contact => {
    const contactCard = document.createElement('div');
    contactCard.className = 'contact-card';
    contactCard.innerHTML = `
      <p><strong>Name:</strong> ${contact.firstName} ${contact.lastName}</p>
      <p><strong>Phone:</strong> ${contact.phoneNumber}</p>
      <p><strong>Address:</strong> ${contact.address}</p>
    `;
    // Add each contact card to the contact list
    contactList.appendChild(contactCard); 
  });
}

// Function to clear input fields
function clearFields(...fields) {
  fields.forEach(field => {
    // Clear the input field
    document.getElementById(field).value = ''; 
  });
}
