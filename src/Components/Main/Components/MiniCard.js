import React, { Component } from 'react'
import { Card, CardBody, CardTitle, CardText } from 'shards-react'

export default class MiniCard extends Component {
    render() {
        return (
            <Card className={"shadow text-white bg-" + this.props.theme}>
            <CardBody className="rounded">
              <CardTitle className="text-white">
                    {this.props.title}
              </CardTitle>
              <hr style={{borderColor: 'white'}}/>
              <CardText>
                  {this.props.contenu}
              </CardText>
            </CardBody>
          </Card>
        )
    }
}
