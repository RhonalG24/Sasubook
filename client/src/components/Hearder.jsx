import { Link } from "react-router-dom";
import update_form_btn from '../App'

// export default function Header({
//     heading,
//     paragraph,
//     // linkName,
//     // linkUrl='#'
// }){
export default function Header(props){
    return (
        <div className="mb-10">
            <div className="flex justify-center">
                {/* <img alt="" className="h-14 w-14" src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"/> */}
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-400">
                { props.heading }
            </h2>
            <p className="text-center text-sm text-slate-400 mt-5">
                { props.paragraph} {' '}
                {/* {/* <Link to={linkUrl()} className="font-medium text-slate-400 hover:text-slate-100">
                    {linkName}
                </Link> */}
                <button id="form_btn" onClick={props.update_form_btn}>{props.textButton}</button>
            </p>
 
        </div>
    )
}