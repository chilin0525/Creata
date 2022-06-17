import React from "react";
import {Table, Button} from "react-bootstrap"
import axios from 'axios'

import "./CompanyData.scss"

export default class CompanyData extends React.Component {
  

  render(){
    console.log(this.props)
    console.log(this.props.company._id)
    return (    
      <div className="companydata-container">
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
                  <button>Chat with </button>
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