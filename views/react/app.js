'use strict';

// import React from 'react'
// import { Router, Link, Match } from 'react-router';
import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router'
import Home from './home';
import About from './about';
import Contact from './contact';
import Admin from './admin/admin.js';
//
// // Using React-Router v4 to direct routes and render main components
// // Le DOCS: https://react-router.now.sh/sidebar
//
// const routes = [
//   { pattern: '/',
//     exactly: true,
//     main: () => <Home/>
//   },
//   { pattern: '/about',
//     main: () => <About/>
//   },
//   { pattern: '/contact',
//     main: () => <Contact/>
//   },
//   {
//     pattern: '/admin-panel',
//     main: () => <Admin/>
//   }
// ]
//
// const App = ({ history }) => (
//   <Router history={history}>
//   <div>
//
//   <header>
//         <div id="lockup"><Link to="/">
//           <h1>BEGOOD</h1>
//           <h1 className="NYC"><span className="dot">.</span>NYC</h1>
//           <h3 className="byline">curated local volunteer opportunities</h3>
//         </Link>
//         </div>
//         <div id="nav">
//           <Link to="/about">about</Link>
//           <Link to="/contact">contact</Link>
//         </div>
//   </header>
//
//   <div>
//         {routes.map((route, index) => (
//           <Match
//             key={index}
//             pattern={route.pattern}
//             component={route.main}
//             exactly={route.exactly}
//           />
//         ))}
//   </div>
//
//   </div>
//   </Router>
// )
//
// export default App;

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
          <Route path='/(:opportunity)' component={Layout}>
            <IndexRoute component={Home} />
            <Route path='/about' component={About} />
            <Route path='/contact' component={Contact} />
          </Route>
      </Router>
    )
  }
}

const Layout = props => (
  <div>
    <header>
      <div id="lockup"><Link to="/">
        <h1>BEGOOD</h1>
        <h1 className="NYC"><span className="dot">.</span>NYC</h1>
        <h3 className="byline">curated local volunteer opportunities</h3>
      </Link>
      </div>
      <div id="nav">
        <Link to="/about">about</Link>
        <Link to="/contact">contact</Link>
      </div>
    </header>
    {props.children}
  </div>
);

export default App
