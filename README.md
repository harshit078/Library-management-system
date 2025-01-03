﻿# Library-Management-System
A Library Management System that allows users to:
- Add books to the library.
- Borrow books.
- Return borrowed books.
- View all available books.

This project follows **Test-Driven Development (TDD)** approach and uses **Jest** for testing.

## Features

1. **Add Books**: Add a book with unique details like ISBN, title, author, and publication year.
2. **Borrow Books**: Borrow a book if it’s available.
3. **Return Books**: Return a borrowed book and make it available again.
4. **View Available Books**: View a list of all available books.

## Setup Instructions
- ```git clone```
- ```npm i``` to install all the dependencies
- Run ```npm test``` to test the application

## Test Cases
### 1. Add Books: 
- Ensures that when a book is added to the library, it gets stored in the available books.
### 2. Borrow Book: 
- Verifies that a book can be successfully borrowed if it is available and if it not available it throws error and it gets removed from the list of available books.
### 3. Return Borrowed Book: 
- Ensures that a borrowed book can be returned to the library, and once returned.
### 4. View Available Books: 
- Allows the user to view all books.

## Test Coverage

```tests/library.test.ts
  Library Management System
    Book Management
      ✓ should add a new book to the library (3 ms)
      ✓ should not allow duplicate books (20 ms)
      ✓ should retrieve a book by ISBN
      ✓ should throw when getting non-existent book (1 ms)
    Borrowing System
      ✓ should allow borrowing an available book (1 ms)
      ✓ should not allow borrowing an unavailable book (1 ms)
      ✓ should allow returning a borrowed book
      ✓ should not allow returning a non-borrowed book (2 ms)
      ✓ should maintain accurate borrow history (1 ms)
    Available Books
      ✓ should view all available books in the library (1 ms)
      ✓ should show correct available books after some are borrowed (1 ms)

Test Suites: 1 passed, 1 total
Tests:       11 passed, 11 total
Snapshots:   0 total
Time:        2.647 s, estimated 5 s

```
