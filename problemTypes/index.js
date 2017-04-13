
var problemTypes= {
    "fr-change-of-base": require("paq-fr-change-of-base"),
    "mc-change-of-base": require("paq-mc-change-of-base"),
    "change-of-base": require("paq-change-of-base"),
    "C-pointer-types": require("paq-C-pointer-types")
};

module.exports.problemTypes = problemTypes;

function isValidProblemType(problemType) {
    return (problemType in module.exports.problemTypes);
}

module.exports.isValidProblemType = isValidProblemType;

