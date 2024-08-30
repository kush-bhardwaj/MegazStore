import FrontPage from "../FrontPage";
import Header from "../Header/Header";

export default function Main({children}){
    return (
        <>
            <Header />
            {children}
        </>
    )
}