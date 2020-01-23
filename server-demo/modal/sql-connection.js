var mysql = require('mysql');
var Builder = require('./query_builder');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'z886I0146v3434',
    database: 'realtor'
});


getApartment = (apartmentID) => {
    const promise = new Promise((resolve, reject) => {
        connection.query(`SELECT * from apartments where id = ${apartmentID}`, function (error, results, fields) {
            if (error) reject(error);
            resolve(results);
        });
    });
    return promise;
}

const insertUser = ({ first_name, last_name, username, email, password }) => {

    const query =
        'INSERT INTO users (role_id, first_name, last_name, username, email, password) VALUES (1, ?, ?, ?, ?, ?)';

    const promise = new Promise((resolve, reject) => {
        connection.query(query, [first_name, last_name, username, email, password], function (error, results, fields) {
            if (error) {

                reject(error);
            }
            resolve(results);
        });
    });
    return promise;
}

const insertApartment = ({ user_id, address, city_id, price, number_of_room, number_of_bath, sqft, description, sale_status, availability, property_type, main_image, status }) => {
    console.log(user_id, address, city_id, price, number_of_room, number_of_bath, sqft, description, sale_status, availability, property_type, main_image, status)
    const query =
        'INSERT INTO apartments (user_id,address,city_id,price,number_of_room,number_of_bath,sqft,description,sale_status,availability,property_type,main_image,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';

    const promise = new Promise((resolve, reject) => {
        connection.query(query, [user_id, address, city_id, price, number_of_room, number_of_bath, sqft, description, sale_status, availability, property_type, main_image, status], function (error, results, fields) {
            if (error) {

                reject(error);
            }
            resolve(results.insertId);
        });
    });
    return promise;
}

function addImagesToApartment(apartment_id, images) {
    return new Promise((resolve, reject) => {
        let data = '';
        images.map(image => data += (`(${apartment_id},${" ' " + image.filename + " ' "}),`));
        data = data.slice(0, data.length - 1);
        connection.query(`insert into images (apartment_id,url) VALUES ${data}`, (error, results, fields) => {
            if (error) reject(error);
            resolve(results);
        })
    })
}
//This version is using what we've done last week:

//Using Builder
//Complete the code
function checkUser(email, password) {

    return new Promise((resolve, reject) => {

        connection.query('SELECT * FROM users where `email` = ? AND `password` = ? ', [email, password], (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

function getCountries() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM countries", (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        })
    })
}

function getAllApartments({ country, city, minPrice, maxPrice, minNumRooms, maxNumRooms, minNumBaths, maxNumBaths, status, type, page = 1, size = 10 }) {
    return new Promise((resolve, reject) => {
        const { query, params } = Builder.allApartment(page, size)
            .byCountry(country)
            .byCity(city)
            .minPrice(minPrice)
            .maxPrice(maxPrice)
            .minNumRooms(minNumRooms)
            .maxNumRooms(maxNumRooms)
            .minNumBaths(minNumBaths)
            .maxNumBaths(maxNumBaths)
            .saleStatus(status)
            .propertyType(type)
            .build();
        console.log(query, params);
        connection.query(query, params, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

function getApartmentsById(apartmentId) {
    return new Promise((resolve, reject) => {
        const query = "SELECT a.*,group_concat(url) AS 'images',c.`name` AS 'city_name' FROM apartments a LEFT JOIN images i on(a.id = i.apartment_id) LEFT JOIN cities c on(a.city_id = c.id) where a.id=?"
        connection.query(query, apartmentId, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

function getCityByCountryId(countryId) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM realtor.cities where country_id = ?"
        connection.query(query, countryId, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}


module.exports = { getApartment, checkUser, insertUser, getAllApartments, getApartmentsById, getCountries, getCityByCountryId, insertApartment, addImagesToApartment }


