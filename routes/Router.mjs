import { Router } from "express";
import Main from "../controllers/Main.mjs";
import Category from "../controllers/Category.mjs";
import Post from "../controllers/Post.mjs";
const main = new Main();
const category = new Category();
const post = new Post();
const Routes = Router();

Routes.get('/', main.home);
Routes.get('/category/:name', category.home);
Routes.get('/category/:name/products/:slug', post.home);
Routes.use(main.notFound);
Routes.use((req, res) => {
    res.status(500).send('500 Internal Server Error!')
});
export default Routes;