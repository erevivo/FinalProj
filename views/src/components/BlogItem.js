import React, { Component } from "react";
import Card from 'react-bootstrap/Card'
class BlogItem extends Component {
        constructor(props) {
                super(props);
        }

        render() {
                return (

                        <Card style={{ direction: " rtl" }}>
                                < Card.Header > נכתב ע"י: {this.props.item.writerName}</Card.Header>
                                < Card.Body >
                                        <blockquote className="blockquote mb-0">
                                                <p>
                                                        {this.props.item.text}
                                                </p>
                                                <footer className="blockquote-footer">
                                                        {this.props.item.time}
                                                </footer>
                                        </blockquote>
                                </Card.Body >
                        </Card >
                );

        }
}

export default BlogItem;