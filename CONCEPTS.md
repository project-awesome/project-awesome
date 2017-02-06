# Glossary of Terms and Running thoughts 

* format   HTML vs. MoodleXML vs Latex vs plaintext
* outputType    MC vs free-response (for now) vs Parsons, match, ...
* problemType  content of the question (convert between bases, order of ops)

An instance of a question is deterministically associated with:
* a problemType
* an outputType
* values for each of the parameters (not just a range)
* final wording (not necessarily stored with question since can be generated from above 3 items)
* answer (again can be generated from top 3 items but perhaps useful to compute once and store) 
*  maybe later: a difficulty rating that is computed from the problemType, outputType, and the specific values of parameters

Each problemType has a default outputType, and other supported styles

  For example Change of Base is a problemType involving conversion between
  various bases (dec -> oct, etc.). The default outputType might be multiple 
  choice but free-response is also supported. 

## Quiz Descriptor (QD)  ##
Plus seed yields quiz instance. Varying the seed with the same
QD, gives a new quiz instance.  (Ostensibly equivalent in difficulty.)

## Question Descriptor ##
I'm not as confident about the details here. Have Phill confirm.

A question descriptor is an element of a quiz descriptor and has some or all 
of the following:

* a problemType
* an outputType
* how many of these questions are on the quiz
* values for the parameters that this particular *problem generator* requires 
    * Note that these are *not necessarily* the final parameters in the problem


## Research Topics

Focusing on a given concept, vary the parameters and measure the difficulty
of the questions with the goal of trying to characterize the parameters that
generate different difficulty levels. (Mapping from parameter levels to 
difficulty level.)  

Build a system where students can provide informed consent and then always
gather statistics on the difficulty of a instance of a question.

## Problem Generators

A software module that could be implemented in any program language. It takes
a JSON object which is a question descriptor from a quiz descriptor. It 
returns an instance of a question formatted in JSON. The core project awesome
engine has a way to convert the JSON question into the supported format,
but if there is some custom formatting required for a certain problemType, then
the generator can override the default.

A question generator is typically accessed over http (as a webservice). There
is a typical URL scheme -- a work in progress. 

Presently all generators are defined in javascript which can be accessed 
directly through node. If we were to write another generator in another 
language it would need to be set up on a webserver.



