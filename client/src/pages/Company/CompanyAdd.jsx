import React from "react";
import "./CompanyAdd.scss"
import {Form, Button} from "react-bootstrap"
import  { Navigate } from 'react-router-dom'
import axios from 'axios'

export default class CompanyAdd extends React.Component {
  
  state = {
    checkset:false
  }

  submitHandler = async(e)=>{
    e.preventDefault();
    console.log("submit")
    console.log(this.props.userid)

    await axios
      .post("http://localhost:8000/company/add", {
        authorID: this.props.userid,
        authorName: this.props.name,
        authorUrl: this.props.img,
        name: this.state.name,
        email: this.state.mail,
        phone: this.state.phone,
        address: this.state.address,
        website: this.state.website,
        about: this.state.about,
        service: this.state.service,
        benefits: this.state.benefits,
        compensation: this.state.compensation
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
    }
  }

  render(){
    // console.log(this.state)
    // console.log(this.props)

    return (
        this.state.checkset
        ?
          <Navigate to='/settingsuccess' replace/>
        :
        <div className="company-container">
          <Form className="form-container" onSubmit={this.submitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Company name</Form.Label>
              <Form.Control type="text" placeholder="Enter Company name" onChange={this.udpateInput2State("name")} />
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label>Company mail</Form.Label>
              <Form.Control type="email" placeholder="Enter Company mail" onChange={this.udpateInput2State("email")}/>
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label>Company phone number</Form.Label>
              <Form.Control type="text" placeholder="Add Company phone number" onChange={this.udpateInput2State("phone")} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Company address</Form.Label>
              <Form.Control type="text" placeholder="Add Company address" onChange={this.udpateInput2State("address")} />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Company website</Form.Label>
              <Form.Control type="text" placeholder="Add Company website" onChange={this.udpateInput2State("website")} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>About</Form.Label>
              <Form.Control as="textarea" rows={10} placeholder="Describe your company" onChange={this.udpateInput2State("about")} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Service</Form.Label>
              <Form.Control as="textarea" rows={10} placeholder="Describe service supplied by your company" onChange={this.udpateInput2State("service")}  />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Benefits</Form.Label>
              <Form.Control as="textarea" rows={5} placeholder="Describe Benefits of your company" onChange={this.udpateInput2State("benefits")}  />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Compensation</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={this.udpateInput2State("compensation")} />
            </Form.Group>

            <div className="button-container">
              <Button variant="success" type="submit" className="mt-5 btn-item">
                <div className="button-text" type="submit">Submit</div>
              </Button>
            </div>
          </Form>
        </div>
    )
  }
}