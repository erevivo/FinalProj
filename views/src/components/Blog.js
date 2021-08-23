import React, { Component } from "react";
import ListGroup from 'react-bootstrap/ListGroup'
import BlogItem from "./BlogItem";
import AddBlog from "./AddBlog";
import MyModal from "./MyModal";
class Blog extends Component {
        state = {
                blogs :[]
        }
        //TODO: make better
        componentDidMount() {
                fetch("/blogs", {
                        method: "GET",
                        headers: {
                                "Content-Type": "application/json",
                        },
                })
                        .then((res) => res.json())
                        .then((data) => {
                                //loading(false);
                                if (data.success) {
                                        this.setState({ blogs: data.blogs })
                                }

                        })
                        .catch(() => { console.log("error") });
        }

        render() {
                return (<div>
                <ListGroup>
                        {this.state.blogs.map(b=><ListGroup.Item><BlogItem item={b}/></ListGroup.Item>)}
                       </ListGroup>
                       {this.props.isAuth && 
                       <MyModal str="Add Blog"
                                content={(show, close) =>
                                (<AddBlog
                                        showModal={show}
                                        onClose={close}
                                />)}
                        />}
                       </div>
                       
                )
                

        }
}

export default Blog;