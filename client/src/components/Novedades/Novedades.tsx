import React, { useEffect, useState } from "react";
import Nav from "components/Nav/Nav";
import styles from "./Novedades.module.css";
import axios from "axios";

export default function Novedades() {
  
  const [news, setNews] = useState([]);
  
  useEffect(() => {
    async function fetchData(){
      const axiosNews:any = await axios.get("https://newsdata.io/api/1/news?apikey="+process.env.REACT_APP_NEWS_API_KEY+"&category=business&country=ar,ca,us" ,{withCredentials : false}) 
      
      const axiosNews2:any = await axios.get("https://newsdata.io/api/1/news?apikey="+process.env.REACT_APP_NEWS_API_KEY+"&category=business&country=ar,ca,us&page=1" ,{withCredentials : false}) 
      
      const axiosNews3:any = await axios.get("https://newsdata.io/api/1/news?apikey="+process.env.REACT_APP_NEWS_API_KEY+"&category=business&country=ar,ca,us&page=2" ,{withCredentials : false}) 

      setNews(():any=>{
        return [axiosNews.data.results,axiosNews2.data.results,axiosNews3.data.results].flat()
      })
     
    }
    fetchData()
  }, []);
  console.log("News",news)
  return (
    <div style={{ display: "grid", gridTemplateColumns: "178px 1fr" }}>
      <Nav />
      <div className={styles.cointainer_news}>
        <h1 className={styles.nove_h1}>Ultimas noticias</h1>
        <div className={styles.news_wrapper}>
          {
            news.length > 0 ? 
            news.map((e:any,i:number)=>{
                if(!e.image_url){
                  return null
                }else{
                  return (
                    <div key={i} className={styles.newsCard}>
                      <a href={e.link} target="_blank" rel="noreferrer">
                        <img src={e.image_url} alt="" className={styles.img_news}/>
                        <h4>{e.title} </h4>
                        <span> {e.pubDate.split(" ")[0]} </span>
                      </a>
                    </div>
                  )
                }
              }
            )
            : <h2>Loading...</h2>
          }
        </div>
      </div>
    </div>
  );
}
