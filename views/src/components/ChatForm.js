import React, { Component } from "react";
import getCookie from "../common";
import socketIOClient from 'socket.io-client';

import {
        Button,
        Modal,
} from "react-bootstrap";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

class ChatForm extends Component {
        state = {
                chatMessage: "",
                endpoint:'localhost:8072/',
                messages: [],
                sender:getCookie("id"),
                receiver:0,
                d2m: getCookie("userType")==="D"
        }
        constructor(props){
                super(props);
                this.setState({receiver: this.props.receiver})

        }
        componentDidMount = ()=>{
                const socket = socketIOClient(this.state.endpoint);
                socket.on('message', message=>{
                        if (message.name !== getCookie("name")){
                                let arr = this.state.messages;
                                arr.push(message);
                                this.setState({messages: arr});
                        }
                });
                let body;
                if (d2m){
                        body = {
                                did: this.state.sender,
                                mid: this.state.receiver
                        }
                }else{
                        body = {
                                did: this.state.receiver,
                                mid: this.state.sender
                        } 
                }
                
                fetch("/messages/convo", {
                        method: "GET",
                        headers: {
                                "Content-Type": "application/json",
                        },
                        body: JSON.stringify(body),
                })
                        .then((res) => res.json())
                        .then((data) => {
                                //loading(false);
                                if (data.success) {
                                        this.setState({ chatMessages: data.convo });
                                }

                        })
                        .catch();

        }

        send = ()=> {
                let newMessage={
                        type:'send',
                        content:this.state.chatMessage,
                        name:getCookie("name"),

                }
                let arr = this.state.messages;
                arr.push(newMessage);
                this.setState({messages: arr});
                this.setState({chatMessage:''});
                let sendMessage = {...newMessage};
                sendMessage.type = "receive";
                const socket = socketIOClient(this.state.endpoint);
                socket.emit('message', sendMessage);
        }




        handleChange = e =>{
                this.setState({ input: e.target.value });
        }


        renderDetails = () => {
                return (
                        <form onSubmit={this.add}>
                                <label>
                                        Message:
                                        <textarea value={this.state.input} onChange={this.handleChange} />
                                </label>
                                <input type="submit" value="Submit" />
                        </form>
                );
        }
        render(){
                return (
                        <div>
                                <Modal
                                        show={this.props.showModal}
                                        onHide={this.props.onClose}

                                        bsSize="large"
                                >
                                        <Modal.Header closeButton={true}>
                                                <h2>Chat with {this.props.destname}</h2>
                                        </Modal.Header>
                                        <Modal.Body>
                                                {this.renderDetails()}
                                        </Modal.Body>
                                        <Modal.Footer>
                                                <Button onClick={this.props.onClose}>Close</Button>
                                        </Modal.Footer>
                                </Modal>
                        </div>
                ); 
        }
}

export default ChatForm;