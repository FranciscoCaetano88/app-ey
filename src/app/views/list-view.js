/**
 * CompanyList View
 */
class ListView {

    constructor() {

        this.elements = {}; // references to dom elements
        this.handlers = {}; // references to dom event handlers

        this.events = {
            search: bindSearchHandler,
            company: bindCompanyHandler
        };

    }

    /*
        Binds an event with the appropriate handler
    */
    bind = function(event, handler) {
        internals.events[event](handler);
    }

    /*
        Render the view
    */
    render = function(params) {

        renderSearchBox();

        // nothing more to render
        if (!params) {
            return;
        }

        // there was an error, render it
        if (params.error) {
            renderError(params.error);
        }

        // update the state of the loading spinner
        renderSpinner(params.searching);

        // render the list of companies
        renderList(params.data);
    }

    bindSearchHandler(handler) {

        internals.elements.search.change(function(event) {

            // tell the controller user performed search
            handler(event.target.value);

        });
    }

    bindCompanyHandler(handler) {

        internals.handlers.company = function(event) {

            // do not follow link in table row
            event.preventDefault();

            var ticker = $(event.target).attr('id');

            if (ticker) {
                handler(ticker);
            }
        }
    }

    renderSearchBox() {
        internals.elements.app = $('#app');
        internals.elements.search = $(search());
        internals.elements.app.empty();
        internals.elements.app.append(internals.elements.search);
    }

    renderSpinner(searching) {

        var searchBox = internals.elements.search;

        if (searching) {
            searchBox.addClass('loading');
        } else {
            searchBox.removeClass('loading');
        }
    }

    renderList(companies) {

        // nothing to render
        if (!companies) {
            return;
        }

        var tableDiv = $(table());
        tableDiv.click(internals.handlers.company);

        internals.elements.app.append(tableDiv);

        companies.forEach(function(company) {
            tableDiv.append(row(company));
        });
    }

    renderError(message) {

        // nothing to render
        if (!message) {
            return;
        }

        var errorDiv = $(error(message));
        internals.elements.app.append(errorDiv);

        errorDiv.click(function() {
            $(this).closest('.message').transition('fade');
        });
    }

    error(message) {
        return (
            '<div class="ui negative message">' +
            '<i class="close icon"></i>' +
            '<div class="header">' +
            message +
            '</div>' +
            '</div>'
        )
    }

    search() {
        return (
            '<div id="company-search" class="ui search left icon input">' +
            '<input type="text" placeholder="Search companies...">' +
            '<i class="search icon"></i>' +
            '</div>'
        )
    }

    row(company) {
        return (
            '<tr>' +
            '<td>' +
            '<div class="ui ribbon label">' +
            company.ticker +
            '</div>' +
            '</td>' +
            '<td class="company">' +
            '<a id="' +
            company.ticker +
            '" href="">' +
            company.name +
            '</a>' +
            '</td>' +
            '</tr>'
        );
    }

    table() {
        return (
            '<table class="ui selectable celled table">' +
            '<thead>' +
            '<tr>' +
            '<th>Ticker</th>' +
            '<th>Name</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>' +
            '</tbody>' +
            '<tfoot>' +
            '<tr>' +
            '<th colspan="3">' +
            '<div class="ui right floated pagination menu">' +
            '<a class="icon item"><i class="left chevron icon"></i></a>' +
            '<a class="icon item"><i class="right chevron icon"></i></a>' +
            '</div>' +
            '</th>' +
            '</tr>' +
            '</tfoot>' +
            '</table>'
        );
    }

}

export { render };
