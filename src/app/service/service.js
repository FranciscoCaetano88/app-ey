import Company from 'models/company';
import CompanyDetails from 'models/company-details';

/**
 * CompanyService
 */
class Service {
    constructor() {

        this.api = {
            username: '79356da0efddccd8f265502960e97dbd',
            password: 'f8b2f3e635ae93fd51ec6ea4be0a82f4',
            url: 'https://api.intrinio.com',
        };

    }

    /**
     * Set the current company ticker
     */
    setTicker = function(value) {
        this.ticker = value;
    }

    /**
     * List companies
     */
    list = function(value, cb) {

        $.ajax({
            url: this.api.url + '/companies/?query=' + value,
            type: 'GET',
            dataType: 'json',
            beforeSend: authenticate,
            success: onSuccess,
            error: onError
        });

        function onSuccess(result) {

            var companies = result.data.map(function(company) {
                return {
                    ticker: company.ticker,
                    name: company.name
                }
            });

            cb(null, companies);
        }

        function onError() {
            cb('Error searching for companies... ', null);
        }
    }

    /**
     * Get details of current company
     */
    getDetails = function(cb) {

        if (!this.ticker) {
            throw new Error('invalid state');
        }

        $.ajax({
            url: this.api.url + '/companies/?ticker=' + internals.ticker,
            type: 'GET',
            dataType: 'json',
            beforeSend: authenticate,
            success: function(result) {

                cb(null, new CompanyDetails(result));
            },
            error: function() {
                cb('Error fetching company details... ', null);
            }
        });

    }

    authenticate(xhr) {
        xhr.setRequestHeader("Authorization", "Basic " + btoa(this.api.username + ":" + this.api.password));
    }

}

export { list, getDetails, setTicker };