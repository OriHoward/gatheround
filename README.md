# gatheround

Gatheround is a web application that connects event hosts with businesses to facilitate the planning of successful events. By utilizing custom search criteria and send requests, hosts can easily find suitable businesses for their events, and businesses can manage their service packages, set unavailability dates, accept or decline requests.
In addition, businesses can control their profile visibility in case they are on vacation or need to make changes to their services. Both hosts and businesses receive notifications about requests and responses to streamline communication.
The application provides a user-friendly interface that streamlines the event planning process, enabling hosts to create successful events and businesses to expand their clientele

## Tech Stack
Backend
* Python
* Flask
* Flask_restful
* Flask_JWT
* SQLAlchemy (ORM)
* MySQL

Frontend
* React-Native
* React Native Paper

**Python**: A high-level programming language used for backend development.development.  
**Flask**: a micro web framework used for building the RESTful API.  
**Flask_restful**: an extension of Flask for building RESTful APIs quickly and easily.  
**Flask_JWT**: an extension for Flask that adds JSON Web Token (JWT) authentication to the API.  
**SQLAlchemy (ORM)**: a Python SQL toolkit and ORM used to handle the database models and queries.  
**MySQL**: the chosen relational database management system (RDBMS) used for storing the data.  
**React-Native**: a JavaScript framework used for building cross-platform mobile applications.  
**React Native Paper**: a UI library for React Native that provides pre-designed UI components for faster development.  


## Features

**User authentication**: The app allows users to create accounts and login using email and password. User passwords are encrypted using a secure hashing algorithm for enhanced security.  

**Host Features**
* Create events and manage event details.  
* Search for businesses based on custom criteria.  
* Send requests to businesses and receive notifications on responses.  

**Business Features**
* Manage service packages and pricing.  
* Set unavailability dates and times.  
* Accept or decline requests from hosts and receive notifications on requests. 
* Control profile visibility for added flexibility and privacy.  



## Installation and how to run

### Frontend  
To run the frontend of this application, you will need to have Node.js and npm installed on your machine.
- Clone the frontend repository:
```shell
git clone https://github.com/OriHoward/gatheround.git
```
- Install dependencies using npm:
```shell
npm install
```
- Start the frontend application:
```shell
npm start
```
- Open the Expo app on your phone and scan the QR code to see the app running.  

### Backend
To run the backend of this application, you will need to have Python 3 and Poetry installed on your machine. 
To install poetry follow the instruction on the [official Website](https://python-poetry.org/docs/#installing-with-the-official-installer)
- Clone the backend repository:
```shell
git clone https://github.com/OriHoward/gatheround-backend.git
```
- Install Poetry: follow the instructions on the [official website](https://python-poetry.org/docs/#installing-with-the-official-installer).  
- Install the project dependencies:
```shell
poetry install
```
Start the database using Docker Compose
```shell
docker-compose up
```
Start the backend server:
```shell
poetry run python run.py
```
This should start the server at http://localhost:5000.

Note: You may also need to use ngrok for tunneling to make the connection between the frontend and backend, depending on your setup. Please refer to the ngrok documentation for more information
### Contributors

- Ori Howard
- Eitan Kats
- Adi Yafe
