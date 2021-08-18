import {Form} from '../form/Form'
import {Note} from '../../types/Note'
import {Notes} from '../notes/Notes'


export const Home = (): JSX.Element => {
    const notes: Array<Note> = [{
        text: 'To do',
        done: false,
        id: 'rghtrugurg'
    }, {
        text: 'To do 2',
        done: true,
        id: 'rgrg48%#&'
    }
    ]

    return (
        <>
            <Form/>
            <Notes notes={notes}/>
        </>
    )
}