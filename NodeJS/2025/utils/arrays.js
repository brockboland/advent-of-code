const arrayAllSame = (input) => {
    if (input.length < 2) return true

    for (let i = 1; i < input.length; i++) {
        if (input[i] !== input[0]) {
            return false
        }
    }
    return true
}

module.exports = {
  arrayAllSame
};
