import React, { useState } from 'react'
import { SearchBox } from '../components/SearchBox'
import { User } from '../components/User'

function Search() {
  const[searchResult,setSearchResult]=useState([])
  
  return (
    <div className='p-5'>
        <h3 className='text-3xl font-bold'>Search </h3>
        <div className="mt-5">
            <SearchBox setSearchResult={setSearchResult}/>
        </div>
        <div className="mt-10 flex flex-wrap gap-5">
  {searchResult?.map(user=>
  <User key={user?._id} user={user}/>
    )}
</div>
    </div>
  )
}

export default Search