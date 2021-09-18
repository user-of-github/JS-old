import Style from './Home.module.css'
import {Navbar} from '../../components/navbar/Navbar'
import {Featured} from '../../components/featured/Featured'
import {ContentType} from '../../types/ContentType'
import {List} from '../../components/list/List'


export const Home = (): JSX.Element => (
    <section className={Style.container}>
        <Navbar/>
        <Featured type={ContentType.MOVIE}/>
        <List/>
        <List/>
        <List/>
        <List/>
        <List/>
        <List/>
    </section>
)