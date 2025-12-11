// import the required modules
import { useAuthChecker } from "../hooks/useAuthQuery";

function AuthGate() {
    useAuthChecker();

    return null;
}

export default AuthGate;
