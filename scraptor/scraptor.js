class Scraptor {

    constructor (elementID, frameID, scraptorTheme = null, params = null) {
        if (params == null) {
            this.createDefaultParams();
        }
        
        if (scraptorTheme == null) {
            this.loadScraptorTheme('./scraptor/scraptor.css');
        }
        if (elementID == null) {
            console.error("[Scraptor.js] Cannot init scraptor. No element ID passed by the constructor!");
            return;
        } 
        if (frameID == null) {
            console.error("[Scraptor.js] Cannot init scraptor. No frame ID passed by the constructor!");
            return;
        }
        if (navigator.appName == 'Microsoft Internet Explorer') {
            window.frames[0].document.execCommand('Stop');
        } else {
            window.frames[0].stop();
        }
        
        this.elementID = elementID;
        this.frameID = frameID;
        this.scraptorInit(elementID, frameID);

        // Adding defualt scraptor event
        $('#' + frameID).on("load", this.scrape(this.elementID, this.frameID, this.selectorClass));
    }

    // Autoloads the required css theme for scraptor
    loadScraptorTheme(themeURL) {
        let link = document.createElement('link');
        link.href = themeURL;
        link.type = "text/css";
        link.rel = "stylesheet";
        link.media = "screen,print";
        document.getElementsByTagName("head")[0].appendChild(link);
    }

    // Autoloads the scraptor instances
    scraptorInit(elementID, frameID) {
        this.scraptorDiv = document.getElementById(elementID);

        this.scraptorTitle = document.createElement('h1');
        this.scraptorTitle.innerHTML = "Scraptor";
        this.scraptorSubtitle = document.createElement('h4');
        this.scraptorSubtitle.innerHTML = "Website scraper, bypassing CORS!";
        this.scraptorDiv.appendChild(this.scraptorTitle);
        this.scraptorDiv.appendChild(this.scraptorSubtitle);

        this.frameDiv = document.getElementById(frameID);
        this.frameDiv.innerHTML = "Loading website (Fuck CORS i'm an hacker)";

        this.hostBarHelper = document.createElement('p');
        this.hostBarHelper.innerHTML = "Input the host for the website";
        this.hostBar = document.createElement('input');
        this.hostBar.value = this.host;
        this.scraptorDiv.appendChild(this.hostBarHelper);
        this.scraptorDiv.appendChild(this.hostBar);
        
        this.queryBarHelper = document.createElement('p');
        this.queryBarHelper.innerHTML = 'Input the search query';
        this.queryBar = document.createElement('input');
        this.queryBar.value = this.query;
        this.scraptorDiv.appendChild(this.queryBarHelper);
        this.scraptorDiv.appendChild(this.queryBar);

        this.paramsBarHelper = document.createElement('p');
        this.paramsBarHelper.innerHTML = 'Input query parameters';
        this.paramsBar = document.createElement('input');
        this.paramsBar.value = this.params;
        this.scraptorDiv.appendChild(this.paramsBarHelper);
        this.scraptorDiv.appendChild(this.paramsBar);
    
        this.selectorBarHelper = document.createElement('p');
        this.selectorBarHelper.innerHTML = 'Selector to scrape from the page';
        this.selectorBar = document.createElement('input');
        this.selectorBar.value = this.selectorClass;
        this.scraptorDiv.appendChild(this.selectorBarHelper);
        this.scraptorDiv.appendChild(this.selectorBar);

        this.scrapeButton = document.createElement('button');
        this.scrapeButton.innerHTML = "Scrape!";
        this.scrapeButton.addEventListener('click', this.scrape(elementID, frameID));
        this.scraptorDiv.appendChild(this.scrapeButton);
        this.scrapeButton.addEventListener('click', (e) => this.scrapeButtonClicked());
        
        this.getPageFromURL(this.url, elementID, frameID);
    }

    // Gets the content of a web page using a GET request (Bypass CORS!!)
    getPageFromURL(url, elementID, frameID) {
        $.get("./php/get_website.php", {url: url}, (data) => this.placeToFrame(data, elementID, frameID));
    }

    // Places the data obtaioned by the GET request to the frame
    placeToFrame(data, elementID, frameID) {
        //console.log(data);
        let parsed = JSON.parse(data);

        if (parsed.res == 2) {
            let pageContent = document.createElement('div');
            pageContent.innerHTML = data;
            this.scraptorDiv = document.getElementById(this.elementID);
            this.frameDiv = document.getElementById(this.frameID);
            this.frameDiv.src = 'about:blank';
            this.writeToIFrame(parsed.content);

            // Once the page is returned, scrape it!
            this.scrape(elementID, frameID, this.selectorClass);
        }
        else {
            console.error("[Scraptor.js] Code #" + parsed.res + " error: " + parsed.msg);
            this.frameDiv.innerHTML = "[Scraptor.js] Code #" + parsed.res + " error: " + parsed.msg;
        }
    }

    // Writes HTML content to the iframe
    writeToIFrame(content) {
        this.frameDiv.contentWindow.document.open();
        this.frameDiv.contentWindow.document.write(content);
        this.frameDiv.contentWindow.document.close();
    }

    // Scrapes the webpage finding all tags with the selector
    // based on the selectorClass or selectorID 
    scrape(elementID, frameID, selectorClass) {
        console.log("[Scraptor.js] Scraptor is currently scraping");
        console.log("[Scraptor.js] Selector class: " + selectorClass);
        let query = "* " + selectorClass;
        console.log("[Scraptor.js] Launching query {" + query + "} on frame with id: #" + frameID);
        //$("#" + frameID).contents().find(query).html("SCRAPABLE!!");
        $("#" + frameID).contents().find(query).css("border", "2px solid black");
    }

    // Creates the default params (scraping imdb)
    createDefaultParams() {
        this.host = 'https://www.youtube.com/';
        this.query = 'results?search_query=';
        this.params = 'battlegrounds';
        this.url = this.host + this.query + this.params;
        this.selectorID = '';
        this.selectorClass = '#video-title.ytd-video-renderer';
    }

    // Handles event on scrape button clicked
    scrapeButtonClicked() {
        this.host = this.hostBar.value;
        this.query = this.queryBar.value;
        this.params = this.paramsBar.value;
        this.selectorClass = this.selectorBar.value;
        this.url = this.host + this.query + this.params;

        console.log("[Scraptor.js] Starting scrape over elementID: " + this.elementID + " on frameID: " + this.frameID);
        console.log("[Scraptor.js] Scraping URL: " + this.url);
        this.getPageFromURL(this.url, this.elementID, this.frameID);
    }
}