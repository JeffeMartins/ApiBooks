import {Router} from 'express';
import UserRouter from "./../routers/users/userRouter";
import LoginRouter from "./../routers/login/loginRouter";
import BookRouter from "./../routers/book/bookRouter";

const routes = Router();

routes.use(UserRouter);
routes.use(LoginRouter);
routes.use(BookRouter);

export default routes;

