const Templater = require('./templater')

describe('Templater', () => {
    test('create instance', () => {
        expect(typeof Templater).toBe('function')
        expect(() => {
            Templater()
        }).not.toThrow()
    })
    test('has proper methods', () => {
        const template = Templater()
        expect(typeof template.div).toBe('function')
        expect(typeof template.br).toBe('function')
    })
    test('renders html', () => {
        expect(Templater().span().toString()).toBe('<span></span>')
        expect(Templater().br().toString()).toBe('<br>')
    })
    test('supports nesting, chaining', () => {
        expect(
            Templater().span('Hello').span('World').toString()
        ).toBe('<span>Hello</span><span>World</span>')
        expect(
            Templater().p(
                Templater().span('nested'),
                Templater().span('span')
            ).toString()
        ).toBe('<p><span>nested</span><span>span</span></p>')
        expect(() => {
            Templater().br('some content')
        }).toThrow()
    })
    test('tags has attributes', () => {
        expect(
            Templater().div('Yeah!', {id: "header", class: "awesome"}).toString()
        ).toBe('<div class="awesome" id="header">Yeah!</div>')
    })

    test('Complex Tests. Pack 1', () => {
        expect(Templater().span(
            Templater().span('text1', 'text2', {
                style: 'background: #FFF;',
                class: 'innerSpan1',
                id: 'innerSpan1'
            }), 'textOuternal', {bgcolor: 'black', id: "header", class: "awesome"}).br({class: 'brClass'}).toString()
        ).toBe('<span bgcolor="black" class="awesome" id="header"><span class="innerSpan1" id="innerSpan1" style="background: #FFF;">text1text2</span>textOuternal</span><br class="brClass">')

        expect(Templater().div().span().br().p().div(Templater().span('Title')).toString()).toBe('<div></div><span></span><br><p></p><div><span>Title</span></div>')

        expect(Templater().div(Templater().div(), Templater().div(Templater().span())).toString()).toBe('<div><div></div><div><span></span></div></div>')

        expect(Templater().div(Templater().div(), Templater().div(Templater().span('some text', ' some more text', Templater().span(), {id: 'id'}))).toString()).toBe('<div><div></div><div><span id="id">some text some more text<span></span></span></div></div>')

        expect(() => Templater().br(Templater()).toString()).toThrow()

        expect(Templater().p(Templater(), Templater(), Templater()).toString()).toBe('<p></p>')
    })
})