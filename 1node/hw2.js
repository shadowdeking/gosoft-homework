const az = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ]

let result = "";
for(let i=0; i<az.length; i=i+2) {
    result += az[i+1] + " " + az[i] + " ";
}

console.log(result);
