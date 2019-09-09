function capitalize(str){
    str = str.split(" ")
    for (let i = 0; i < str.length; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1)            
    }
    return str.join(" ")
}