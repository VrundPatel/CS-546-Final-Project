/*function checkUsername(username, varName) {
    if (!username) throw `Error: You must provide a ${varName}`;
    if (typeof username !== 'string') throw `Error:${varName} must be a string`;
    username = username.trim();
    if (!/^[\w\d]+$/g.test(username)) throw `Error: ${varName} cannot contain special characters nor spaces`;
    if (username.length < 4) throw `Error: ${varName} must be at least 4 characters long`;
    return username.toLowerCase();
}*/

function checkPassword(password, varName) {
    if (!password) throw `Error: You must provide a ${varName}`;
    if (typeof password !== 'string') throw `Error:${varName} must be a string`;
    password = password.trim();
    if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/g.test(password)) throw (`Error: ${varName} does not satisfy password requirements, please change another one`);
    return password;
}

function checkString(searchTerm, varName) {
    if (!searchTerm) throw `Error: You must provide a ${varName}`;
    if (typeof searchTerm !== 'string') throw `Error: ${varName} must be a string`;
    searchTerm = searchTerm.trim();
    if (searchTerm.length === 0) throw `Error: ${varName} cannot be just whitespace`;
    return searchTerm;
}

function checkEmail(email, varName) {
    if (!email) throw `Error: You must provide a ${varName}`;
    if (typeof email !== 'string' || email.trim().length == 0) throw `Error: ${varName} must be a non-empty string`;
    email = email.trim();
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g.test(email)) throw (`Error: ${varName} is not a format of email, please change another one`);
    return email.toLowerCase();
}

function checkFullname(fullName, varName) {
    if (!fullName) throw `Error: You must provide a ${varName}`;
    if (typeof fullName !== 'string' || fullName.trim().length == 0) throw `Error: ${varName} must be a non-empty string`;
    fullName = fullName.trim();
    if (!/^[a-zA-Z]+ [a-zA-Z]+$/g.test(fullName)) throw (`Error: ${varName} may not be real name, please change another one`);
    return fullName;
}

function checkCity(city, varName) {
    if (!city) throw `Error: You must provide a ${varName}`;
    if (typeof city !== 'string' || city.trim().length == 0) throw `Error: ${varName} must be a non-empty string`;
    city = city.trim();
    if (!/^(?:[A-Za-z]{2,}(?:(\.\s|'s\s|\s?-\s?|\s)?(?=[A-Za-z]+))){1,2}(?:[A-Za-z]+)?$/g.test(city)) throw (`Error: ${varName} may not be a city name, please change another one`);
    return city;
}

function checkState(state, varName) {
    if (!state) throw `Error: You must provide a ${varName}`;
    if (typeof state !== 'string' || state.trim().length == 0) throw `Error: ${varName} must be a non-empty string`;
    state = state.trim().toUpperCase();
    let found = false;
    let stateArray = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
    for (let i = 0; i < stateArray.length; i++) {
        if (state == stateArray[i]) {
            found = true;
            break;
        }
    }
    if (!found) throw (`Error: ${varName} may not be a state abbreviation, please change another one`);
    return state;
}

function checkZipcode(zipcode, varName) {
    if (!zipcode) throw `Error: You must provide a ${varName}`;
    if (typeof zipcode !== 'string' || zipcode.trim().length == 0) throw `Error: ${varName} must be a non-empty string`;
    zipcode = zipcode.trim();
    if (!/^\d{5}(-\d{4})?$/g.test(zipcode)) throw (`Error: ${varName} may not be a valid zipcode, please change another one`);
    return zipcode;
}



module.exports = {
    //checkUsername,
    checkPassword,
    checkString,
    checkEmail,
    checkFullname,
    checkCity,
    checkState,
    checkZipcode

};