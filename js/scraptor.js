class Scraptor {

    constructor (elementID, params) {
        if (params == null) {
            this.createDefaultParams();
        }
        console.log(this);
        this.scraptorInit(elementID);
    }

    // Autoloads the scraptor instances
    scraptorInit(elementID) {
        if (elementID == null) {
            console.error("[Scraptor.js] No element ID passed by the constructor!");
        } 

        let scraptorDiv = document.getElementById(elementID);
        
        let queryBarHelper = document.createElement('p');
        queryBarHelper.innerHTML = 'Input the search query';
        let queryBar = document.createElement('input');
    
        let selectorBarHelper = document.createElement('p');
        selectorBarHelper.innerHTML = 'Selector to scrape from the page';
        let selectorBar = document.createElement('input');
    
        let iframe = document.createElement('embed');
        iframe.src = this.host + this.query + this.params;
        iframe.src = 'https://www.google.it';
    
        scraptorDiv.appendChild(queryBarHelper);
        scraptorDiv.appendChild(queryBar);
        scraptorDiv.appendChild(selectorBarHelper);
        scraptorDiv.appendChild(selectorBar);
        scraptorDiv.appendChild(iframe);
    }

    // Creates the default params (scraping imdb)
    createDefaultParams() {
        this.host = 'https://www.imdb.com/';
        this.query = 'find?q=';
        this.params = 'Django';
        this.selectorId = '';
        this.selectorClass = 'result-text';
    }
}