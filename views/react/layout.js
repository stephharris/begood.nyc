'use strict';


export default const Layout = (props) => (
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
     {React.cloneElement(this.props.children, {sessionToken: this.state.sessionToken})}
  </div>
);


