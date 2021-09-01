import React, { Component } from "react";
import ListGroup from 'react-bootstrap/ListGroup'
import BlogItem from "./BlogItem";
import AddBlog from "./AddBlog";
import MyModal from "./MyModal";
class Blog extends Component {
        state = {
                blogs: []
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

        addBlog = (blog) => {
                let newList = this.state.blogs;
                newList.push(blog);
                this.setState({ blogs: newList });
        }

        render() {
                return (<div>
                        <ListGroup>
                                {this.state.blogs.map(b => <ListGroup.Item><BlogItem item={b} /></ListGroup.Item>)}
                        </ListGroup>
                        {this.props.isAuth &&
                                <MyModal str="כתוב משהו.."
                                        content={(show, close) =>
                                        (<AddBlog
                                                showModal={show}
                                                onClose={close}
                                                addFn={this.addBlog}
                                        />)}
                                />}
                </div>

                )


        }
}

export default Blog;