import { Router } from 'express';
import BookController from '../../controllers/book/bookController';
import Authorization from '../../middlewares/authMiddleware';
import {
  schemaDataCreateBook,
  schemaIdBook,
  schemaDataUpdateBook,
  schemaIdBook as schemaDataDeleteBook,
  schemaIdBook as schemaDataRentedBook,
  validateData,
  validateParamById,
  validateDeleteById,
  validateDeleteById as validateRentedById,
} from '../../validator/index';

export class BookRoutes {
  public router = Router();
  private bookController: BookController;
  private authorization: Authorization;

  constructor() {
    this.bookController = new BookController();
    this.authorization = new Authorization();
    this.init();
  }

  private init() {
    this.router.post(
      '/createBook',
      validateData(schemaDataCreateBook),
      this.authorization.authToken,
      this.bookController.createBook
    );
    this.router.get('/getAllBook', this.authorization.authToken, this.bookController.getAllBook);
    this.router.get(
      '/getBookById/:id',
      validateParamById(schemaIdBook),
      this.authorization.authToken,
      this.bookController.getBookById
    );
    this.router.get('/searchBook', this.authorization.authToken, this.bookController.searchBook);
    this.router.get(
      '/getRentedBook',
      this.authorization.authToken,
      this.bookController.getRentedBook
    );
    this.router.get(
      '/getRentedBook',
      this.authorization.authToken,
      this.bookController.getRentedBook
    );
    this.router.put(
      '/updateBookById',
      validateData(schemaDataUpdateBook),
      this.authorization.authToken,
      this.bookController.updateBookById
    );
    this.router.delete(
      '/deleteBookById',
      validateDeleteById(schemaDataDeleteBook),
      this.authorization.authToken,
      this.bookController.deleteBookById
    );
    this.router.post(
      '/rentedBookById',
      validateRentedById(schemaDataRentedBook),
      this.authorization.authToken,
      this.bookController.rentedBookById
    );
  }
}

const bookRoutes = new BookRoutes();
export default bookRoutes.router;
