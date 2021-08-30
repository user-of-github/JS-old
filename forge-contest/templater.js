module.exports = function Templater() {
    if (!(this instanceof Templater)) {
        return new Templater()
    }

    this.code = ''

    this.div = function (...args) {
        this.createTemplateForTag('div', args)
        return this
    }

    this.p = function (...args) {
        this.createTemplateForTag('p', args)
        return this
    }

    this.br = function (...args) {
        this.createTemplateForTag('br', args)
        return this
    }

    this.span = function (...args) {
        this.createTemplateForTag('span', args)
        return this
    }

    this.toString = function () {
        return this.code
    }

    this.createTemplateForTag = function (tag, parametersArray) {
        let stringToAdd = `<${tag}`
        const isThereAttributesParameter = this.checkIfHasAttributes(parametersArray)
        const attributesKeys = isThereAttributesParameter ? this.getKeys(parametersArray[parametersArray.length - 1]) : []
        if (attributesKeys.length !== 0)
            stringToAdd += ' '
        stringToAdd += isThereAttributesParameter ? this.createAttributesString(parametersArray[parametersArray.length - 1], attributesKeys) : ''


        stringToAdd += `>${this.getInnerPart((isThereAttributesParameter ? parametersArray.slice(0, -1) : parametersArray), tag)}${tag !== 'br' ? `</${tag}>` : ''}`
        this.code += stringToAdd
    }

    this.createAttributesString = function (attributes = {}, keys = []) {
        let response = ''
        keys.forEach((key, counter, array) => {
            response += `${key}="${attributes[key]}"`
            response += counter !== array.length - 1 ? ' ' : ''
        })
        return response
    }

    this.getKeys = function (object) {
        const response = []
        for (const key in object)
            response.push(key)
        response.sort()
        return response
    }

    this.getInnerPart = function (innerArray = [], tag = '') {
        if (tag === 'br' && innerArray.length > 0) {
            throw new Error('Nested content is not allowed')
        }
        return innerArray.reduce((result, current) => result + current.toString(), '')
    }

    this.checkIfHasAttributes = function (parametersArray) {
        return parametersArray.length > 0
            &&
            typeof parametersArray[parametersArray.length - 1] === 'object'
            &&
            !(parametersArray[parametersArray.length - 1].hasOwnProperty('checkIfHasAttributes'))
    }


    return this
}


