'use strict';

export default const AdminLayout = (props) => (
  <div>
    <header>
      <div id="lockup">
        <Link to="/admin-panel/loggedin">
        <h1>BEGOOD</h1>
          <h1 className="NYC"><span className="dot">.</span>NYC</h1>
          <h3 className="byline">curated local volunteer opportunities</h3>
        </Link>
      </div>
    </header>
    {React.cloneElement(this.props.children, {sessionToken: this.props.sessionToken})}
  </div>
);


