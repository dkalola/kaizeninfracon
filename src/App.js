import "./index.css";

import React from "react";

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CommingSoon from "./components/commingsoon";
import Home from "./components/home";
import About from "./components/about";
import News from "./components/news";
import Career from "./components/career";
import Projects from "./components/projects";
import Admin from "./components/admin";
import NewsView from "./components/views/newsview";
import ArticleView from "./components/views/articleview";
import ProjectView from "./components/views/projectview";
import AdminProjEdit from "./components/admin/projedit";
import Timeline from "./components/timeline";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

function App() {
  const [news, setNews] = useState([]);
  const [projects, setprojects] = useState([]);
  const [article, setarticle] = useState([]);
  const [videos, setvideos] = useState([]);
  const [clients, setclients] = useState([]);
  const dataCollectionRef1 = collection(db, "news");
  const dataCollectionRef2 = collection(db, "projects");
  const dataCollectionRef3 = collection(db, "article");
  const dataCollectionRef4 = collection(db, "video");
  const dataCollectionRef5 = collection(db, "clients");

  // read data from firebase
  useEffect(() => {
    // Update the document title using the browser API
    const getData = async () => {
      const New = await getDocs(dataCollectionRef1);
      const proj = await getDocs(dataCollectionRef2);
      const arti = await getDocs(dataCollectionRef3);
      const video = await getDocs(dataCollectionRef4);
      const client = await getDocs(dataCollectionRef5);
      setNews(New.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setprojects(proj.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setarticle(arti.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setvideos(video.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setclients(client.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CommingSoon></CommingSoon>} />
          <Route path="/timeline" element={<Timeline></Timeline>} />
          <Route path="/home" element={<Home></Home>} />
          <Route path="/about" element={<About></About>} />
          <Route
            path="/news"
            element={<News new={news} arti={article} videos={videos}></News>}
          />
          <Route path="/proj" element={<Projects proj={projects}></Projects>} />
          <Route path="/career" element={<Career></Career>} />
          <Route
            path="/admin"
            element={
              <Admin
                new={news}
                arti={article}
                videos={videos}
                proj={projects}
                cli={clients}
              ></Admin>
            }
          />
          {news.map((obj) => {
            return (
              <Route
                path={`/news/${obj.id}`}
                element={<NewsView news={obj}></NewsView>}
              />
            );
          })}
          {article.map((obj) => {
            return (
              <Route
                path={`/news/${obj.id}`}
                element={<ArticleView article={obj}></ArticleView>}
              />
            );
          })}
          {projects.map((obj) => {
            return (
              <Route
                path={`/projects/${obj.id}`}
                element={<ProjectView project={obj}></ProjectView>}
              />
            );
          })}
          {projects.map((obj) => {
            return (
              <Route
                path={`/projectedit/${obj.id}`}
                element={<AdminProjEdit project={obj}></AdminProjEdit>}
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
