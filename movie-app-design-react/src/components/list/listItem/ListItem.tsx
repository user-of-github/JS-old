import Style from './ListItem.module.css'


export const ListItem = (): JSX.Element => {
    return (
        <div className={Style.listItem}>
            <img src="https://images.immediate.co.uk/production/volatile/sites/3/2020/03/infinity-war-122ce1b.jpg"
                 alt="logo poster"/>

            <div className={Style.itemInfo}>

            </div>
        </div>
    )
}