import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import React from "react";

interface Gender {
    gender: string
}

const DisplayGender = (gender: Gender) => {
    if (gender.gender === 'male') {
        return <MaleIcon></MaleIcon>
    }
    if (gender.gender === 'female') {
        return <FemaleIcon></FemaleIcon>
    } else {
        return <DoDisturbIcon></DoDisturbIcon>
    }
}

export default DisplayGender;