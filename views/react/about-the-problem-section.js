import React from "react";


export default class AboutTheProblemSection extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      maxHeight: 0,
      h1Class: 'section-default',
      rotate: 90,
      opacity: 1,
      display: 'none'
    }
  }

  onShow(){
    if(this.state.maxHeight === 0){
      this.setState({ maxHeight: 350, h1Class: 'section-expanded', rotate: 0, opacity: 0, display: 'block'})
    }else{
      this.setState({ maxHeight: 0, h1Class: 'section-default', rotate: 90, opacity: 1, display: 'none' })
    }
  }

  render(){
    return (
      <div onClick={this.onShow.bind(this)} id="about-container">

        <div>
         <h1 className={this.state.h1Class}>The Problem</h1>
          <div className="svgContainer">
            <svg style={{ transform: 'rotate(' + this.state.rotate + 'deg)', opacity: this.state.opacity }} viewBox="0 0 560.3 560.3">
            <polygon points="344.4,215.8 344.4,0 215.8,0 215.8,215.8 0,215.8 0,344.4 215.8,344.4 215.8,560.3 344.4,560.3 344.4,344.4 560.3,344.4 560.3,215.8 "/>
            </svg>

            <svg style={{ display: this.state.display }} viewBox="0 0 17.9 4.1">
              <rect x="0" width="17.9" height="4.1"/>
            </svg>
          </div>
        </div>

         <div className="aboutSection" style={{ maxHeight: this.state.maxHeight }}>
           <h3>
              Young America (statistically) just isn’t volunteering. In recent months, we’ve witnessed a resurgence in activism and renewed interest in politics/civic engagement, but finding ways to make a difference, outside of donations and protests, is still a challenge.
           </h3>
         </div>

      </div>
    )
  }

}
