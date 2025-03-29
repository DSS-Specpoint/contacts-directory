import React, { CSSProperties } from "react";
import "./Card.css";

const Card = (props:{children:React.ReactNode, className?:string, style?:CSSProperties}) => {
    return(
        <div className={`card ${props.className ?? ""}`} style={props.style}>
            {props.children}
        </div>
    );
}

export default Card;