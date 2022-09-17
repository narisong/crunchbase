window.addEventListener('click', (e) => {
  if (e.target.href !== undefined) {
    chrome.tabs.create({ url: e.target.href })
  }
})

chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, {
    type: "crunchbase-people-popup",
  }, ({ companyName, contacts }) => {
    document.getElementById('companyName').innerHTML = companyName;
    const contactListElement = document.getElementById("contactList");
    contacts.forEach(contact => {
      const contactLink = document.createElement('a');
      contactLink.appendChild(document.createTextNode(`${contact.name} (${contact.title})`));
      contactLink.href = `https://www.linkedin.com/search/results/all/?keywords=${contact.name}%20${companyName}`;
      const contactElement = document.createElement('li');
      contactElement.appendChild(contactLink);
      contactListElement.appendChild(contactElement);
    });
  });
});
