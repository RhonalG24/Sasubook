import Header from "../components/Hearder"
import Register from "../components/Register"

export default function RegisterPage(){
    return (
        <>
            <Header
              heading="Regístrate para crear una cuenta"
              paragraph="¿Ya tienes una cuenta? "
              linkName="Ingresar"
              linkUrl="/"
            />
            <Register/>
        </>
    )
}