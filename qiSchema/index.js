// This is the schema for quiz instances, expressed using http://json-schema.org/
exports.qiSchema = {
  "type": "object",
  "required": [
    "errors",
    "warnings",
    "quizElements"
  ],
  "additionalProperties": false,
  "properties": {
    "version": {
      "type": "string"
    },
    "errors": {
      "type": "array",
      "items": {
        "type": "string"
      }    
    },
    "warnings": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "quizElements": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/quizElement"
      }    
    }
  },
  "definitions": {
    "label": {
      "id": "#label",
      "type": "object",
      "required": [ "label" ],
      "properties": { "label": { "type": "string" } },
      "additionalProperties": false
    },
    "mc-question": {
      "id": "#mc-question",
      "type": "object",
      "additionalProperties": false,
      "required": [
        "outputType","problemType","points","questionText","distractors","answer","answerIndex"
      ],
      "properties": {
        "outputType": { "type": "string" },
        "problemType": { "type": "string" },
        "points": { "type": "number" },
        "questionText": { "type": "string" },
        "distractors": {
          "type": "array",
          "items": { "type": "string" }
        },
        "answer": { "type": "string" },
        "answerIndex": { "type": "integer" }
      }
    },
    "fr-question": {
      "id": "#fr-question",
      "type": "object",
      "additionalProperties": false,
      "required": [
        "outputType","problemType","points","questionText","answer"
      ],
      "properties": {
        "outputType": { "type": "string" },
        "problemType": { "type": "string" },
        "points": { "type": "number" },
        "questionText": { "type": "string" },
        "answer": { "type": "string" }
      }
    },
    "custom-question": {
      "id": "#custom-question",
      "type": "object",
      "additionalProperties": true,
      "required": [
        "outputType","problemType","points","questionText"
      ],
      "properties": {
        "outputType": { "type": "string" },
        "problemType": { "type": "string" },
        "points": { "type": "number" },
        "questionText": { "type": "string" },
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
