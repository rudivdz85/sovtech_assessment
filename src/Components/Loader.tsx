import {TailSpin} from "react-loader-spinner";
import React from "react";

const Loader = () => {
    return (<div style={{display: 'flex', justifyContent: 'center'}} > < TailSpin color={'blue'} ariaLabel="loading-indicator" />
    </div>)
}

export default Loader;