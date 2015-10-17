
module.exports.title = "Bin Hex Oct Dec";

/*
   Given a radix (8,16,2,10), randomly choose either to describe that as, for example,
   "base 8" or as "octal".     This is so that you can check whether students can 
   identify the base by either of the two ways of referring to it.

   @param radix radix to be described
   @param randomStream an object of type random
   @return either "base n" or "word" where word described the base, e.g. "octal" or "base 8"
*/
/*
var defaultConversions = [ 
    {fromRad: 10, toRad: 2, minVal: 0, maxVal: 255},
    {fromRad: 2, toRad: 10, minVal: 0, maxVal: 255},
    {fromRad: 2, toRad: 8, minVal: 0, maxVal: 511 },
    {fromRad: 8, toRad: 2, minVal: 0, maxVal: 63 },
    {fromRad: 2, toRad: 16, minVal: 0, maxVal: 65535},
    {fromRad: 16, toRad: 2, minVal: 0, maxVal: 65535} 
];
*/
var defaultConversions = [ 
    { radix:{ from: 10, to: 2 }, range:{ min: 0, max: 255} },
    { radix:{ from: 2, to: 10 }, range:{ min: 0, max: 255} },
    { radix:{ from: 2, to: 8 }, range:{ min: 0, max: 511 } },
    { radix:{ from: 8, to: 2 }, range:{ min: 0, max: 63 } },
    { radix:{ from: 2, to: 16 }, range:{ min: 0, max: 65535} },
    { radix:{ from: 16, to: 2 }, range:{ min: 0, max: 65535} } 
];

function shouldFormatFrom(params, fromRad, toRad) {
    if (fromRad != 2 || (toRad != 8 && toRad != 16)) return false;
    if (params && params.spaceBinary == false) return false;
    return true;
}

function nZeros(n) {
    return Array(n+1).join("0");
}
function formatBinary(str, groupSize) {
    if (str.length % groupSize != 0)
        str = nZeros(groupSize - str.length % groupSize) + str;
    return str.match(new RegExp('.{1,' + groupSize + '}', 'g')).join(" ");
}

function shouldFormatAnswer(params, fromRad, toRad) {
    if (toRad != 2 || (fromRad != 8 && fromRad != 16)) return false;
    if (params && params.spaceBinary == false) return false;
    return true;
}

module.exports.radixDescription = function(radix, randomStream) {

    // choose "base 16" or "hexademical" ?
    var useWordOrNumberToDescribeBase = randomStream.nextIntRange(2);

    if (useWordOrNumberToDescribeBase == 0)
        return "base " + radix;

    switch(radix) {
        case 8: return "octal";
        case 16: return "hexadecimal";
        case 2: return "binary";
        case 10: return "decimal";
        default: return "base " + radix;
    }

}

module.exports.generate = function(randomStream, params) {

    var conversions = (params && params.conversions && params.conversions.length > 0) ? params.conversions : defaultConversions;
    
    var whichConversion = randomStream.nextIntRange(conversions.length)

    
    var numToConvert = conversions[whichConversion].range.min + randomStream.nextIntRange(conversions[whichConversion].range.max-conversions[whichConversion].range.min + 1)
    
    
    var fromRad = conversions[whichConversion].radix.from;
    var toRad = conversions[whichConversion].radix.to;      
    
    var from = numToConvert.toString(fromRad);
    
    var fromDesc = module.exports.radixDescription(fromRad, randomStream);
    var toDesc = module.exports.radixDescription(toRad, randomStream);
    var answer = numToConvert.toString(toRad);

    if (shouldFormatFrom(params, fromRad, toRad))
        from = formatBinary(from, (toRad == 8) ? 3 : 4);
    if (shouldFormatAnswer(params, fromRad, toRad))
        answer = formatBinary(answer, (fromRad == 8) ? 3 : 4);

    this.question = "Convert " + from + " from " + fromDesc + " to " + toDesc + "."; 
    this.answer = answer;
    this.format = "input";
};

