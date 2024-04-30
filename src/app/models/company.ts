import { Pagination } from "./pagination";

export class Company {
    constructor(
        public companyId: number,
        public name: string,
        public address: string,
        public phone?: string,
        public email?: string
    ) {}
}

// responses
export class CompanyShortInfo
{
    constructor(
        public companyId: number,
        public name: string)
    {}
}

// requests
export class GetAllCompaniesRequest {
    constructor(
        public searchedName: string | null,
        public searchedCity: string | null,
        public searchedCountry: string | null,
        public searchedZipCode: string | null,
        public pagination: Pagination
    ) {}
}

export class CreateCompanyRequest {
    constructor(
        public name: string,
        public phone: string,
        public email: string,
        public street: string,
        public city: string,
        public country: string,
        public zipCode: string
    ) {}
}

export class EditCompanyRequest extends CreateCompanyRequest {
    public companyId: number;
    constructor(
        companyId: number,
        name: string,
        phone: string,
        email: string,
        street: string,
        city: string,
        country: string,
        zipCode: string
    ) {
        super(name, phone, email, street, city, country, zipCode);
        this.companyId = companyId;
    }
}