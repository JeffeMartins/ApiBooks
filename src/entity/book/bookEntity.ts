import {PrismaClient} from '@prisma/client';
import {IBook} from "./../../interfaces/book/IBook";

class BookEntity {
    public prismaClient = new PrismaClient();

    public async create(data: IBook) {
        return await this.prismaClient.book.createMany({data: data});
    }

    public async getAllBook() {
        return await this.prismaClient.book.findMany();
    }

    public async getBookById(id: string) {
        return await this.prismaClient.book.findUnique({
            where: {
                id: id
            },
        })
    }

    public async searchBookByTitle(title: string) {
        return await this.prismaClient.book.findMany({
            where: {
                title: {
                    contains: title
                }
            },
        })
    }

    public async searchBookByAuthor(author: string) {
        return await this.prismaClient.book.findMany({
            where: {
                author: {
                    contains: author
                }
            },
        })
    }

    public async getRentedBook(rented: boolean) {
        return await this.prismaClient.book.findMany({
            where: {
                isRented: rented
            },
        })
    }

    public async updateBookById(id: string, data: object) {
        return await this.prismaClient.book.update({
            where: {
                id: id
            },
            data: data,
        })
    }

    public async deleteBookById(id: string) {
        await this.prismaClient.book.delete({
            where: {
                id: id
            },
        })
        return true;
    }

    public async rentedBookById(id: string, data: object) {
        return await this.prismaClient.book.update({
            where: {
                id: id
            },
            data: data,
        })
    }
}

export default new BookEntity();