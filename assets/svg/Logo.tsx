import * as React from "react"
import {SvgProps, SvgXml} from "react-native-svg"

const xml = `
<svg viewBox="0 0 518 371.4" id="svg3" xmlns="http://www.w3.org/2000/svg">
    <defs id="defs1">
        <style id="style1">
            .cls-1{fill:#484747}
        </style>
    </defs>
    <g id="Layer_2">
        <g id="Layer_2-2">
            <g id="Layer_1-2">
                <path class="cls-1" id="polygon1" style="fill:#484748;fill-opacity:1" d="M239.27 169.66 114.28 353.49H0l124.53-183.83L238.56 1.33l.9-1.33v169.66h-.19z"/>
                <path class="cls-1" id="polygon2" style="fill:#484748;fill-opacity:1" d="M518 353.49H403.73L278.74 169.66h-.19V.01l.89 1.32 114.03 168.33L518 353.49z"/>
                <path id="polygon3" style="fill:#f28b28;fill-opacity:1" d="M259 185.66 132.72 371.4h252.57L259 185.66z"/>
            </g>
        </g>
    </g>
</svg>
`

const Logo = (props: SvgProps) => (
    <SvgXml xml={xml} {...props}></SvgXml>
)
export default Logo
