const makeRandom = (len) => {
    let string = '';
    for(let i = 0; i < len; i++) {
        const n = Math.floor(Math.random() * 10);
        string += n;
    }
    console.log(String(string));
    return String(string);
}

export default makeRandom;