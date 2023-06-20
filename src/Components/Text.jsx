import React from "react";
import { useState, useEffect } from "react";
import { copy, loader, tick, linkIcon } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Text = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([])

  const [getSummary, {error, isFetching}] = useLazyGetSummaryQuery()

  useEffect(()=> {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'))

    if(Array.isArray(articlesFromLocalStorage)) {
      setAllArticles(articlesFromLocalStorage)
    }
  }, [])

  const handelSubmit = async (e) => {
    e.preventDefault()
    const {data} = await getSummary({articleUrl: article.url})

    if(data?.summary) {
      const newArticle = {
        ...article,
        summary: data.summary
      }

      const updatedAllArticles = [newArticle, ...allArticles]

      setArticle(newArticle)
      setAllArticles(updatedAllArticles)
      localStorage.setItem('articles', JSON.stringify(updatedAllArticles))
    }
  }

  
  const handelChange = (e) => {
    setArticle({...article, url:e.target.value })
  }
  

  return (
    <section className="w-full mt-16 max-w-xl">
      <div className=" w-full flex flex-col gap-2">
        <form className="flex items-center justify-center relative" onSubmit={handelSubmit}>
          <img
            src={linkIcon}
            alt=""
            className="absolute left-0 my-2 ml-3 w-5"
          />

          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={handelChange}
            required
            className="url_input peer"
          />

          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ↵
          </button>
        </form>
        {/*History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index)=> (
            <div key={`link-${index}`} onClick={() => setArticle(item)} className="link_card">
              <div className="copy_btn">
                <img className="w-[40%] h-[40%] object-contain" src={copy} alt="copy_icon" />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">{item.url}</p>
            </div>
          ))}
        </div>
      </div>
      {/*Results*/}
      <div className="my-10 max-w-full flex justify-center items-center">
            {isFetching ? (
              <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
            ) : error ? (
              <p className="font-inter font-bold text-black text-center">
                Oops... Something went wrong!
                <br />
                <span className="font-satoshi font-normal text-gray-700">
                  {error?.data?.error}
                </span>
              </p>
            ) : (
              article.summary && (
                <div className="flex flex-col gap-3">
                    <h2 className="font-satoshi font-bold text-gray-600">
                      Article <span className="blue_gradient">Summary</span>
                    </h2>
                    <div className="summary_box">
                      <p className="font-inter font-medium text-sm text-gray-700">{article.summary}</p>
                    </div>
                </div>
              )
            )}
      </div>
    </section>
  );
};

export default Text;
