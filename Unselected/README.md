# Project Name: Ethical Inquiry Platform

## Table of Contents
- [Installation](#installation)
- [Compiling the Code](#compiling-the-code)
- [Executing the System](#executing-the-system)
- [Architecture Design](#architecture-design)
- [Rationale for Selection](#rationale-for-selection)
- [Change of architecture options](#Change-of-architecture-options)

## Installation
### Compilation & Implementation Platform
- **Platform**: IntelliJ IDEA
- **Download**: [IntelliJ IDEA Download](https://www.jetbrains.com/idea/download/)
- **Installation and Configuration**:
  - Download IntelliJ IDEA from the provided link.
  - Follow the installation instructions for your operating system provided by JetBrains.
  - Open IntelliJ IDEA and configure it to use your JDK version.

### ChatGPT API Key Configuration
- Navigate to the `app.js` file in the project's backend directory.
- Enter your ChatGPT API key in the required field within this file.
- apiKey:'replace your-apikey-here'

## Compiling the Code
- Open a terminal or command prompt.
- Navigate to the `backend` directory: `cd path/to/backend`
- Install backend dependencies: `npm install`
- Start the backend server: `npm start`
- Open a new terminal or command prompt window.
- Navigate to the `frontend` directory: `cd path/to/frontend`
- Install frontend dependencies: `npm install`
- Start the frontend server: `npm start`
- Note: see app.js file in the backend for using another architecture style.

## Executing the System
- The frontend will automatically open in your default web browser, or you can manually go to `localhost:3000` in your web browser to interact with the system.

## Architecture Design
### Candidate Architectures: REST vs. RPC
- **REST**:
  - Utilizes stateless HTTP requests, enabling seamless data exchange and efficient interaction with the web.
  - Highly scalable; handles numerous user requests efficiently.
  - The uniform interface allows for a consistent API across different client platforms.
  - REST's caching mechanism improves performance by providing quick access to repeated data.

- **RPC**:
  - Operates by making procedure calls across the network. Calls can be synchronous or asynchronous.
  - While it can be made to scale, it often requires complex management of endpoints and service discovery.
  - Interfaces are action-based rather than resource-based, which can be less intuitive when working with web resources.

# Rationale for REST Architecture Selection

Our project leverages the REST architectural style for several strategic reasons, which are delineated below:

## Resource-Based URLs
- The server defines endpoints such as `/history` and `/history/:id`, treating conversation history items as resources accessible and manageable via standard HTTP methods.

## HTTP Methods for CRUD Operations
- `GET /history`: Retrieves the conversation history, implementing the "Read" operation.
- `POST /`: Creates a new chat response, constituting the "Create" operation.
- `PUT /history/:id`: Updates an existing conversation item, signifying the "Update" operation.
- `DELETE /history/:id`: Deletes a conversation item, representing the "Delete" operation.

## Stateless Interactions
- Every client-server request contains all the information needed to process the request, adhering to REST's stateless protocol.

## Content Negotiation
- Communication with clients is conducted using the JSON data format, streamlining data exchange between various client platforms and the server.

## Advantages of REST for Our Project
1. **Simplicity**: Utilizes straightforward HTTP methods.
2. **Statelessness**: Eliminates the need for server-side session tracking, enhancing scalability.
3. **Scalability**: Efficiently handles a multitude of requests concurrently.
4. **Cacheability**: Enables caching of GET requests, improving response times.
5. **Flexibility and Portability**: Facilitates interaction with different client applications via JSON.
6. **Independence**: Supports independent client and server development, provided the interface remains consistent.

This RESTful approach is integral to the design of our ethical inquiry platform, ensuring it remains robust, efficient, and flexible for future growth and diversification of client applications.

We believe these decisions provide a robust foundation for an ethical inquiry platform that is secure, user-friendly, and forward-looking.

## Change of architecture options
- We initially chose a Client-Server architecture for its familiarity and simplicity. However, as our project developed, we noticed its similarities with REST didn't offer unique benefits. We switched to RPC because it better streamlined our platform's distinct, transactional operations into single calls and supported a wider range of data formats, improving functionality and flexibility. This shift also simplified client code, aiding maintainability and efficiency, ensuring our platform could easily evolve with future needs.

