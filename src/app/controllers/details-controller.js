import DetailsView from '../views/details-view';

/**
 * CompanyDetails Controller
 */
class CompanyDetails {

    constructor(service) {
        this.service = service;
        this.detailsView = new DetailsView();
    }

    /**
     * Render the view
     */
    start = function() {

        detailsView.render();

        service.getDetails(function(err, data) {

            var params = err ? { error: err } : { data: data };
            detailsView.render(params);

        });

    }

}

export { start };
