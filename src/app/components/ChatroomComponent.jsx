


export const ChatroomComponent = ({name, color}) => {

    return (
        <div  className="text-gray-800 flex items-center bg-gray-200 w-full h-12 m-2 rounded p-1">
            <div className="w-10 h-10 mx-4 bg-gray-100 rounded-full">

            </div>
            <div className="flex flex-col justify-around ">
                <div className={`"font-semibold `} style={{color: color}}>{name}</div>
            </div>
        </div>
    )
}