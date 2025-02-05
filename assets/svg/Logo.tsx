import * as React from "react"
import Svg, {SvgProps, Defs, G, Path, SvgXml} from "react-native-svg"

const Logo = (props: SvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        id="svg3"
        viewBox="0 0 518 371.4"
        {...props}
    >
        <Defs id="defs1"></Defs>
        <G id="Layer_2" data-name="Layer 2">
            <G id="Layer_2-2" data-name="Layer 2">
                <G id="Layer_1-2" data-name="Layer 1">
                    <Path
                        id="polygon1"
                        d="M239.27 169.66 114.28 353.49H0l124.53-183.83L238.56 1.33l.9-1.33v169.66h-.19z"
                        className="cls-1"
                        style={{
                            fill: "#484748",
                            fillOpacity: 1,
                        }}
                    />
                    <Path
                        id="polygon2"
                        d="M518 353.49H403.73L278.74 169.66h-.19V.01l.89 1.32 114.03 168.33L518 353.49z"
                        className="cls-1"
                        style={{
                            fill: "#484748",
                            fillOpacity: 1,
                        }}
                    />
                    <Path
                        id="polygon3"
                        d="M259 185.66 132.72 371.4h252.57L259 185.66z"
                        style={{
                            fill: "#f28b28",
                            fillOpacity: 1,
                        }}
                    />
                </G>
            </G>
        </G>
    </Svg>
)
export default Logo
