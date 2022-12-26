const addFriendClass=()=>{
    return (
        "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg  px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 text-2xl w-fit absolute bottom-5 right-5"
    )
}


const addFriendClass2=()=>{
    return (
        "inline-flex items-center px-4 py-2 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    )
}

const viewProfileBtnClass=()=>{
return(
    "inline-flex items-center px-4 py-2 text-lg font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
)
}


const listClassName = (href,currentPath,darkMode) => {
    return `w-fit md:w-full flex items-center space-x-5 mb-4 hover:bg-gray-200 p-3 py-6 rounded-lg cursor-pointer transition-opacity ease-in-out delay-100 
           font-medium  text-sm px-5  text-center mr-2 ${
             currentPath === href &&
             "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
           } ${currentPath === href && "text-white"} `;
  };

  const editProfileBtn=()=>{
    return (
        "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg  px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 text-2xl w-fit absolute bottom-5 right-5"
    )
  }

  const inputClass=()=>{
    return (
        "text-xl bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    )
  }


export {addFriendClass,addFriendClass2,viewProfileBtnClass,listClassName,editProfileBtn,inputClass}