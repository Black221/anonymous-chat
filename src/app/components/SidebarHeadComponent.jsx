import {FaListUl} from "react-icons/fa";


export const SidebarHeadComponent = () => {

    return (
        <div className="space-y-2">

            <div className="flex items-center justify-between text-gray-700">

                <span className="font-semibold text-2xl">Participants</span>

                <div>

                    <FaListUl size={20} />
                </div>
            </div>

            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center  pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
                         stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
                <div className="relative">
                    <input type="text" id="search"
                           className="block rounded-t-lg pl-8 px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-transparent focus:bg-transparent  border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" "/>

                    <label htmlFor="search"
                           className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-8   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                        Tape something...
                    </label>
                </div>
            </div>
        </div>
    )
}