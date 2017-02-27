'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Tags from './tags';

export default class EditingMode extends React.Component {

  constructor(props) {
    super(props);
  }

   render() {
    let errors = this.props.errors;
    let listing = this.props.listing;
    let expires = this.props.listing.expires.slice(0,10)

    return (
      <div className="editing">
        <div className="editGroupA">
          <form onChange={this.props.handleChange}>

            <h6 className={ errors.title ? 'errortext' : '' }>TITLE</h6>
            <input name="title" defaultValue={listing.title} className={"editAuth " + ( errors.title ? 'editAuthError' : '')} type="text" style={{marginBottom: '1.5em'}} />

            <h6 className={ errors.timeCommitment ? 'errortext' : '' }>TIME COMMITMENT</h6>
            <input name="timeCommitment" defaultValue={listing.timeCommitment} className={"editAuth " + ( errors.timeCommitment ? 'editAuthError' : '')} type="text" />

            <h6 className={ errors.hours ? 'errortext' : '' }>HOURS</h6>
            <input name="hours" defaultValue={listing.hours} className={"editAuth " + ( errors.hours ? 'editAuthError' : '')} type="text" style={{marginBottom: '1.5em'}} />

            <h6 className={ errors.meetingLocation ? 'errortext' : '' }>MEETING LOCATION</h6>
            <textarea name="meetingLocation" defaultValue={listing.meetingLocation} className={"editLoc " + (errors.meetingLocation ? 'editAuthError' : '')} type="text" maxLength="60"></textarea>

            <h6 className={ errors.neighborhood ? 'errortext' : '' }>NEIGHBORHOOD</h6>
            <input name="neighborhood" defaultValue={listing.neighborhood} className={"editAuth " + ( errors.neighborhood ? 'editAuthError' : '')}  type="text"/>

            <select name="borough" defaultValue={listing.borough} required>
              <option value="brooklyn">brooklyn</option>
              <option value="manhattan">manhattan</option>
              <option value="queens">queens</option>
              <option value="the bronx">the bronx</option>
              <option value="staten island">staten island</option>
            </select>

            <h6 className={ errors.moreInfoUrl ? 'errortext' : '' }>MORE INFO URL</h6>
            <input name="moreInfoUrl" className={"editAuth " + ( errors.moreInfoUrl ? 'editAuthError' : '')} defaultValue={listing.moreInfoUrl} type="text" />

            <h6 className={ errors.contactEmail ? 'errortext' : '' }>CONTACT EMAIL</h6>
            <input name="contactEmail" className="editAuth" className={"editAuth " + ( errors.contactEmail ? 'editAuthError' : '')} defaultValue={listing.contactEmail} type="email" />
          </form>
        </div>

        <div className="editGroupB">
          <form onChange={this.props.handleChange}>

            <h6 className={ errors.briefDescription ? 'errortext' : '' }>BRIEF DESCRIPTION</h6>
            <textarea name="briefDescription" defaultValue={listing.briefDescription} className={"editBriefDescription " + (errors.briefDescription ? 'editAuthError' : '')} type="text" maxLength="80"></textarea>

            <h6 className={ errors.tags ? 'errortext' : '' }>tags (check all that apply)</h6>
            <Tags tags={this.props.listingTags}/>
          </form>
        </div>

        <div className="editGroupC">
          <form onChange={this.props.handleChange}>

            <h6 className={ errors.fullDescription ? 'errortext' : '' }>FULL DESCRIPTION</h6>
            <textarea name="fullDescription" defaultValue={listing.fullDescription} className={"editLongDescription " + (errors.fullDescription ? 'editAuthError' : '')} type="text" maxLength="330"></textarea>

            <h6 className={ errors.requirements ? 'errortext' : '' }>REQUIREMENTS</h6>
            <textarea name="requirements" defaultValue={listing.requirements} style={{ marginBottom: '1.5em' }} className={"editBriefDescription " + (errors.requirements ? 'editAuthError' : '')} type="text" maxLength="130"></textarea>

            <h6 className={ errors.author ? 'errortext' : '' }>AUTHOR</h6>
            <input name="author" defaultValue={listing.author} className={"editAuth " + ( errors.author ? 'editAuthError' : '')} type="text" />

            <h6 className={ errors.personalEmail ? 'errortext' : '' }>PERSONAL EMAIL</h6>
            <input name="personalEmail" defaultValue={listing.personalEmail} className={"editAuth " + ( errors.personalEmail ? 'editAuthError' : '')} type="email" />

            <h6 className={ errors.expires ? 'errortext' : '' }>EXPIRES</h6>
            <input name="expires" defaultValue={expires} className={"editAuth " + ( errors.expires ? 'editAuthError' : '')} type="text" placeholder='YYYY-MM-DD (expiration date)'/>

          </form>
        </div>
      </div>
    )
  }

}

