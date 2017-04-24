// This is the schema for quiz instances, expressed using http://json-schema.org/
exports.qiSchema = {
  "type": "object",
  "required": [ "errors", "warnings", "seed", "version", "quizElements" ],
  "additionalProperties": false,
  "properties": {
    "seed": { "type": "string" },
    "version": { "type": "string" },
    "errors": { "type": "array", "items": { "type": "string" } },
    "warnings": { "type": "array", "items": { "type": "string" } },
    "quizElements": { "type": "array", "items": { "$ref": "#/definitions/quizElement" } }
  },
  "definitions": {
    "label": {
      "id": "#label",
      "type": "object",
      "required": [ "label" ],
      "properties": { "label": { "type": "string" },
                      "warnings": {"type": "array", "items": {"type":"string"}}
                     },
      "additionalProperties": false
    },
          "mc-question": {
      "id": "#mc-question",
      "type": "object",
      "additionalProperties": false,
      "required": [
        "outputType","problemType","questionText","distractors","answer","answerIndex"
      ],
      "properties": {
        "outputType": {"type": "string", "pattern":"mc"},
        "problemType": { "type": "string" },
        "title": { "type": "string" },
        "questionText": { "type": "string" },
        "distractors": { "type": "array", "items": { "type": "string" }
        },
        "answer": { "type": "string" },
        "answerIndex": { "type": "integer" },
        "points": { "type": "number" },
        "warnings": {"type": "array", "items": {"type":"string"}}
      }
    },
    "fr-question": {
      "id": "#fr-question",
      "type": "object",
      "additionalProperties": false,
      "required": [
        "outputType","problemType","questionText","answer"
      ],
      "properties": {
        "outputType": {"type": "string", "pattern":"fr"},
        "problemType": { "type": "string" },
        "questionText": { "type": "string" },
        "answer": { "type": "string" },
        "title": { "type": "string" },
        "points": { "type": "number" },
        "warnings": {"type": "array", "items": {"type":"string"}}
      }
    },
    "custom-question": {
      "id": "#custom-question",
      "type": "object",
      "additionalProperties": true,
      "required": [
        "outputType","problemType","questionText"
      ],
      "properties": {
        "outputType": {"type": "string", "pattern":"custom"},
        "problemType": { "type": "string" },
        "questionText": { "type": "string" },
        "title": { "type": "string" },
        "points": { "type": "number" },
        "warnings": {"type": "array", "items": {"type":"string"}}
      }
    },
    "quizElement": {
      "id": "#quizElement",
      "type": [
        "object",
        "array"
      ],
      "oneOf": [
        { "$ref": "#/definitions/label" },
        { "$ref": "#/definitions/mc-question" },
        { "$ref": "#/definitions/fr-question" },
        { "$ref": "#/definitions/custom-question" },
        { "$ref": "#/definitions/quizElementList" }
      ]
    },
    "quizElementList": {
      "id": "#quizElementList",
      "type": "array",
      "items": { "$ref": "#/definitions/quizElement" }
    }
  }
}
