import Style from './Watch.module.css'
import {KeyboardBackspace} from '@material-ui/icons'


export const Watch = (): JSX.Element => {
    return (
        <div className={Style.container}>
            <div className={Style.back}>
                <KeyboardBackspace fontSize={'inherit'}/>
                Home
            </div>
            <video
                className={Style.video}
                autoPlay
                controls
                src="https://www.w3schools.com/html/mov_bbb.mp4"
            />
            </div>
    )
}