import Icon from "svelte-icon/Icon.svelte";
// import SqwSqwShtr from "../../public/assets/razrez/SqwSqwShtr.svg"
// import SqwShtr from "../../public/assets/razrez/SquareShtr.svg"
// import IShtr from "../../public/assets/razrez/IShtr2.svg.svg"
import CircleShtr from "../assets/razrez/CircShtr.svg"
import CircCircShtr from "../assets/razrez/CircCircShtr.svg"

interface IProfileInput{
    placeHolder: string;

}

interface IProfile {
    id: string;
    img: typeof Icon | string;
    alt: string;
    inputs: IProfileInput[];
}

interface IFixation {
    id: string;
    img: typeof Icon;
    alt: string;
    offsetX: number;
    offsetY: number;
    reverse: number;
}
//: IProfile[]
export const profC = {
    // "square1":{
    //     img: SqwShtr,
    //     inputs: ['Width'],
    //     alt: "Square",
    //     id:"square1"
    // },
    // "square2":{
    //     img: SqwSqwShtr,
    //     inputs: ['Outer width', 'Inner width'],
    //     alt:"",
    //     id:"square2"
    // },
    // "i":{
    //     img: IShtr,
    //     inputs: ['Height', 'Width', 'Line width'],
    //     alt:"",
    //     id:"i"
    // },
    "circle1":{
        img: CircleShtr,
        inputs: [{placeholder: 'Radius'}],
        alt:"Circle",
        id:"circle1"
    },
    "circle2":{
        img: CircCircShtr,
        inputs: [{placeholder: 'Outer radius'}, {placeholder: 'Inner Radius'}],
        alt:"Circle 2",
        id:"circle2"
    },
}

export const profileConst=[
    // {src: '/assets/razrez/SquareShtr.svg', inputs: ['Width']},
    // {src: '/assets/razrez/SqwSqwShtr.svg', inputs: ['Outer width', 'Inner width']},
    // {src: '/assets/razrez/IShtr2.svg', inputs: ['Height', 'Width', 'Line width']},
    {src: '/assets/razrez/CircShtr.svg', inputs: ['Radius']},
    {src: '/assets/razrez/CircCircShtr.svg', inputs: ['Outer radius', 'Inner Radius']},
]

export const fixationConst = [
    {src: 'none'},
    {src: 'assets/other/svg (14).svg'},
    {src: 'assets/other/svg (10).svg'},
    {src: 'assets/other/svg (9).svg'}
]