import React from "react";
import "./Setting.scss"
import { Form, Button } from "react-bootstrap";
import  { Navigate } from 'react-router-dom'
import axios from 'axios'


export default class Setting extends React.Component{
  scrollbarRef = React.createRef()
  
  state = {
    numberOfWebsite: 1,
    numberOfExperience: 1,
    experience: [],
    website: [],
    checkset: false
  }

  delWebsiteHandler = () => {
    const newnumberOfWebsite = this.state.numberOfWebsite-1
    this.setState({numberOfWebsite: newnumberOfWebsite})
  }

  addWebsiteHandler = () => {
    const newnumberOfWebsite = this.state.numberOfWebsite+1
    this.setState({numberOfWebsite: newnumberOfWebsite})
  }

  addExperienceHandler = () => {
    const newnumberOfExperience = this.state.numberOfExperience+1
    this.setState({numberOfExperience: newnumberOfExperience})
  }

  delExperienceHandler = () => {
    const newnumberOfExperience = this.state.numberOfExperience-1
    this.setState({numberOfExperience: newnumberOfExperience})
  }

  submitHandler = async (e)=>{
    e.preventDefault();
    let websiteArr = [];
    let experienceArr = [];
    
    // work around way to store multiple onchange data to Array
    for(let i=0;i<this.state.numberOfWebsite;i++){
      if(e.target["website"+String(i)].value==''){continue;}
      websiteArr.push(e.target["website"+String(i)].value)
    }

    for(let i=0;i<this.state.numberOfExperience;i++){
      if(
        e.target["experience_name"+String(i)].value  =='' ||
        e.target["experience_start"+String(i)].value =='' ||
        e.target["experience_end"+String(i)].value   =='' ||
        e.target["experience_txt"+String(i)].value   ==''
      ){continue;}
      const tmp = {
        "work": e.target["experience_name"+String(i)].value,
        "start": e.target["experience_start"+String(i)].value,
        "end": e.target["experience_end"+String(i)].value,
        "description": e.target["experience_txt"+String(i)].value,
      }
      experienceArr.push(tmp)
    }

    console.log(this.state)
    console.log(websiteArr)
    console.log(experienceArr)
    console.log(e.target.cv.files[0])

    // Attention key here, cause we using the json to write back to DB on backend 
    // so the key must same us model of user
    await axios
      .put("http://localhost:8000/profile/update", {
        userid: this.props.userid,
        name: this.state.username,
        email: this.state.mail,
        phone: this.state.phone,
        website: websiteArr,
        experience: experienceArr,
        cv: e.target.cv.files[0]
      })
      .then((res)=>{
        console.log(res.status)
        if(res.status===200){
          this.setState({checkset: true})
        }
      })
  }

  // curry function to accept input data 
  udpateInput2State = (datatype) => {
    return (e) => {
      this.setState({[datatype]: e.target.value})
      // console.log(this.state)
    }
  }

  componentDidUpdate(){
    if(!this.state.checkset){
      this.scrollbarRef.current.scrollTop = this.scrollbarRef.current.scrollHeight - this.scrollbarRef.current.clientHeight;
    }
  }

  render(){
    console.log(this.state)
    return (
      // If setting user profile and get 200 status code reponse
      // redirect to user success setting page
      this.state.checkset
      ?
        <Navigate to='/settingsuccess' replace/>
      :
      <div className="setting-container">
        <Form className="form-container" onSubmit={this.submitHandler} ref={this.scrollbarRef} encType="multipart/form-data">
          <Form.Group className="mb-3">
            <Form.Label>User name</Form.Label>
            <Form.Control type="text" placeholder="Enter username" onChange={this.udpateInput2State("username")} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>User mail</Form.Label>
            <Form.Control type="email" placeholder="Enter mail address" onChange={this.udpateInput2State("mail")}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>User phone number</Form.Label>
            <Form.Control type="text" placeholder="Add your phone number" onChange={this.udpateInput2State("phone")} />
          </Form.Group>
          
          {/*  
              we using work around way to handle website input value
          */}
          {
            [...Array(this.state.numberOfWebsite)].map((e, i) => 
              <Form.Group className="mb-3">
                <Form.Label>User website</Form.Label>
                <Form.Control type="text" name={"website"+String(i)} placeholder="Add your website"/>
              </Form.Group>
            )
          }
          
          {/*  
              we using work around way to handle experience input value
          */}
          {
            [...Array(this.state.numberOfExperience)].map((e, i) => 
              <Form.Group className="mb-3">
                <Form.Label>Experience</Form.Label>
                <Form.Control type="text" name={"experience_name"+String(i)}  placeholder="Add your experience" />
                <Form.Text className="text-muted">
                  Start from
                </Form.Text>
                <Form.Control name={"experience_start"+String(i)} type="date" />
                <Form.Text className="text-muted">
                  to
                </Form.Text>
                <Form.Control name={"experience_end"+String(i)} type="date"/>
                <Form.Text className="text-muted">
                  Description what you learn in the work
                </Form.Text>
                <Form.Control name={"experience_txt"+String(i)} type="text"/>
              </Form.Group>
            )
          }

          <Form.Group className="mb-3">
            <Form.Label>CV</Form.Label>
            <Form.Control type="file" name="cv" style={{border:"0"}} />
          </Form.Group>

          <div className="button-container">
            <Button variant="primary" className="mt-5 btn-item" onClick={this.addWebsiteHandler}>
              <div className="button-text">Add website</div>
            </Button>

            <Button variant="primary" className="mt-5 btn-item" onClick={this.delWebsiteHandler}>
              <div className="button-text">Del website</div>
            </Button>

            <Button variant="primary" className="mt-5 btn-item" onClick={this.addExperienceHandler}>
              <div className="button-text">Add experience</div>
            </Button>

            <Button variant="primary" className="mt-5 btn-item" onClick={this.delExperienceHandler}>
              <div className="button-text">Del experience</div>
            </Button>

            <Button variant="primary" type="submit" className="mt-5 btn-item">
              <div className="button-text" type="submit">Submit</div>
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}
