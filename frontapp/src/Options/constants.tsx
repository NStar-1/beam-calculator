import Icon from "svelte-icon/Icon.svelte";
import sqw from "../../public/assets/razrez/SqwSqwFull.svg"

interface IProfileInput{
    placeHolder: string;

}

interface IProfile {
    id: string;
    img: typeof Icon;
    alt: string;
    inputs: IProfileInput[];
}

interface IFixation {
    id: string;
    img: typeof Icon;
    alt: string;
    offsetX: number;
    offsetY: number;
}
//
// export const profC: IProfile[] = [
//     {img: <Icon/>, inputs: ['Width']},
//     {src: '/assets/razrez/SqwSqwShtr.svg', inputs: ['Outer width', 'Inner width']},
//     {src: '/assets/razrez/IShtr2.svg', inputs: ['Height', 'Width', 'Line width']},
//     {src: '/assets/razrez/CircShtr.svg', inputs: ['Radius']},
//     {src: '/assets/razrez/CircCircShtr.svg', inputs: ['Outer radius', 'Inner Radius']},
// ]

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