module.exports.validateParameters = function(params) {
    var errors = [];
    if (params === undefined) return [];
    if (typeof params !== 'object') return [{ type: 'ExpectedObjectError', path: []}];

    // spaceBinary validation
    if ('spaceBinary' in params) {
        if (params.spaceBinary !== true && params.spaceBinary !== false)
            errors.unshift({ type: 'ExpectedBooleanError', path: ['spaceBinary']});
    }
    
    // conversions validation
    if ('conversions' in params) {
        if (!Array.isArray(params.conversions)) {
            errors.unshift({ type: 'ExpectedArrayError', path: ['conversions']});
        } else {
            for (var i = 0; params.conversions.length > i; i++) {
                var conversion = params.conversions[i];

                if (!('radix' in conversion)) {
                    errors.unshift({ type: 'RequiredError', path: ['conversions', i, 'radix']});
                } else {
                    // must be [2-10] | [16]
                    if (!('from' in conversion.radix)) {
                        errors.unshift({ type: 'RequiredError', path: ['conversions', i, 'radix', 'from']});
                    } else {
                        if (!(Number.isSafeInteger(conversion.radix.from))) 
                            errors.unshift({ type: 'ExpectedIntegerError', path: ['conversions', i, 'radix', 'from']});
                        if (conversion.radix.from < 2) 
                            errors.unshift({ type: 'MinimumValueError', path: ['conversions', i, 'radix', 'from']});
                        if (conversion.radix.from > 36)
                            errors.unshift({ type: 'MaximumValueError', path: ['conversions', i, 'radix', 'from']});
                    }

                    if (!('to' in conversion.radix)) {
                        errors.unshift({ type: 'RequiredError', path: ['conversions', i, 'radix', 'to']});
                    } else {
                        if (!(Number.isSafeInteger(conversion.radix.to))) 
                            errors.unshift({ type: 'ExpectedIntegerError', path: ['conversions', i, 'radix', 'to']});
                        if (conversion.radix.to < 2) 
                            errors.unshift({ type: 'MinimumValueError', path: ['conversions', i, 'radix', 'to']});
                        if (conversion.radix.to > 36)
                            errors.unshift({ type: 'MaximumValueError', path: ['conversions', i, 'radix', 'to']});
                    }

                    if (('from' in conversion.radix) && ('to' in conversion.radix)) {
                        if (conversion.radix.from === conversion.radix.to) {
                            errors.unshift({ type: 'ToFromEqualError', path: ['conversions', i, 'radix']});
                        }
                    }
                }

                if (!('range' in conversion)) {
                    errors.unshift({ type: 'RequiredError', path: ['conversions', i, 'range']});
                } else {
                    if (!('min' in conversion.range)) {
                        errors.unshift({ type: 'RequiredError', path: ['conversions', i, 'range', 'min']});
                    } else {
                        if (!(Number.isSafeInteger(conversion.range.min))) 
                            errors.unshift({ type: 'ExpectedIntegerError', path: ['conversions', i, 'range', 'min']});
                        if (conversion.range.min < 0) 
                            errors.unshift({ type: 'MinimumValueError', path: ['conversions', i, 'range', 'min']});
                    }

                    if (!('max' in conversion.range)) {
                        errors.unshift({ type: 'RequiredError', path: ['conversions', i, 'range', 'max']});
                    } else {
                        if (!(Number.isSafeInteger(conversion.range.max))) 
                            errors.unshift({ type: 'ExpectedIntegerError', path: ['conversions', i, 'range', 'max']});
                        if (conversion.range.max < 0) 
                            errors.unshift({ type: 'MinimumValueError', path: ['conversions', i, 'range', 'max']});
                    }

                    if (('max' in conversion.range) && ('min' in conversion.range)) {
                        if (conversion.range.min > conversion.range.max) {
                            errors.unshift({ type: 'InvalidIntervalError', path: ['conversions', i, 'range']});
                        }
                    }
                }

            }
        }
    }

    return errors;
}












