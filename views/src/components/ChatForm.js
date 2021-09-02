import React, { Component } from "react";
import { getCookie } from "../common";
import ListGroup from 'react-bootstrap/ListGroup'
import socketIOClient from 'socket.io-client';
import { modals, defaultButtonStyle } from "./Styles"

import {
        Button,
        Modal,
} from "react-bootstrap";
import ChatItem from "./ChatItem";


let convoStyle = {
        "overflow": "scroll",
        "height": "400px"
}


class ChatForm extends Component {
        state = {
                chatMessage: "",
                endpoint: 'localhost:8072/',
                messages: [],
                sender: '',
                receiver: '',
                d2m: getCookie("userType") === "D"
        }
        componentDidMount = () => {

                const socket = socketIOClient(this.state.endpoint);
                socket.on('message', message => {
                        console.log(message);
                        if (message.receiver === getCookie("name")) {
                                let arr = this.state.messages;
                                arr.push(message);
                                this.setState({ messages: arr });
                        }
                });


                let f = () => {
                        fetch("/messages/convo", {
                                method: "POST",
                                headers: {
                                        "Content-Type": "application/json",
                                },
                                body: JSON.stringify(this.state.d2m ?
                                        {
                                                mName: this.state.receiver,
                                                dName: this.state.sender,

                                        } :
                                        {
                                                mName: this.state.sender,
                                                dName: this.state.receiver,
                                        }),
                        })
                                .then((res) => res.json())
                                .then((data) => {
                                        //loading(false);
                                        if (data.success) {
                                                this.setState({ messages: data.messages });
                                        }

                                })
                                .catch();
                }
                this.setState({
                        sender: this.props.sender,
                        receiver: this.props.receiver,
                }, f);

        }

        send = (e) => {
                e.preventDefault();
                let newMessage = {
                        type: 'send',
                        content: this.state.chatMessage,
                        name: getCookie("name"),
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
                                mName: this.state.d2m ? this.state.receiver : this.state.sender,
                                dName: this.state.d2m ? this.state.sender : this.state.receiver,
                                isNew: this.state.messages.length === 0,
                                d2m: this.state.d2m
                        }),
                })
                        .then((res) => res.json())
                        .then((data) => {
                                //loading(false);
                                if (data.success) {
                                        let arr = this.state.messages;
                                        arr.push(data.newMessage);
                                        let socketMessage = { ...data.newMessage };
                                        socketMessage.receiver = this.state.receiver;
                                        this.setState({ messages: arr, chatMessage: '' });
                                        const socket = socketIOClient(this.state.endpoint);
                                        socket.emit('message', socketMessage);
                                }

                        })
                        .catch();


        }




        handleChange = e => {
                this.setState({ chatMessage: e.target.value });
        }

        calculateSender = message => {
                if (message.d2m) {
                        return this.state.d2m ? this.state.sender : this.state.receiver;
                }
                else {
                        return this.state.d2m ? this.state.receiver : this.state.sender;
                }
        }


        renderDetails = () => {
                return (
                        <form>
                                <label>
                                        ההודעה:
                                        <textarea style={{ width: "170%" }} value={this.state.chatMessage} onChange={this.handleChange} />
                                </label>
                                <Button style={{ margin: "20px 20px", position: "absolute", left: "0" }}
                                        className="btn btn-primary" onClick={this.send}>שלח <span className="icon-arrow-right2 outlined"></span></Button>
                        </form>
                );
        }

        renderConvo = () => {
                return (<ListGroup>
                        {this.state.messages.map(m => <ListGroup.Item>
                                <ChatItem item={m} sender={this.calculateSender(m)} isMine={this.calculateSender(m) === this.state.sender} />
                        </ListGroup.Item>)}
                </ListGroup>)
        }
        render() {
                return (
                        <div>
                                <Modal
                                        show={this.props.showModal}
                                        onHide={this.props.onClose}

                                        bsSize="large"
                                >
                                        <Modal.Header closeButton={true} style={{ position: "absolute", left: "0" }} />

                                        <h3 style={{ direction: "rtl", margin: "10px 20px 0 0 " }}>שיחה עם {this.props.receiver}</h3>
                                        <Modal.Body style={modals}>
                                                <div style={convoStyle}>{this.renderConvo()}</div>
                                        </Modal.Body>
                                        <Modal.Body style={modals}>
                                                {this.renderDetails()}
                                        </Modal.Body>
                                </Modal>
                        </div>
                );
        }
}

export default ChatForm;