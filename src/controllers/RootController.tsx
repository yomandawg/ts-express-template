import { h } from 'preact';
import { Request, Response } from 'express';
import { controller, get, use } from './decorators';
import { requireAuth } from '../middlewares';

@controller()
class RootController {
  @get('/')
  getRoot(req: Request, res: Response): void {
    if (req.session && req.session.loggedIn) {
      res.sendJSX(
        <div>
          <div>You are logged in</div>
          <a href="/auth/logout">Logout</a>
        </div>
      );
    } else {
      res.sendJSX(
        <div>
          <a href="/auth/login">Login</a>
        </div>
      );
    }
  }

  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response): void {
    res.send('Welcome to protected!');
  }
}

export { RootController };
