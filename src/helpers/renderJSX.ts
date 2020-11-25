import { response } from 'express';
import { h } from 'preact';
import render from 'preact-render-to-string';

declare module 'express-serve-static-core' {
  interface Response {
    sendJSX: (element: h.JSX.Element) => void;
  }
}

response.sendJSX = function (element: h.JSX.Element) {
  this.send(render(element));
};
