import { hexToCSSFilter } from 'hex-to-css-filter';
const Tint = (hex) => {
    const cssFilter = hexToCSSFilter(hex).filter;
    return cssFilter.split(';')[0]
}

export default Tint;