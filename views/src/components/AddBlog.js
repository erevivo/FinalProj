import React, { Component } from "react";
import getCookie from "../common";
class AddBlog extends Component {
        state = {
                input: ""
        }
        constructor() {
                super();
                //this.handleChange = this.handleChange.bind(this);
                this.add = this.add.bind(this);

        }

        add(e) {
                e.preventDefault();
                fetch("/blogs/create", {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                                writer: getCookie("id"),
                                text: this.state.input,
                        }),
                })
                        .then((res) => res.json())
                        .then((data) => {
                                //loading(false);
                                if (data.success) {
                                        this.setState({ input: "" })
                                }

                        })
                        .catch();
        }




        handleChange = e =>{
                this.setState({ input: e.target.value });
        }


        render() {
                return (
                        <form onSubmit={this.add}>
                                <label>
                                        Blog:
                                        <textarea value={this.state.input} onChange={this.handleChange} />
                                </label>
                                <input type="submit" value="Submit" />
                        </form>
                );
        }
}

export default AddBlog;