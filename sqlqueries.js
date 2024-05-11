import connection from "../backend/server";

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS Users (
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Phone INT PRIMARY KEY,
    Password VARCHAR(255) NOT NULL,
    UserType ENUM('user', 'manager', 'admin') NOT NULL
  )
`;

const createEventsTable = `
  CREATE TABLE IF NOT EXISTS Events (
    User Name VARCHAR(20) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Phone INT PRIMARY KEY,
    Subject VARCHAR(255) NOT NULL,
    Description TEXT,
    Date DATE NOT NULL,
    Location VARCHAR(255),
  )
`;

const createTicketsTable = `
  CREATE TABLE IF NOT EXISTS Tickets (
    Event VARCHAR(100) NOT NULL,
    Date DATE NOT NULL,
    Size VARCHAR(255) NOT NULL,
    Price DECIMAL(10,2) NOT NULL
  )
`;

const createAttendeesTable = `
  CREATE TABLE IF NOT EXISTS Attendees (
    AttendeeID INT PRIMARY KEY AUTO_INCREMENT,
    Event VARCHAR(100) NOT NULL,
    User Name VARCHAR(20) NOT NULL,
    RegisterDate INT NOT NULL,
    PaymentStatus VARCHAR(100)
  )
`;

connection.query(createUsersTable, (err, result) => {
  if (err) throw err;
  console.log("Users table created");
});

connection.query(createEventsTable, (err, result) => {
  if (err) throw err;
  console.log("Events table created");
});

connection.query(createTicketsTable, (err, result) => {
  if (err) throw err;
  console.log("Tickets table created");
});

connection.query(createAttendeesTable, (err, result) => {
  if (err) throw err;
  console.log("Attendees table created");
});

connection.end((err) => {
  if (err) throw err;
  console.log("Connection closed");
});
