chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'crunchbase-people-popup') {
    let companyName = "";
    const companyNameElement = document.querySelector('h1.profile-name');
    if (companyNameElement) {
      companyName = companyNameElement.innerHTML.trim();
    }

    const contacts = [];
    if (companyName) {
      const contactDetailsElements = document.getElementsByTagName('contact-details');
      if (contactDetailsElements) {
        for (let i = 0; i < contactDetailsElements.length; i++) {
          const nameElement = contactDetailsElements.item(i).querySelector('span.ng-star-inserted');
          const jobTitleElement = contactDetailsElements.item(i).querySelector('div.job-title.ng-star-inserted');
          if (nameElement) {
            contacts.push({
              name: nameElement.innerHTML.trim(),
              title: jobTitleElement.innerHTML.trim(),
            })
          }
        }
      }
    }

    sendResponse({ companyName, contacts });
  }
});
