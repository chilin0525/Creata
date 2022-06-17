import React from "react";
import {Card} from "react-bootstrap"
import  { Navigate } from 'react-router-dom'
import axios from 'axios'

import "./Company.scss"
import CompanyData from "./CompanyData"

export default class Company extends React.Component {
  
  state = {
    click: false
  }

  async componentDidMount(){
    console.log("this is company ")
    const companydata = await axios
      .get("http://localhost:8000/company/getCompanyData")
    this.setState({companydata:companydata.data})
  }
  
  // cuury function to handle parameter
  clickHandler = (company)=>{
    return (e)=>{
      this.setState({click: true}) 
      this.setState({clickcompany: company}) 
    }
  }

  render(){
    console.log(this.state)
    return (
      <div>
      {
        this.state.click?
          <CompanyData company={this.state.clickcompany}/>
        :
          <div className="company-container">
            <div className="company-child-container">
            { (this.state&&this.state.companydata)?
              this.state.companydata.map( (company) => {
                return(
                  <Card bg={"Light".toLowerCase()} text="dark" className="company-card" onClick={this.clickHandler(company)}>
                    <Card.Header>Author: {company.authorName} @ {company.date.split(".")[0]}</Card.Header>
                    <Card.Body>
                      <Card.Title>{company.name}</Card.Title>
                      <Card.Text>
                        {company.about.length>300
                          ?
                            company.about.slice(0,280)+" ...... (click to read more)"
                          :
                            company.about}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                )
              })
            :
              <Card bg={"Light".toLowerCase()} text="dark" className="company-card">
                <Card.Header>Empty Company Data</Card.Header>
                <Card.Body>
                  <Card.Title>Null</Card.Title>
                  <Card.Text>
                    Go to page to add your company data🚀️
                  </Card.Text>
                </Card.Body>
              </Card>
            }
            </div>
          </div>
      }
      </div>
    )
  }
}