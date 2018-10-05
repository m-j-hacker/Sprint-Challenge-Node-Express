# Review Questions

## What is Node.js?

Node.js is a runtime environment used to execute JavaScript applications outside of a browser.

## What is Express?

Express is a Node module that acts as a unopinionated framework on top of Node that makes it easy to create web apps and services.

## Mention two parts of Express that you learned about this week.

1 Routing
2 Middleware

## What is Middleware?

Middleware are functions that are executed in the order they are introduced in the server code. Middleware
intercepts requests and manipulates them in some way before passing them to the server

## What is a Resource?

Everything in an API accessible by a unique URI

## What can the API return to help clients know if a request was successful?

HTTP status codes and messages

## How can we partition our application into sub-applications?

By separating routes using express router files and

## What is express.json() and why do we need it?

express.json is an express function that parses out JSON from the request body when ran from an express server .use method