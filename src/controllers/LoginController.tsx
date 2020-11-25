import { h } from 'preact';
import { Request, Response } from 'express';
import { controller, get, post, bodyValidator } from './decorators';

type LoginForm = {
  email: string;
  password: string;
};

@controller('/auth')
class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.sendJSX(
      <div>
        <form method="POST">
          <div>
            <label>Email</label>
            <input name="email" />
          </div>
          <div>
            <label>Password</label>
            <input name="password" type="password" />
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request<{}, {}, LoginForm>, res: Response): void {
    const { email, password } = req.body;
    if (email && password) {
      req.session = { loggedIn: true };
      res.redirect('/');
    } else {
      res.send('You must provide email and password!');
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response): void {
    req.session = null;
    res.redirect('/');
  }
}

export { LoginController };
