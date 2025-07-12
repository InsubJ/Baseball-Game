export default function numGen(digits: number): string {
    let num = 0;
    let digit = 1;
    for (let i=0; i < digits; i++) {
        if (i!=0) {
            digit*=10;
        }
        num += digit*Math.floor(Math.random()*9);
    }
    if (num < 10) {
        return '0' + '0' + num.toString();
    }
    else if(num < 100) {
        return '0' + num.toString();
    }
    return num.toString();
}