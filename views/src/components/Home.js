import React, { Component } from "react";
import { CoolText } from 'react-cool-text';
import 'react-cool-text/react-cool-text/output/theme.css';
import logo from "../images/logo01.png";
import background from "../images/bg-main.jpg";

let textStyle = {

        backgroundColor: "#ef6131",
        textAlign: "center",
        padding: "10px",
        direction: "rtl",
        opacity: "0.8",
        margin: "10px",
        width: "30%",
        right: "00px",
        lineHeight: "1.8",
        position: "fixed",
        top: "150px",
        fontSize: "18px",
        fontFamily: "Heebo', sans - serif",
        fontWeight: "400",
        color: "#000000"
}
let bg = {
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        overflowY: "hidden",
        opacity: "1",
        width: "100%",
        height: "calc(610px)"
}

class Home extends Component {
        render() {
                return <div>
                        <div><img src={background}
                                style={bg}></img></div>
                        <div>
                                <p style={textStyle}>
                                        ברוכים הבאים <b>לקלנועית</b> - ארגון ההפצה הגדול בישראל לאוכלוסיה המבוגרת.
                                        <br /><br />
                                        <b>הקלנועית</b> חרטה על דגלה לשרת את האוכלוסייה המבוגרת בישראל
                                        בחלוקת מזון תרופות ומצרכים נחוצים תוך מתן שירות אדיב ויעיל לכל
                                        אדם מבוגר ללא הבדלי גזע דת ומין.
                                        <br />
                                        <b>הקלנועית</b> הוקמה בשנת 2021 ע"י היזמים אביתר רביבו ואבי קניגסברג
                                        אשר נתקלו בקשיי סיפוק המצרכים לקשישים בתקופת הקורונה.
                                        <br />
                                        בימים אלו <b>הקלנועית</b> משרתת אלפי קשישים במדינת ישראל
                                        והינה חלק בלתי נפרד מתעשיית המשלוחים.
                                        <br />
                                        בין לקוחותינו, ראשי הממשלות לשעבר, בכירי המוסד ועוד..
                                        <br />
                                        <b>נשמח לעמוד לרשותכם בכל עת</b>.
                                        <br />
                                        אביתר רביבו
                                        אבי קניסברג
                                </p>
                        </div>
                </div>
        }
}
export default Home;