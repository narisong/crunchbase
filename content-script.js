chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'crunchbase-people-popup') {
    let companyName = "";
    const companyNameElement = document.querySelector('h1.profile-name');
    if (companyNameElement) {
      companyName = companyNameElement.innerHTML.trim();
    }

    const contacts = [];
    if (companyName) {
      const imageListCardElements = document.getElementsByTagName('image-list-card');
      if (imageListCardElements) {
        const lis = imageListCardElements[0].getElementsByTagName('li');
        for (let i = 0; i < lis.length; i++) {
          const name = lis[i].querySelector('div.fields').querySelector('a').innerHTML.trim();
          const title = lis[i].querySelector('span.component--field-formatter.field-type-text_short.ng-star-inserted').innerHTML;
          contacts.push({
            name,
            title,
          })
        }
      }
    }

    sendResponse({ companyName, contacts });
  }
});
