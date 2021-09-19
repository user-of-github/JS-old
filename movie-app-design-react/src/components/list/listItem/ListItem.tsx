import Style from './ListItem.module.css'
import {PlayCircleOutline, ThumbDown, ThumbUp} from '@material-ui/icons'
import React from 'react'


export const ListItem = (props: { index: number }): JSX.Element => {
    const [isHovered, setIsHovered] = React.useState(false)
    const videoSrc: string = 'https://r1---sn-4g5ednse.googlevideo.com/videoplayback?expire=1632065005&ei=jQFHYfTXIpDM0wXczbD4Aw&ip=51.15.187.61&id=o-AIkbd3YJDu43Gz4yw6Tymi7OI5cOy86uIQXvtCM3ANrS&itag=278&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&vprv=1&mime=video%2Fwebm&ns=AzUS-GLCNKDbVpcjNc2n2EsG&gir=yes&clen=1454410&dur=144.143&lmt=1630171789452347&keepalive=yes&fexp=24001373,24007246&c=WEB&txp=5535434&n=YZO6k8eguS71yT&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRAIgRd4uv4ERWi5NqL9Bt6wOIAcoZ1A5RPV4IZnp9cOFBX0CICqo6ZCGtpi_NnO515wKT7SgOT1Sh37i-uSbm4OBK3mK&rm=sn-25gde7e&req_id=e349f3cf59cea3ee&ipbypass=yes&redirect_counter=2&cm2rm=sn-5ua5ouuxaxj-hn9e7e&cms_redirect=yes&mh=Nz&mip=46.53.249.62&mm=29&mn=sn-4g5ednse&ms=rdu&mt=1632043267&mv=m&mvi=1&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRAIgODr4sBrxLwaJXO2A-guJn3YuUvoeutpauyDyK1D1xpICICG_Ukz-cgyCEBl_oxNml7ALyf_aMYJDCN9AwWdpJxaY'

    // @ts-ignore
    return (
        <div className={Style.listItem}
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}
             style={
                 {// @ts-ignore
                     left: isHovered && props.index * 225 - 50 + props.index * 2.5
                 }
             }>
            <img src="https://images.immediate.co.uk/production/volatile/sites/3/2020/03/infinity-war-122ce1b.jpg"
                 alt="logo poster"/>

            {
                isHovered &&
                <>
                    <video className={Style.previewTrailer} src={videoSrc} autoPlay={true} loop={true}/>
                    <div className={Style.itemInfoContainer}>
                        <div className={Style.icons}>
                            <PlayCircleOutline className={Style.icon} fontSize={'inherit'}/>
                            <ThumbUp className={Style.icon} fontSize={'inherit'}/>
                            <ThumbDown className={Style.icon} fontSize={'inherit'}/>
                        </div>
                        <div className={Style.itemInfo}>
                            <span>1 hour 14 mins</span>
                            <span className={Style.limit}>16+</span>
                            <span>1999</span>
                        </div>
                        <div className={Style.description}>
                            Spider-Man's identity is revealed to everyone, and he can no longer separate his normal life
                            from
                            his superhero life.
                            When he asks Doctor Strange for help, it forces him to discover what it means to be him.
                        </div>
                        <div className={Style.genre}>Action</div>
                    </div>
                </>

            }
        </div>
    )
}