import React from 'react';

export default function (props) {

  const handleEnter = props.handleEnter;
  const handleChange = props.handleChange;
  const handleSubmit = props.handleSubmit;
  const errors = props.input.errors;

  return (
    <div className="containerA">
    <form onSubmit={handleEnter} onChange={handleChange}>

        <input name="author" value={props.input.author} className="adminAuth" type="text" placeholder="name*"/>
        { errors.author ?
          <h6 className="error">{ errors.author }</h6>
          : ''
        }

        <input name="personalEmail" value={props.input.personalEmail} className="adminAuth" type="email" placeholder="personal email*"/>
        { errors.personalEmail ?
          <h6 className="error">{ errors.personalEmail }</h6>
          : ''
        }


        <div id="errorCaseContainer">
        <label>title (45 char. max)<span style={{ color: '#ff4d4d' }}>*</span></label>
        { errors.title ?
        <h6 className="error2">{ errors.title }</h6>
        : ''
        }
        </div>
        <textarea name="title" value={props.input.title} className="createTitle" type="text" placeholder="union settlement: meals on wheels" maxLength="45"></textarea>

        <div id="errorCaseContainer">
        <label>time commitment<span>*</span></label>
          { errors.timeCommitment ?
          <h6 className="error2">{ errors.timeCommitment }</h6>
          : ''
          }
        </div>
        <textarea name="timeCommitment" value={props.input.timeCommitment} className="createTitle" type="text" placeholder="saturday, january 7, weekly, tuesdays, ongoing, etc." maxLength="45"></textarea>

        <label>hours <span style={{ fontStyle: 'italic' }}>(default = scheduling tbd)</span></label>
        <div className="adminHours">
          <input name="hoursA" value={props.input.hoursA} type="text" placeholder="9:30am"/>
          <div style={{ margin: '0 .4em 0 .4em' }}>to</div>
          <input name="hoursB" value={props.input.hoursB} type="text" placeholder="1:00pm"/>
        </div>

        <div id="errorCaseContainer">
        <label>brief description (80 char. max)<span style={{ color: '#ff4d4d' }}>*</span></label>
        { errors.briefDescription ?
          <h6 className="error2">{ errors.briefDescription }</h6>
          : ''
        }
        </div>
        <textarea name="briefDescription" value={props.input.briefDescription} className="createBriefDescription" type="text" placeholder="tell us what, but also tell us why your opportunity matters. (i.e. “combat recidivism by teaching inmates beadwork & jewelry making skills”)" maxLength="80"></textarea>

        <div id="errorCaseContainer">
        <label>neighborhood<span style={{ color: '#ff4d4d' }}>*</span></label>
        { errors.neighborhood ?
          <h6 className="error2">{ errors.neighborhood }</h6>
          : ''
        }
        </div>
        <input name="neighborhood" value={props.input.neighborhood} className="adminAuth" type="text" placeholder="east harlem, williamsburg, etc."/>

        <div id="errorCaseContainer">
        <label>borough<span style={{ color: '#ff4d4d' }}>*</span></label>
        { errors.borough ?
          <h6 className="error2">{ errors.borough }</h6>
          : ''
        }
        </div>
        <select name="borough" required>
            <option>----</option>
            <option value="brooklyn">brooklyn</option>
            <option value="manhattan">manhattan</option>
            <option value="queens">queens</option>
            <option value="the bronx">the bronx</option>
            <option value="staten island">staten island</option>
        </select>

        <div id="errorCaseContainer">
        <label>meeting location (60 char. max)<span style={{ color: '#ff4d4d' }}>*</span></label>
        { errors.meetingLocation ?
          <h6 className="error2">{ errors.meetingLocation }</h6>
          : ''
        }
        </div>
        <textarea name="meetingLocation" value={props.input.meetingLocation} className="createLoc" type="text" placeholder="Jefferson Senior Center, 2205, First Avenue (at E. 113th St.)" maxLength="60"></textarea>

    </form>

    </div>
  );

}
