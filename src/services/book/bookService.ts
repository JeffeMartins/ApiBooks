import { IBook } from './../../interfaces/book/IBook';
import BookEntity from './../../entity/book/bookEntity';
import ResponseUserFactory from './../../factorys/user/response/responseUserFactory';

class BookService {
  public responseFactory = new ResponseUserFactory();

  public async create(data: IBook) {
    const response = await BookEntity.create(data);
    return this.responseFactory.responseUser('success', 'Book created successfully', 201, response);
  }

  public async getAllBook() {
    const response = await BookEntity.getAllBook();
    return this.responseFactory.responseUser('success', 'OK', 200, response);
  }

  public async getBookById(id: string) {
    const response = await BookEntity.getBookById(id);

    if (!response) return this.responseFactory.responseUser('Error', 'ID not found', 404, response);
    return this.responseFactory.responseUser('success', 'OK', 200, response);
  }

  public async searchBookByTitle(title: string) {
    const response = await BookEntity.searchBookByTitle(title);
    if (response.length === 0)
      return this.responseFactory.responseUser('Error', 'Title not found', 404, response);
    return this.responseFactory.responseUser('success', 'OK', 200, response);
  }

  public async searchBookByAuthor(author: string) {
    const response = await BookEntity.searchBookByAuthor(author);
    if (response.length === 0)
      return this.responseFactory.responseUser('Error', 'Author not found', 404, response);
    return this.responseFactory.responseUser('success', 'OK', 200, response);
  }

  public async getRentedBook(rented: boolean) {
    const response = await BookEntity.getRentedBook(rented);
    if (response.length === 0)
      return this.responseFactory.responseUser('Error', 'not found', 404, response);
    return this.responseFactory.responseUser('success', 'OK', 200, response);
  }

  public async updateBookById(id: string, data: object) {
    const isExistBook = await BookEntity.getBookById(id);
    if (isExistBook) {
      const dataUpdate = {
        ...data,
        updatedAt: new Date(),
      };
      await BookEntity.updateBookById(id, dataUpdate);
      return this.responseFactory.responseUser('', '', 204, {});
    }
    return this.responseFactory.responseUser('error', 'Book does not exist', 400, isExistBook);
  }

  public async deleteBookById(id: string) {
    const isExistBook = await BookEntity.getBookById(id);
    if (isExistBook) {
      if (isExistBook.isRented === true)
        return this.responseFactory.responseUser(
          'error',
          'this book cannot be deleted, it is rented',
          400,
          isExistBook
        );
      await BookEntity.deleteBookById(id);
      return this.responseFactory.responseUser('', '', 204, {});
    }
    return this.responseFactory.responseUser('error', 'Book does not exist', 400, isExistBook);
  }

  public async rentedBookById(id: string) {
    const isExistBook = await BookEntity.getBookById(id);
    if (isExistBook) {
      if (isExistBook.isRented === true)
        return this.responseFactory.responseUser(
          'error',
          'this book is already rented',
          400,
          isExistBook
        );
      const dataUpdate = {
        isRented: true,
        updatedAt: new Date(),
      };
      const book = await BookEntity.rentedBookById(id, dataUpdate);
      return this.responseFactory.responseUser('Success', 'Successfully rented book', 200, book);
    }
    return this.responseFactory.responseUser('error', 'Book does not exist', 400, isExistBook);
  }
}

export default new BookService();
