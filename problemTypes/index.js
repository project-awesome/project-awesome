
var problemTypes= {
    "fr-change-of-base": require("paq-fr-change-of-base"),
    "mc-change-of-base": require("paq-mc-change-of-base")
};

module.exports.problemTypes = problemTypes;

function isValidProblemType(problemType) {
    return (problemType in module.exports.problemTypes);
}

module.exports.isValidProblemType = isValidProblemType;

