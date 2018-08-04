import { Router } from 'express';

export default class RouterBase {
    protected router: Router;

    get route(): Router {
        return this.router;
    }

    constructor() {
        this.router = Router();
    }
}
