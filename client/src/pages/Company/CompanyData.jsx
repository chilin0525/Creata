import React from "react";
import {Table, Button} from "react-bootstrap"
import  { Navigate } from 'react-router-dom'
import axios from 'axios'

import "./CompanyData.scss"

export default class CompanyData extends React.Component {
  
  state = {
    sendMessage: false
  }

  clickHandler = (e)=>{
    console.log("clook")
    console.log(`sender: ${this.props.userid} receiver ${this.props.company.authorID}`)
    const message = `Hi ${this.props.company.authorName}!`
    axios
        .post("http://localhost:8000/message/sendmessage", { 
            message: message ,
            sender_ID: this.props.userid,
            receiver_ID: this.props.company.authorID
          }
        )
        .then((res)=>{
          console.log("send done")
          this.props.updateMessageAfterSend(res.data)
          this.setState({sendMessage:true})
        })
  }

  render(){
    console.log("company data")
    console.log(this.props)
    return (    
      <div className="companydata-container">
        {
          this.state.sendMessage
          ?
            <Navigate to='/message' replace/>
          :
            <div></div>
        }
        <div className="companydata-child-container">
        {
          <Table striped bordered hover className="companydata-table">
            <tbody>
              {/* <tr>
                <th>authorID</th>
                <td>{this.props.company.authorID}</td>
              </tr> */}

              <tr>
                <td>Author</td>
                <td className="user-container">
                  <img src={this.props.company.authorUrl} className="user-img"></img>
                  {this.props.company.authorName}
                  <button onClick={this.clickHandler}>Chat</button>
                </td>
              </tr>

              {/* <tr>
                <td>authorUrl</td>
                <td>{this.props.company.authorUrl}</td>
              </tr> */}

              <tr>
                <td>date</td>
                <td>{this.props.company.date}</td>
              </tr>

              <tr>
                <td>name</td>
                <td>{this.props.company.name}</td>
              </tr>

              <tr>
                <td>email</td>
                <td>{this.props.company.email}</td>
              </tr>

              <tr>
                <td>phone</td>
                <td>{this.props.company.phone}</td>
              </tr>

              <tr>
                <td>address</td>
                <td>{this.props.company.address}</td>
              </tr>

              <tr>
                <td>website</td>
                <td>{this.props.company.website}</td>
              </tr>

              <tr>
                <td>about</td>
                <td>{this.props.company.about}</td>
              </tr>

              <tr>
                <td>service</td>
                <td>{this.props.company.service}</td>
              </tr>

              <tr>
                <td>benefits</td>
                <td>{this.props.company.benefits}</td>
              </tr>

              <tr>
                <td>compensation</td>
                <td>{this.props.company.compensation}</td>
              </tr>

              <tr>
                <td>legal</td>
                <td>{this.props.company.legal}</td>
              </tr>
            </tbody>
          </Table>
        }
        </div>
      </div>
    )
  }
}