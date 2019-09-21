export default class Format{
    formatPrix(prix: String){
        prix = this.unformatPrix(prix)
        var arrayPrix = []
        var lenghtMod = prix.length % 3
        var lenghtDiv = Math.floor(prix.length / 3)
        arrayPrix.push(prix.substring(0,lenghtMod))
        var reste = prix.substring(lenghtMod)
        for(let i = 0; i <= lenghtDiv; i++){
            arrayPrix.push(reste.substring(i * 3, i * 3 + 3))
        }
        arrayPrix = (arrayPrix.filter(prix => prix !== ""))
        var result = ""
        for (let i = 0; i < arrayPrix.length; i++) {
            result += arrayPrix[i] + " "
        }
        return result.substring(0, result.length - 1);
    }
    unformatPrix(prixString){
        while (prixString.indexOf(' ') !== -1) {
            prixString = prixString.replace(' ', '')
        }
        return prixString
    }
    formatTel(telString){
        var arrayTel = []
        telString = this.unformatTel(telString)
        var len = telString.length
        switch(true){
            case len >= 10:
                arrayTel.push(telString.substring(0,3))
                arrayTel.push(telString.substring(3,5))
                arrayTel.push(telString.substring(5,8))
                arrayTel.push(telString.substring(8,10))
                arrayTel.push(telString.substring(10))
                break
            case len > 8:
                arrayTel.push(telString.substring(0,3))
                arrayTel.push(telString.substring(3,5))
                arrayTel.push(telString.substring(5,8))
                arrayTel.push(telString.substring(8))
                break
            case len > 5:
                arrayTel.push(telString.substring(0,3))
                arrayTel.push(telString.substring(3,5))
                arrayTel.push(telString.substring(5))
                break
            case len > 3:
                arrayTel.push(telString.substring(0,3))
                arrayTel.push(telString.substring(3))
                break
            case len <= 3:
                arrayTel.push(telString)
                break
            default:
                break
        }
        var res = ''
        arrayTel = arrayTel.filter(tel => tel !== "")
        for (let i = 0; i < arrayTel.length; i++) {
            res += arrayTel[i] + " "
        }
        return res.substring(0,res.length - 1)
        // return arrayTel
    }
    unformatTel(telString){
        while (telString.indexOf(' ') !== -1) {
            telString = telString.replace(' ', '')
        }
        return telString
    }
    printDate(dateString){
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' }
        return new Date(dateString).toLocaleDateString('FR-fr',options)
    }
    unformatDate(dateString){
        var array = dateString.split('/')
        var res = ''
        array.forEach((value, index) => {
            res = value + '-' +  res
        })
        return res.substring(0,res.length - 1)
    }
    formatDate(dateString){
        return new Date(dateString).toLocaleDateString('fr')
    }
}
