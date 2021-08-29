import React, { Component } from "react";
import { CoolText } from 'react-cool-text';
import 'react-cool-text/react-cool-text/output/theme.css';
import logo from "../images/logo.png";

let textStyle = {
        border: "5px outset #000000",
        backgroundColor: "#ff6600",
        textAlign: "center",
        padding: "10px",
        margin: "10px",
        borderRadius: "10px",
        fontFamily: "Bradley Hand, cursive",
        color: "#000000"
}
class Home extends Component {
        render() {
                return <div style={{ display: "flex", alignItems: "center" }}>
                        <div><img src={logo} style={{ height: "350px" }}></img></div>
                        <div>

                                <div style={textStyle}>
                                        <CoolText
                                                randomRotateRange={{ min: -15, max: 15 }}
                                                letterStackItemCount={5}
                                                letterStackItemOpacity={i => (i === 0 ? 1 : 0.3 - i * 0.01)}
                                                letterStackItemTranslate={i => ({ x: i * 4, y: i * 4 })}

                                        >
                                                ZAGURI DISTRIBUTIONS
                                        </CoolText>
                                        <p>
                                                Welcome to <i>ZAGURI DISTRIBUTIONS</i>, your number one source for distributions neccesities during COVID. We're dedicated to giving you the very best service, with a focus on freshness, availability, and customer service.
                                        </p>
                                        <p>
                                                Founded in 2021 by the current co-CEOs Avi Koenigsberg and Evyatar Revivo,&nbsp;
                                                <i>ZAGURI DISTRIBUTIONS</i> has come a long way from its beginnings in a toolshed. When Avi and Evyatar first started out, their passion for brightening peoples' days with delivering drove them to quit their day jobs, and gave them the
                                                impetus to turn hard work and inspiration into a booming online service.
                                        </p>
                                        <p>
                                                We now serve customers all over Israel, and are thrilled to be a part of the fair trade wing of the delivery industry. We hope you enjoy our service as much as we enjoy offering it to you. If you have any questions or comments, please don't hesitate
                                                to contact us.
                                        </p>
                                        <p>
                                                Sincerely, <br /> Avi, co-CEO <br /> Evyatar, co-CEO
                                        </p>
                                </div>
                        </div>
                </div>
        }
}
export default Home;