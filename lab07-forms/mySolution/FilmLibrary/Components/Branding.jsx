import { useState } from "react";

import { CollectionPlayFill } from "react-bootstrap-icons"

/**
 * @param {{fontSize: string}} props 
 */
export default function Branding(props) {
    return (
        <span>
            <CollectionPlayFill fontSize={props.fontSize} ></CollectionPlayFill>
            <span style={{ 'fontSize': props.fontSize }} >Film Library</span>
        </span>
    )
}