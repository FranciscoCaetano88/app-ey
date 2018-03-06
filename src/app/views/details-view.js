/**
 * CompanyDetails View
 */
class DetailsView {

    constructor() {
        this.elements = {}; // reference to dom elements
    }

    /**
     * Render the view
     */
    render = function(params) {

        renderMenu();

        if (!params) {
            return;
        }

        if (params.error) {
            renderError(params.error);
            return;
        }

        renderCompanyDetails(params.data);
    }

    // ::: INTERNALS :::

    renderMenu() {
        this.elements.app = $('#app');
        this.elements.app.html(menu());
        this.elements.details = $(detailsContainer());
        this.elements.app.append(internals.elements.details);
    }

    renderCompanyDetails(data) {

        if (!data) {
            return;
        }

        // render the company details
        this.elements.details.html(details(data));
        this.elements.details.removeClass('loading');
    }

    renderError(message) {

        // nothing to render
        if (!message) {
            return;
        }

        var errorDiv = $(error(message));
        this.elements.details.remove();
        this.elements.app.append(errorDiv);

        errorDiv.click(function() {
            $(this).closest('.message').transition('fade');
        });
    }

    menu() {
        return (
            '<div class="details">' +
            '<div class="ui compact menu">' +
            '<a class="item" href="#search">' +
            '<i class="search icon"></i>' +
            'Search' +
            '</a>' +
            '<a class="active item">' +
            '<i class="info circle icon"></i>' +
            'Details' +
            '</a>' +
            '<a class="item">' +
            '<i class="money icon"></i>' +
            'Statement' +
            '</a>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    }

    detailsContainer() {

        return (
            '<div class="ui loading vertical left aligned segment">' +
            '</div>'
        );
    }

    details(data) {
        return (
            '<h1 class="ui header">' +
            '<a href="http://' + data.url + '">' +
            data.name +
            '</a>' +
            '</h1>' +
            '<div class="ui relaxed list">' +
            '<div class="item">' +
            '<i class="middle aligned marker icon"></i>' +
            '<div class="content">' +
            data.address + '<br>' + data.state + ', ' + data.country +
            '</div>' +
            '</div>' +
            '<div class="item">' +
            '<i class="middle aligned briefcase icon"></i>' +
            '<div class="content">' +
            data.ceo +
            '</div>' +
            '</div>' +
            '<div class="item">' +
            '<i class="middle aligned industry icon"></i> ' +
            '<div class="content">' +
            data.sector + ', ' +
            data.industryGroup + '<br>' +
            data.industryCategory + '<br>' +
            '</div>' +
            '</div> ' +
            '</div>' +
            '<div class="ui text">' +
            data.shortDescription
            + '</div>'
        );
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

}

export { render };
