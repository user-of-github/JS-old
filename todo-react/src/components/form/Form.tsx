import Style from './Form.module.css'


export const Form = (): JSX.Element => {

    return (
        <form className={Style.form}>
            <input className={Style.input}
                   type="text"
                   placeholder="Enter note text"/>
        </form>
    )
}