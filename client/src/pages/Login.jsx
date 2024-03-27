import Header from "../components/Hearder"
import Login from "../components/Login"

export default function LoginPage(){
    return (
        <>
            <Header
                heading="Ingresa a tu cuenta"
                paragraph="¿Aún no tienes una cuenta?"
                linkName="Registrarse"
                linkUrl="/register"    
            />
            <Login/>
        </>
    )
}