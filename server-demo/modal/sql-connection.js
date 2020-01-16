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

insertUser = ({ first_name, last_name, email, password, phone }) => {

    const query =
        `INSERT INTO users
    (\`id\`, \`role_id\`, \`first_name\`, \`last_name\`, \`email\`, \`password\`, \`phone\`)
    VALUES
    (DEFAULT, 1, '${first_name}', '${last_name}', '${email}', '${password}', '${phone}')`

    const promise = new Promise((resolve, reject) => {
        connection.query(query, function (error, results, fields) {
            if (error) reject(error);
            resolve(results);
        });
    });
    return promise;
}
//This version is using what we've done last week:

//Using Builder
//Complete the code
function checkUser(email, password) {

    return new Promise((resolve, reject) => {

        connection.query(`SELECT * FROM users where \`email\`="${email}" AND \`password\` = "${password}"`, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });


}

function getAllApartments({ country, city, minPrice, maxPrice, numRooms, numBath, status, type, page = 1, size = 10 }) {
    return new Promise((resolve, reject) => {
        const { query, params } = Builder.allApartment(page, size)
            .byCountry(country)
            .byCity(city)
            .maxPrice(minPrice)
            .maxPrice(maxPrice)
            .numOfRooms(numRooms)
            .numOfBath(numBath)
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

module.exports = { getApartment, checkUser, insertUser, getAllApartments, getApartmentsById }


