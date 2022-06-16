import React from "react";
import {Card} from "react-bootstrap"
import "./ProfileExperience.scss"
export default class ProfileExperience extends React.Component {
  
  render(){
    console.log(this.props.experience)
    return (  
      <div className="experience-container">
      {
        this.props.experience&&this.props.experience.length>=1&&this.props.experience[0]!=''
        ?
          this.props.experience.map((experience)=>{
            return (
              <Card bg={"Light".toLowerCase()} text="dark" className="experience-card">
                <Card.Header>{`${experience.start} ~ ${experience.end}`}</Card.Header>
                <Card.Body>
                  <Card.Title>{experience.work}</Card.Title>
                  <Card.Text>
                    {experience.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            )
          })
        :
          <Card bg={"Light".toLowerCase()} text="dark" className="experience-card">
            <Card.Header>Empty experience</Card.Header>
            <Card.Body>
              <Card.Title>Null</Card.Title>
              <Card.Text>
                Go to setting page to add your experience🚀️!
              </Card.Text>
            </Card.Body>
          </Card>
      }
      </div>
    )
  }
}