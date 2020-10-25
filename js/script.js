scraptorInit('scraptor');

function scraptorInit(elemmentId) {
    let scraptorDiv = document.getElementById(elemmentId);
    
    let queryBarHelper = document.createElement('p');
    queryBarHelper.innerHTML = 'Input the search query';
    let queryBar = document.createElement('input');

    let selectorBarHelper = document.createElement('p');
    selectorBarHelper.innerHTML = 'Selector to scrape from the page';
    let selectorBar = document.createElement('input');

    let iframe = document.createElement('iframe');

    scraptorDiv.appendChild(queryBarHelper);
    scraptorDiv.appendChild(queryBar);
    scraptorDiv.appendChild(selectorBarHelper);
    scraptorDiv.appendChild(selectorBar);
    scraptorDiv.appendChild(iframe);
}