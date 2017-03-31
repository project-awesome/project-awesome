//var problems =  require("../problemTypes");
// Since we no longer validate parameters of individual problem types in this schema
// we don't need to know anything about valid problem types
//  Hmmm -- we actually could still check that the string inside problemType
//     on line 37
//  is valid, even if we don't check the parameters

// This is the schema for quiz descriptors, expressed using http://json-schema.org/
exports.qdSchema = {
  "type": "object",
  "required": [
    "version",
    "quizElements"
  ],
  "additionalProperties": false,
  "properties": {
    "version": {
      "type": "string"
    },
    "quizElements": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/quizElement"
      }
    }
  },
  "definitions": {
    "problem": {
      "id": "#problem",
      "type": "object",
      "additionalProperties": false,
      "required": [
        "problemType"
      ],
      "properties": {
        "problemType": {
          "type": "string"
        },
        "outputType": {
          "type": "string"
        },
        "params": {
          "type": "object"
        }
      }
    },
    "label": {
      "id": "#label",
      "type": "object",
      "required": [
        "label"
      ],
      "properties": {
        "label": {
          "type": "string"
        }
      },
      "additionalProperties": false
    },
    "shuffle": {
      "id": "#shuffle",
      "required": [
        "shuffle"
      ],
      "additionalProperties": false,
      "properties": {
        "shuffle": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/quizElement"
          }
        }
      }
    },
    "choose": {
      "id": "#choose",
      "type": "object",
      "required": [
        "choose",
        "items"
      ],
      "additionalProperties": false,
      "properties": {
        "choose": {
          "type": "integer"
        },
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/quizElement"
          }
        }
      }
    },
    "repeat": {
      "id": "#repeat",
      "type": "object",
      "required": [
        "repeat",
        "items"
      ],
      "additionalProperties": false,
      "properties": {
        "repeat": {
          "type": "integer"
        },
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/quizElement"
          }
        }
      }
    },
    "quizElement": {
      "id": "#quizElement",
      "type": "object",
      "oneOf": [
        {
          "$ref": "#/definitions/problem"
        },
        {
          "$ref": "#/definitions/label"
        },
        {
          "$ref": "#/definitions/repeat"
        },
        {
          "$ref": "#/definitions/shuffle"
        },
        {
          "$ref": "#/definitions/choose"
        }
      ]
    }
  }
}
