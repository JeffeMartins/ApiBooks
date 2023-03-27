import {Request, Response} from "express";
import BookService from "./../../services/book/bookService";
import {IBook} from "./../../interfaces/book/IBook";

class BookController {
    public async createBook(req: Request, res: Response) {
        try {
            const body: IBook = req.body;
            const response = await BookService.create(body)

            return res.status(response.statusCode).json(response);
        } catch
            (e) {
            return res.status(500).json(e);
        }
    }

    public async getAllBook(_req: Request, res: Response) {
        try {

            const response = await BookService.getAllBook()

            return res.status(response.statusCode).json(response);
        } catch
            (e) {
            return res.status(500).json(e);
        }
    }

    public async getBookById(req: Request, res: Response) {
        try {

            const {id} = req.params;

            if (!id) return res.status(400).json({statusCode: 400, status: "Bad Request", message: "Params not found"});

            const response = await BookService.getBookById(id)

            return res.status(response.statusCode).json(response);
        } catch
            (e) {
            return res.status(500).json(e);
        }
    }

    public async searchBook(req: Request, res: Response) {
        try {

            const {title, author} = req.query;
            const search = {
                title: typeof title === 'string' ? decodeURIComponent(title) : '',
                author: typeof author === 'string' ? decodeURIComponent(author) : ''
            };

            if (search.title && !search.author) {
                const response = await BookService.searchBookByTitle(search.title);
                return res.status(response.statusCode).json(response);
            }

            if (!search.title && search.author) {
                const response = await BookService.searchBookByAuthor(search.author);
                return res.status(response.statusCode).json(response);
            }


            return res.status(400).json({
                statusCode: 400,
                status: "Bad Request",
                message: "querys not found"
            });


        } catch
            (e) {
            return res.status(500).json(e);
        }
    }

    public async getRentedBook(req: Request, res: Response) {
        try {

            const rented = req.query.rented === 'true' ? true : false;

            const response = await BookService.getRentedBook(rented);
            return res.status(response.statusCode).json(response);


            return res.status(400).json({
                statusCode: 400,
                status: "Bad Request",
                message: "querys not found"
            });


        } catch
            (e) {
            return res.status(500).json(e);
        }
    }


    public async updateBookById(req: Request, res: Response) {
        try {

            const data = req.body;
            const id = data.id;
            delete data.id;

            for (const key in data) {
                data[key].trim() === "" ? delete data[key] : null
            }

            const response = await BookService.updateBookById(id, data);

            return res.status(response.statusCode).json(response);
        } catch
            (e) {
            return res.status(500).json(e);
        }
    }


    public async deleteBookById(req: Request, res: Response) {
        try {
            const id: string = req.body.id;
            const response = await BookService.deleteBookById(id)

            return res.status(response.statusCode).json(response);
        } catch
            (e) {
            return res.status(500).json(e);
        }
    }

    public async rentedBookById(req: Request, res: Response) {
        try {

            const {id} = req.body;

            const response = await BookService.rentedBookById(id);

            return res.status(response.statusCode).json(response);
        } catch
            (e) {
            return res.status(500).json(e);
        }
    }


}

export default BookController;