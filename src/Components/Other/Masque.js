export default class Masque{
    capitalizeWords(str: String) {
        var array = str.split(' ');
        var result = '';
        array.forEach(mot => {
            result += mot.substring(0,1).toUpperCase() + mot.substring(1).toLowerCase() + ' ';
        });
        return result.substring(0, result.length - 1);
      }
      capitalize(str: String) {
        return str.substring(0,1).toUpperCase() + str.slice(1);
      }
}
