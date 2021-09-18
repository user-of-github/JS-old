import Style from './List.module.css'
import {ArrowBack, ArrowForward} from '@material-ui/icons'
import {ListItem} from './listItem/ListItem'
import {SliderDirection} from '../../types/SliderDirection'
import React from 'react'


export const List = (): JSX.Element => {
    const listItemWidth: number = 225 + 10 // width + margin-right
    const [slideNumber, setSlideNumber] = React.useState(0)
    const [isMoved, setIsMoved] = React.useState(false)
    const listReference: React.MutableRefObject<HTMLDivElement | null> = React.useRef<HTMLDivElement | null>(null)
    const handleClickArrow = (direction: SliderDirection): void => {
        setIsMoved(true)
        let distance: number = listReference!.current!.getBoundingClientRect().x - 50

        if (direction === SliderDirection.RIGHT && slideNumber < 5) {
            listReference!.current!.style.transform = `translateX(${distance - listItemWidth}px)`
            setSlideNumber(slideNumber + 1)
        } else if (direction === SliderDirection.LEFT && slideNumber > 0) {
            listReference!.current!.style.transform = `translateX(${distance + listItemWidth}px)`
            setSlideNumber(slideNumber - 1)
        }
    }

    return (
        <div className={Style.container}>
            <span className={Style.listTitle}>
                Continue to watch
            </span>
            <div className={Style.sliderWrapper}>
                <ArrowBack style={{color: '#FFF', display: ((!isMoved || slideNumber === 0) ? 'none' : 'flex')}}
                           className={`${Style.sliderArrow} ${Style.left}`}
                           onClick={() => handleClickArrow(SliderDirection.LEFT)}
                />
                <div className={Style.sliderContainer}
                     ref={listReference}>
                    <ListItem/>
                    <ListItem/>
                    <ListItem/>
                    <ListItem/>
                    <ListItem/>
                    <ListItem/>
                    <ListItem/>
                    <ListItem/>
                    <ListItem/>
                    <ListItem/>
                </div>
                <ArrowForward style={{color: '#FFF'}}
                              className={`${Style.sliderArrow} ${Style.right}`}
                              onClick={() => handleClickArrow(SliderDirection.RIGHT)}/>
            </div>
        </div>
    )
}