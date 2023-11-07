# REST vs RPC API Implementation

This document provides an overview of the differences between RESTful and RPC API styles as implemented in our server applications.

## REST API

The REST API is based on the principles of Representational State Transfer (REST). It is designed to use standard HTTP verbs and is centered around the concept of resources.

### Features

- **Resource-Oriented:** Access and manipulation of resources using standard HTTP methods.
- **Stateless Operations:** Each request from client to server must contain all the information needed to understand the request.
- **Uniform Interface:** Standardized way to use the methods (GET, POST, PUT, DELETE) which promotes simplicity and reusability.
- **Error Handling:** Utilizes HTTP status codes for indicating success or failure.

### Endpoints

- `GET /history`: Retrieves the conversation history.
- `POST /`: Creates a chat response.
- `PUT /history/:id`: Updates a specific conversation.
- `DELETE /history/:id`: Deletes a specific conversation.

## RPC API

The RPC (Remote Procedure Call) API is action-oriented. It focuses on invoking functions on the server rather than manipulating resources.

### Features

- **Action-Oriented:** Focused on performing specific operations or function calls.
- **Procedure Calls:** Endpoints typically correspond to specific actions or commands on the server.
- **Flexible Methods:** Often uses POST for various interactions with the action specified in the body or URL.
- **Error Handling:** May use application-specific error messages in addition to HTTP status codes.

### Procedures

- `getHistory`: Internal method to get the conversation history.
- `createChat`: Internal method to create a chat response.
- `updateChat`: Internal method to update a conversation.
- `deleteChat`: Internal method to delete a conversation.

### Endpoints

- `GET /history`: Invokes `getHistory` to retrieve conversation history.
- `POST /`: Invokes `createChat` to create a new chat response.
- `PUT /history/:id`: Invokes `updateChat` to update a specific conversation.
- `DELETE /history/:id`: Invokes `deleteChat` to delete a specific conversation.

## Comparison

- **REST:** Uses a stateless, cacheable communications protocol -- the standard web HTTP protocol.
- **RPC:** Encapsulates the action in a single endpoint, typically using POST, and describes the action to be taken.

Both APIs interact with an AI model to process and respond to user input, but they do so using different architectural styles suitable for different use cases.
