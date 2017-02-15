var problems =  require("../problemTypes");

// This is the schema for quiz descriptors, expressed using http://json-schema.org/
exports.qdSchema = {
    type: 'object',
    required: ['version', 'questions'],
    additionalProperties: false,
    
    properties: {
        'version': {
            type: 'string',
        },
        'questions': {
            type: 'array',
            items: {anyOf: Object.keys(problems.problemTypes).map(function (qType) {
                var qSchema = problems.problemTypes[qType].paramSchema;
                if (!qSchema)
                    qSchema = {};
                return {
                    type: 'object',
                    required: ['question'],
                    additionalProperties: false,
                    
                    properties: {
                        'question': {
                            type: 'string',
                            enum: [qType],
                        },
                        'repeat': {
                            type: 'integer',
                            minimum: 1,
                        },
                        'parameters': qSchema,
                    },
                };
            })},
        },
    },
};

