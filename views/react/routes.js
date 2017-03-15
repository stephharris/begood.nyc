import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Home from './home';
import About from './about';
import Contact from './contact';
import Submit from './submit';
import Success from './success';


const Routes = () => (
  <div>
    <IndexRoute component={Home} />
    <Route path='/submit' component={Submit} />
    <Route path='submit/success' component={Success} />
    <Route path='/about' component={About} />
    <Route path='/contact' component={Contact} />
    <Route path='/(:opportunity)' component={Home}/>
  </div>
)

export default Routes;
