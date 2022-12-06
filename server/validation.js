function checkUsername(username, varName) {
    console.log("checkUsername 1");
    if (!username) throw `Error: You must provide a ${varName}`;
    console.log("checkUsername 2");
    if (typeof username !== 'string') throw `Error:${varName} must be a string`;
    console.log("checkUsername 3");
    username = username.trim();
    console.log("checkUsername 4");
    if (!/^[\w\d]+$/g.test(username)) throw `Error: ${varName} cannot contain special characters nor spaces`;
    console.log("checkUsername 5");
    if (username.length < 4) throw `Error: ${varName} must be at least 4 characters long`;
    console.log("checkUsername 7");
    return username.toLowerCase();
}

function checkPassword(password, varName) {
    console.log("checkPassword 1");
    if (!password) throw `Error: You must provide a ${varName}`;
    console.log("checkPassword 2");
    if (typeof password !== 'string') throw `Error:${varName} must be a string`;
    console.log("checkPassword 3");
    password = password.trim();
    if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/g.test(password)) throw (`Error: ${varName} does not satisfy password requirements`);
    console.log("checkPassword 4");
    return password;
}

function checkSearchTerm(searchTerm, varName) {
    console.log("checkSearchTerm 1");
    if (!searchTerm) throw `Error: You must provide a ${varName}`;
    console.log("checkSearchTerm 2");
    if (typeof searchTerm !== 'string') throw `Error:${varName} must be a string`;
    console.log("checkSearchTerm 3");
    searchTerm = searchTerm.trim();
    if (searchTerm.length === 0) throw `Error: Search term cannot be just whitespace`;
    console.log("checkSearchTerm 4");
    console.log(searchTerm);
    return searchTerm;
}

module.exports = {
    checkUsername,
    checkPassword,
    checkSearchTerm
};