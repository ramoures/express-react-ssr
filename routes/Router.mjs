import { Router } from "express";
import Main from "../controllers/Main.mjs";
import Posts from "../controllers/Posts.mjs";
const main = new Main();
const posts = new Posts();
const Routes = Router();

Routes.get('/', main.home);
Routes.get('/products', posts.home);
Routes.use(main.notFound);
Routes.use((req, res) => {
    res.status(500).send('500 Internal Server Error!')
});
export default Routes;