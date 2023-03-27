import {describe, expect, it, vi} from 'vitest';
import BookServer from './bookService';
import BookEntity from './../../entity/book/bookEntity';

describe('Testing services Book', () => {
    it("Should return success for create a new books", async () => {
        const request: any = [{
            "title": "Harry Potter e a Pedra Filosofal",
            "author": "J.K. Rowling",
            "description": "O livro conta a história de Harry Potter, um jovem órfão que descobre aos 11 anos que é um bruxo.",
            "publisher": "Rocco",
            "publicationDate": "2000"
        }]

        const createBookentity = vi.spyOn(BookEntity, "create");
        createBookentity.mockResolvedValue({
            statusCode: 201,
            status: 'success',
            message: 'Book created successfully',
            data: {count: 1}
        });

        const response = await BookServer.create(request);
        expect(response.statusCode).toEqual(201);
    })

    it("Should return success for getAllBook", async () => {
        const createBookentity = vi.spyOn(BookEntity, "getAllBook");
        createBookentity.mockResolvedValue({
            statusCode: 200,
            status: "success",
            message: "OK",
        });
        const response = await BookServer.getAllBook();
        expect(response.statusCode).toEqual(200);
    })

    it("Should return success for getBookById", async () => {
        const createBookentity = vi.spyOn(BookEntity, "getBookById");
        const mock = {
            "statusCode": 200,
            "status": "success",
            "message": "OK",
            "data": {
                "id": "641d089a83a9b1977d17428c",
                "title": "Harry Potter e a Pedra Filosofal",
                "author": "J.K. Rowling",
                "description": "O livro conta a história de Harry Potter, um jovem órfão que descobre aos 11 anos que é um bruxo.",
                "publisher": "Rocco",
                "publicationDate": "1997",
                "isRented": true,
                "createdAt": "2023-03-24T02:19:05.254Z",
                "updatedAt": "2023-03-25T00:59:36.543Z"
            }
        }
        createBookentity.mockResolvedValue(mock);
        const response = await BookServer.getBookById("641d089a83a9b1977d17428c");
        expect(response.statusCode).toEqual(200);
    })

    it("Should return error for getBookById", async () => {
        const createBookentity = vi.spyOn(BookEntity, "getBookById");
        const mock = false

        createBookentity.mockResolvedValue(mock);
        const response = await BookServer.getBookById("641d089a83a9b1977d17428z");
        expect(response.statusCode).toEqual(404);
    })

    it("Should return success for searchBookByTitle", async () => {
        const createBookentity = vi.spyOn(BookEntity, "searchBookByTitle");
        const mock = {
            statusCode: 200,
            status: "success",
            message: "OK",
        }
        createBookentity.mockResolvedValue(mock);
        const response = await BookServer.searchBookByTitle("Harry");
        expect(response.statusCode).toEqual(200);
    })

    it("Should return success for searchBookByAuthor", async () => {
        const createBookentity = vi.spyOn(BookEntity, "searchBookByAuthor");
        const mock = {
            statusCode: 200,
            status: "success",
            message: "OK",
        }
        createBookentity.mockResolvedValue(mock);
        const response = await BookServer.searchBookByAuthor("Harry");
        expect(response.statusCode).toEqual(200);
    })

    it("Should return success for getRentedBook", async () => {
        const createBookentity = vi.spyOn(BookEntity, "getRentedBook");
        const mock = {
            statusCode: 200,
            status: "success",
            message: "Successfully rented book",
        }
        createBookentity.mockResolvedValue(mock);
        const response = await BookServer.getRentedBook(true);
        expect(response.statusCode).toEqual(200);
    })

    it("Should return success for updateBookById", async () => {
        const createBookentity = vi.spyOn(BookEntity, "getBookById");
        const updateBookentity = vi.spyOn(BookEntity, "updateBookById");
        const mockRequest = {
            "title": "Harry Potter e a Pedra Filosofal",
            "author": "J.K. Rowling",
            "description": "O livro conta a história de Harry Potter, um jovem órfão que descobre aos 11 anos que é um bruxo.",
            "publisher": "Rocco",
            "publicationDate": "2000"
        };

        const mockResponse = true;
        createBookentity.mockResolvedValue(mockResponse);
        updateBookentity.mockResolvedValue({statusCode: 204})
        const response = await BookServer.updateBookById("641cfd1edb6d22739e899c0c", mockRequest);
        expect(response.statusCode).toEqual(204);
    })

    it("Should return Error for updateBookById", async () => {
        const createBookentity = vi.spyOn(BookEntity, "getBookById");
        const updateBookentity = vi.spyOn(BookEntity, "updateBookById");
        const mockRequest = {
            "title": "Harry Potter e a Pedra Filosofal",
            "author": "J.K. Rowling",
            "description": "O livro conta a história de Harry Potter, um jovem órfão que descobre aos 11 anos que é um bruxo.",
            "publisher": "Rocco",
            "publicationDate": "2000"
        };

        const mockResponse = false;
        createBookentity.mockResolvedValue(mockResponse);
        updateBookentity.mockResolvedValue({statusCode: 204})
        const response = await BookServer.updateBookById("641cfd1edb6d22739e899c0c", mockRequest);
        expect(response.statusCode).toEqual(400);
    })

    it("Should return success for deleteBookById", async () => {
        const createBookentity = vi.spyOn(BookEntity, "getBookById");
        const getBookentity = vi.spyOn(BookEntity, "deleteBookById");

        const mockResponse = {
            statusCode: 204,
            isRented: false,
        }

        createBookentity.mockResolvedValue(mockResponse);
        getBookentity.mockResolvedValue(true);
        const response = await BookServer.deleteBookById("641d089a83a9b1977d17428c");
        expect(response.statusCode).toEqual(204);
    })

    it("Should return Erro for deleteBookById", async () => {
        const getBookentity = vi.spyOn(BookEntity, "getBookById");
        const geleteBookentity = vi.spyOn(BookEntity, "deleteBookById");

        const mockResponse = {
            isRented: true,
        }
        const mockResponseDeleteBookById = {
            statusCode: 204,
        }
        getBookentity.mockResolvedValue(mockResponse);
        geleteBookentity.mockResolvedValue(mockResponseDeleteBookById);
        const response = await BookServer.deleteBookById("641d089a83a9b1977d17428c");
        expect(response.statusCode).toEqual(400);
    })

    it("Should return Error for deleteBookById", async () => {
        const createBookentity = vi.spyOn(BookEntity, "deleteBookById");
        const getBookentity = vi.spyOn(BookEntity, "deleteBookById");

        const mockResponse = {
            "statusCode": 204
        }
        createBookentity.mockResolvedValue(mockResponse);
        getBookentity.mockResolvedValue(false);
        const response = await BookServer.deleteBookById("641d089a83a9b1977d17428c");
        expect(response.statusCode).toEqual(400);
    })

    it("Should return success for rentedBookById", async () => {
        const createBookentity = vi.spyOn(BookEntity, "rentedBookById");
        const getBookentity = vi.spyOn(BookEntity, "getBookById");


        const mockResponse = {
            "statusCode": 200,
            "status": "Success",
            "message": "Successfully rented book",
            "data": {
                "id": "641d089a83a9b1977d17428d",
                "title": "A Culpa é das Estrelas",
                "author": "John Green",
                "description": "O livro narra a história de dois adolescentes que se conhecem em um grupo de apoio para pacientes com câncer.",
                "publisher": "Intrínseca",
                "publicationDate": "2012",
                "isRented": true,
                "createdAt": "2023-03-24T02:19:05.254Z",
                "updatedAt": "2023-03-25T21:11:50.891Z"
            }
        }
        const mockGetBookById = {
            isRented: false,
        }
        createBookentity.mockResolvedValue(mockResponse);
        getBookentity.mockResolvedValue(mockGetBookById);
        const response = await BookServer.rentedBookById("641d089a83a9b1977d17428d");
        expect(response.statusCode).toEqual(200);
    })

    it("Should return Error for rentedBookById", async () => {
        const createBookentity = vi.spyOn(BookEntity, "rentedBookById");
        const getBookentity = vi.spyOn(BookEntity, "getBookById");

        const mockResponse = {
            "statusCode": 200,
            "status": "Success",
            "message": "Successfully rented book",
            "data": {
                "id": "641d089a83a9b1977d17428d",
                "title": "A Culpa é das Estrelas",
                "author": "John Green",
                "description": "O livro narra a história de dois adolescentes que se conhecem em um grupo de apoio para pacientes com câncer.",
                "publisher": "Intrínseca",
                "publicationDate": "2012",
                "isRented": true,
                "createdAt": "2023-03-24T02:19:05.254Z",
                "updatedAt": "2023-03-25T21:11:50.891Z"
            }
        }

        const mockGetBookById = {
            isRented: true,
        }
        createBookentity.mockResolvedValue(mockResponse);
        getBookentity.mockResolvedValue(mockGetBookById);
        const response = await BookServer.rentedBookById("641d089a83a9b1977d17428d");
        expect(response.statusCode).toEqual(400);
    })


})