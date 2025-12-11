import { useNavigate } from "react-router-dom"

function DemoComponent() {
    const navigate = useNavigate();

    function handleClick(){
        navigate('/login')
    }

    return (
        <div className="w-full min-h-screen bg-gray-200 m-0 p-0">

        <div className="text-center text-3xl ">
            <h1 className="">This is demo component</h1>
            <button onClick={handleClick} 
            className="bg-gray-300 rounded-xl p-2 mt-4 cursor-pointer" 
            >Click here for HOME page</button>
        </div>
        </div>
    )
}

export default DemoComponent
