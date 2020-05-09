import { BrowserRouter } from 'react-router-dom';
import Main from './routes.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render((
  <BrowserRouter>
    <Main /> {/* The various pages will be displayed by the `Main` component. */}
  </BrowserRouter>
  ), document.getElementById('reactEntry')
);
