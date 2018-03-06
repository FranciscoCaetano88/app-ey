import ListView from '../views/list-view';

/**
 * CompanyList Controller
 */
class ListController {

    constructor(service) {

        this.service = service;
        this.listView = new ListView();

        this.lastSearch = '';
        this.searching = false;
    }

    /**
     * Bind event handlers and render the view
     */
    start = function() {

        if (this.lastSearch) {

            // render last company search if not the first time
            searchHandler(this.lastSearch);
            return;

        }

        // render empty search box
        listView.render();
        bindEvents();
    }

    // bind event handlers to view
    bindEvents() {
        listView.bind('search', searchHandler);
        listView.bind('company', companyHandler);
    }

    // user clicked on company
    companyHandler(value) {
        companyService.setTicker(value);
        window.location.hash = '#details';
    }

    // user performed new search
    searchHandler(value) {

        // search empty, nothing to do
        if (!value || !value.length) {
            return;
        }

        // no point in searching if we are already in the middle of a search
        if (this.searching) {
            return;
        }

        // update state before searching
        this.searching = true;

        // render loading search spinner
        listView.render({
            searching: true
        });

        // perform search
        companyService.list(value, function(err, data) {

            // prepare view parameters
            var params = err ? { error: err } : { data: data };

            // render list of companies
            listView.render(params);
            bindEvents();

            // update state after searching
            this.lastSearch = value;
            this.searching = false;
        });
    }

}

export { start };
