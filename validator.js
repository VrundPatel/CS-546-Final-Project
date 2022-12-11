function checkUsername(username, varName) {
    if (!username) throw `Error: You must provide a ${varName}`;
    if (typeof username !== 'string') throw `Error:${varName} must be a string`;
    username = username.trim();
    if (!/^[\w\d]+$/g.test(username)) throw `Error: ${varName} cannot contain special characters nor spaces`;
    if (username.length < 4) throw `Error: ${varName} must be at least 4 characters long`;
    return username.toLowerCase();
}

function checkPassword(password, varName) {
    if (!password) throw `Error: You must provide a ${varName}`;
    if (typeof password !== 'string') throw `Error:${varName} must be a string`;
    password = password.trim();
    if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/g.test(password)) throw (`Error: ${varName} does not satisfy password requirements`);
    return password;
}

function checkString(searchTerm, varName) {
    if (!searchTerm) throw `Error: You must provide a ${varName}`;
    if (typeof searchTerm !== 'string') throw `Error: ${varName} must be a string`;
    searchTerm = searchTerm.trim();
    if (searchTerm.length === 0) throw `Error: ${varName} cannot be just whitespace`;
    return searchTerm;
}

module.exports = {
    checkUsername,
    checkPassword,
    checkString
};