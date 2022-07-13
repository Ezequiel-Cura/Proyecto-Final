import React, { useEffect, useState } from "react";
import Nav from "components/Nav/Nav";
import styles from "./Novedades.module.css";
import axios from "axios";
import { Https } from "@mui/icons-material";





export default function Novedades() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    async function fetchData(){
      const axiosNews = await axios.get("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey="+ "e81732e486d0400ab9e1547fe1ec8ee5" ,{withCredentials : false})
      setNews(axiosNews.data.articles)
      console.log(axiosNews.data.articles)
    }
    fetchData()
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "178px 1fr" }}>
      <Nav />
      <div className={styles.cointainer_news}>
        <h1 className={styles.nove_h1}>Ultimas noticias</h1>
        <div className={styles.news_wrapper}>
          {
            news.length > 0 ? 
            news.map((e:any,i:number)=>{
                if(!e.urlToImage){
                  return null
                }else{
                  return (
                    <div key={i} className={styles.newsCard}>
                      <a href={e.url} target="_blank" rel="noreferrer">
                        <img src={e.urlToImage} alt="" className={styles.img_news}/>
                        <h4>{e.title} </h4>
                        <span> {e.publishedAt.split("T")[0]} </span>
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
