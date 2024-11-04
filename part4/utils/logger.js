const info = (...params) => {
    console.log(...params)
}
//info for printing normal log messages
//error for all error messages
const error = (...params) => {
    console.error(...params)
}

module.exports = {
    info, error
}