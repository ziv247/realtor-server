// class customerBuilder {
//     constructor(page, size) {
//         this.page = page;
//         this.size = size;
//         this.params = [];
//         this.query = `Select * from Customers where 1`;
//     }

//     addCustomerId(customerId) {
//         console.log(customerId);
//         customerId
//             &&
//             (this.query += ' and CustomerID = ? ', this.params.push(customerId))

//         return this
//     }

//     addCity(city) {
//         console.log(city);
//         city
//             &&
//             (this.query += ' and City = ? ', this.params.push(city))
//         return this
//     }

//     addCountry(country) {
//         console.log(country);
//         country
//             &&
//             (this.query += ' and Country = ? ', this.params.push(country))
//         return this
//     }

//     build() {
//         this.query += ` limit ${(this.page - 1) * this.size}, ${this.size}`;
//         return { query: this.query, params: this.params };
//     }
// }

class apartmentBuilder {
    constructor(page, size) {
        this.page = page;
        this.size = size;
        this.params = [];
        this.query = 'Select a.*,c.`name` AS "city_name" ,cn.`name` AS country_name FROM apartments a JOIN cities c ON a.city_id = c.id JOIN countries cn On c.country_id = cn.id WHERE 1 ';
    }

    byCountry(country) {
        country
            &&
            (this.query += ' AND cn.id = ? ', this.params.push(country))

        return this
    }

    byCity(city) {
        city
            &&
            (this.query += ' AND c.id = ? ', this.params.push(city))
        return this
    }

    minPrice(price) {
        price > 0
            &&
            (this.query += ' AND a.price >= ? ', this.params.push(price))
        return this
    }

    maxPrice(price) {
        price > 0
            &&
            (this.query += ' AND a.price <= ? ', this.params.push(price))
        return this
    }

    minNumRooms(numRooms) {
        numRooms
            &&
            (this.query += ' AND a.number_of_room >= ? ', this.params.push(numRooms))
        return this
    }
    maxNumRooms(numRooms) {
        numRooms
            &&
            (this.query += ' AND a.number_of_room <= ? ', this.params.push(numRooms))
        return this
    }

    minNumBaths(numBath) {
        numBath
            &&
            (this.query += ' AND a.number_of_bath >= ? ', this.params.push(numBath))
        return this
    }

    maxNumBaths(numBath) {
        numBath
            &&
            (this.query += ' AND a.number_of_bath <= ? ', this.params.push(numBath))
        return this
    }

    saleStatus(status) {
        status
            &&
            (this.query += ' AND a.sale_status = ? ', this.params.push(status))
        return this
    }

    propertyType(type) {
        type
            &&
            (this.query += ' AND a.property_type = ? ', this.params.push(type))
        return this
    }

    build() {
        this.query += ` order by created_on desc limit ${(this.page - 1) * this.size}, ${this.size} `;
        return { query: this.query, params: this.params };
    }
}

class Builder {

    static allCustomers(page, size) {
        return new customerBuilder(page, size);
    }

    static allApartment(page, size) {
        return new apartmentBuilder(page, size);
    }
}
module.exports = Builder;