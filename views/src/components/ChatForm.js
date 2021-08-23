import React, { Component } from "react";
import getCookie from "../common";
import ListGroup from 'react-bootstrap/ListGroup'


import {
        Button,
        Modal,
} from "react-bootstrap";
import ChatItem from "./ChatItem";

class ChatForm extends Component {
        state = {
                chatMessage: "",
                endpoint:'localhost:8072/',
                messages: [],
                sender: parseInt(getCookie("id")),
                receiver:0,
                did:0,
                mid:0,
                d2m: getCookie("userType")==="D"
        }
        componentDidMount = ()=>{
                
                
                let f = ()=>{fetch("/messages/convo", {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                                did: this.state.did,
                                mid: this.state.mid
                        }),
                })
                        .then((res) => res.json())
                        .then((data) => {
                                //loading(false);
                                if (data.success) {
                                        this.setState({ messages: data.convo });
                                }

                        })
                        .catch();}
                if (this.props.d2m){
                        this.setState({
                                did: this.state.sender,
                                mid: this.props.receiver,
                                receiver: this.props.receiver
                        }, f);
                }else{
                        this.setState({
                                did: this.props.receiver,
                                mid: this.state.sender,
                                receiver: this.props.receiver
                        }, f);
                }
                
                

        }

        send = (e)=> {
                e.preventDefault();
                let newMessage={
                        type:'send',
                        content:this.state.chatMessage,
                        name:getCookie("name"),
                }
                
                // let sendMessage = {...newMessage};
                // sendMessage.type = "receive";
                fetch("/messages/create", {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                              text: this.state.chatMessage,
                              mid: this.state.mid,
                              did: this.state.did,
                              isNew: this.state.messages.length==1
                        }),
                })
                        .then((res) => res.json())
                        .then((data) => {
                                //loading(false);
                                if (data.success) {
                                        let arr = this.state.messages;
                                        arr.push(data.newMessage);
                                        this.setState({ messages: arr , chatMessage:''});
                                }

                        })
                        .catch();
        }




        handleChange = e =>{
                this.setState({ chatMessage: e.target.value });
        }


        renderDetails = () => {
                return (
                        <form onSubmit={this.send}>
                                <label>
                                        Message:
                                        <textarea value={this.state.chatMessage} onChange={this.handleChange} />
                                </label>
                                <input type="submit" value="Submit" />
                        </form>
                );
        }

        renderConvo = ()=>{
                return (<ListGroup>
                        {this.state.messages.map(m=><ListGroup.Item><ChatItem item={m}/></ListGroup.Item>)}
                       </ListGroup>)
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
                                                {this.renderConvo()}
                                        </Modal.Body>
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