import React from 'react';
import { CirclePicker } from 'react-color';
// import { ColorPalette } from '../../../themes/colorPalette';
// import { setColor } from '../../../themes/colorFunctions';

// const tagcolors = setColor("tag", Object.keys(ColorPalette))
// const avatarcolors = setColor("avatar", Object.keys(ColorPalette))
const defaultcolors = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"]
export default function Status(props) {
    // const { tagcolor, avatarcolor } = props
    return (
        <CirclePicker {...props} colors={defaultcolors} />
    )
}
