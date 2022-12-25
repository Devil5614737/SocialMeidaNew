import React, { useEffect, useState } from 'react'
import { fetchNewsHeadlines } from '../api/request'
import { NewsArticle } from './NewsArticle'

export const News = () => {
  const[articles,setArticles]=useState([])
const fetchNews=async()=>{
  const {data}=await fetchNewsHeadlines();
  setArticles(data.articles.slice(0,5))
}

useEffect(()=>{
fetchNews()
},[])

  return (
    <div className=' hidden lg:block'>
      <p className='text-2xl font-semibold'>What's going on!!</p>
      <div className="mt-12">
        {articles?.map(article=>
        <NewsArticle key={article.title} article={article}/>
          )}
      </div>
    </div>
  )
}
