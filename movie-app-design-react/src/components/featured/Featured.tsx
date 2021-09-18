import Style from './Featured.module.css'
import {Info, PlayArrow} from '@material-ui/icons'
import {ContentType} from '../../types/ContentType'

export const Featured = (props?: { type: ContentType | undefined }): JSX.Element => {
    const type: ContentType | undefined = props?.type

    return (
        <div className={Style.container}>
            {
                type && (
                    <div className={Style.category}>
                        <span>{(type as ContentType) === ContentType.MOVIE ? 'Movies' : 'Series'}</span>
                        <select name="genre" id="genre">
                            <option>Genre</option>
                            <option value="adventure">Adventure</option>
                            <option value="comedy">Comedy</option>
                            <option value="crime">Crime</option>
                            <option value="historical">Historical</option>
                            <option value="horror">Horror</option>
                            <option value="romance">Romance</option>
                            <option value="sci-fi">Sci-fi</option>
                            <option value="thriller">Thriller</option>
                            <option value="western">Western</option>
                            <option value="animation">Animation</option>
                            <option value="drama">Drama</option>
                        </select>
                    </div>
                )
            }
            <div className={Style.info}>
                <img
                    src="https://static.wikia.nocookie.net/logopedia/images/8/8a/SpiderManNoWayHome.png"
                    alt="promo"
                />
                <span className={Style.description}>
                    Spider-Man's identity is revealed to everyone, and he can no longer separate his normal life from his superhero life.
                    When he asks Doctor Strange for help, it forces him to discover what it means to be him.
                </span>
                <div className={Style.buttons}>
                    <button className={Style.play}>
                        <PlayArrow fontSize={'inherit'}/>
                        <span>Play</span>
                    </button>
                    <button className={Style.more}>
                        <Info fontSize={'inherit'}/>
                        <span>More info</span>
                    </button>
                </div>
            </div>
        </div>
    )
}