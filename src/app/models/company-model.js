/**
 * The Company Details Model
 */
class CompanyDetails {

    constructor(company) {
        this.name = company.name;
        this.shortDescription = company.short_description;
        this.ceo = company.ceo;
        this.url = company.company_url;
        this.address = company.business_address;
        this.state = company.hq_state;
        this.country = company.hq_country;
        this.sector = company.sector;
        this.industryCategory = company.industry_category;
        this.industryGroup = company.industry_group;
    }

}

exports CompanyDetails;