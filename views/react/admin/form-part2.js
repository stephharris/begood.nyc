import React from 'react';

export default function (props) {

  const handleEnter = props.handleEnter;
  const handleChange = props.handleChange;
  const handleSubmit = props.handleSubmit;

  return (
    <div className="containerB">
    <form onSubmit={handleEnter} onChange={handleChange}>

      <label>tags (check all that apply)<span style={{ color: '#ff4d4d' }}>*</span></label>

        <div className="adminTags">
          <div className="adminTagsGroup">
            <label className="control">health-care
              <input type="checkbox" value="health-care"/>
              <div className="controlIndicator"></div>
            </label>

            <label className="control">education
              <input type="checkbox" value="education"/>
              <div className="controlIndicator"></div>
            </label>

            <label className="control">tech
              <input type="checkbox" value="tech"/>
              <div className="controlIndicator"></div>
            </label>

            <label className="control">human rights
              <input type="checkbox" value="human rights"/>
              <div className="controlIndicator"></div>
            </label>

            <label className="control">environment
              <input type="checkbox" value="environment"/>
              <div className="controlIndicator"></div>
            </label>

            <label className="control">youth
              <input type="checkbox" value="youth"/>
              <div className="controlIndicator"></div>
            </label>

            <label className="control">LGBTQ
              <input type="checkbox" value="LGBTQ"/>
              <div className="controlIndicator"></div>
            </label>

            <label className="control">policy/gov
              <input type="checkbox" value="policy/gov"/>
              <div className="controlIndicator"></div>
            </label>
          </div>

          <div className="adminTagsGroup">

            <label className="control">racial justice
              <input type="checkbox" value="racial justice"/>
              <div className="controlIndicator"></div>
            </label>

            <label className="control">meetups/events
              <input type="checkbox" value="meetups/events"/>
              <div className="controlIndicator"></div>
            </label>

            <label className="control">social justice
              <input type="checkbox" value="social justice"/>
              <div className="controlIndicator"></div>
            </label>

            <label className="control">animal rights
              <input type="checkbox" value="animal rights"/>
              <div className="controlIndicator"></div>
            </label>

            <label className="control">senior services
              <input type="checkbox" value="senior services"/>
              <div className="controlIndicator"></div>
            </label>

            <label className="control">immigration
              <input type="checkbox" value="immigration"/>
              <div className="controlIndicator"></div>
            </label>

            <label className="control">disability
              <input type="checkbox" value="disability"/>
              <div className="controlIndicator"></div>
            </label>

            <label className="control">housing
              <input type="checkbox" value="housing"/>
              <div className="controlIndicator"></div>
            </label>
          </div>
        </div>

      <label>full description (330 char. max)<span style={{ color: '#ff4d4d' }}>*</span></label>
      <textarea name="fullDescription" value={props.input.fullDescription} className="createLongDescription" type="text" placeholder="this is your listing’s elevator pitch. be sure to emphasize its impact on the community in addition to including a description of the volunteer-work itself." maxLength="330"></textarea>

      <label>requirements (130 char. max)<span style={{ color: '#ff4d4d' }}>*</span></label>
      <textarea name="requirements" value={props.input.requirements} className="createBriefDescription" type="text" placeholder="voluteers will be sent a short training video and brief quiz to help prepare them for participation" maxLength="130"></textarea>

      <label>url (for more info.)<span style={{ color: '#ff4d4d' }}>*</span></label>
      <input name="moreInfoUrl" value={props.input.moreInfoUrl} className="adminAuth" type="text" placeholder="paste link"/>

      <label>contact email (public)<span style={{ color: '#ff4d4d' }}>*</span></label>
      <input name="contactEmail" value={props.input.contactEmail} className="adminAuth" type="email" placeholder="email of organizer"/>

      <label>listing expiration date<span style={{ color: '#ff4d4d' }}>*</span></label>
      <div className="adminExpiration">
        <input name="mm" value={props.input.mm} type="text" placeholder="mm" maxLength="2"/>
        <input name="dd" value={props.input.dd} type="text" placeholder="dd" maxLength="2"/>
        <input name="yyyy" value={props.input.yyyy} type="text" placeholder="yyyy" maxLength="4"/>
      </div>

    </form>

    </div>
  );

}
