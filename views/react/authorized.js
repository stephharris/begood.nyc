import React, { PropTypes } from 'react';
import _ from 'lodash';

export default class Authorized extends React.Component {
  static propTypes = {
    routes: PropTypes.array.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  componentWillMount() {
    const { routes } = this.props;
    const { router } = this.context;


  const user = JSON.parse(localStorage.getItem('user'));
    if(!user) {
      router.push('/admin-panel');
    }

  const routeRoles = _.chain(routes)
    .filter(item => item.authorize)
    .map(item => item.authorize)
    .flattenDeep();
    .value();

    if(_.intersection(routeRoles, user.roles).length === 0) {
      router.push('/')
    }
  }
}
