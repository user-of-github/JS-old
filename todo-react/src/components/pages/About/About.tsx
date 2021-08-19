import Style from './About.module.css'

export const About = (): JSX.Element => (
    <div className={Style.container}>
        <div className={Style.promo}>
            <h3 className={Style.title}>My Note App (To&nbsp;Do&nbsp;List)</h3>
        </div>

        <div className={Style.promo}>
            <h3 className={Style.title}>Tech info</h3>
            <p className={Style.text}>
                <strong>App Version</strong>: &nbsp; 1.0 <br/>
                <strong>Dates</strong>: &nbsp; August 17, 2021 → August 19, 2021<br/>
                <strong>Technologies</strong>: &nbsp; React, MobX, TypeScript <br/>
                <strong>Font</strong>: &nbsp; Play &nbsp;<small>(Designed by Jonas Hecksher)</small>
            </p>
        </div>
    </div>
)