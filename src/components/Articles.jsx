import React, { useEffect, useState } from 'react'
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore'
import {auth, db} from '../firebaseConfig'
import {useAuthState} from "react-firebase-hooks/auth"
import DeleteArticle from './DeleteArticle'
import { Link } from 'react-router-dom'
import LikeArticle from './LikeArticle'
import './styles.css'

function Articles() {
    const [articles, setArticles] = useState([])
    const [user] = useAuthState(auth)

    useEffect(() => {
      const articleRef = collection(db, "Articles");
      const q = query(articleRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        const articles = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArticles(articles);
        console.log(articles);
      });
    }, []);

  return (
    <div style={{marginTop: 70}}>
   


  {

    articles.length === 0 ? (
        <p>No articles found!</p>
    ) : (
        
articles.map(({
  id, 
  title, 
  description, 
  createdAt, 
  imageUrl, 
  createdBy, 
userId,
likes,
comments,
}) => (
  <div key={id} className='border mt-3 p-3 bg-light'>
  <div className="row article__content" >
    <div className="col-3">
      <Link to={`/article/${id}`}>
      <img className='image__info' src={imageUrl} alt="title" style={{height: 180, width: 180, }} />
      </Link>
    </div>
    <div className="col-9 ps-3">
      <div className="row">
        <div className="col-6">
          {
            createdBy && (
              <span className="badge bg-primary">
                {createdBy}
              </span>
            )
          }
        </div>
        <div className="col-6 d-flex flex-row-reverse">
          {
            user && user.uid === userId && (
          <DeleteArticle id={id} imageUrl={imageUrl} />  
            )
          }
        </div>
      </div>
      <div className="article__info">
      <h3 className='title'>{title}</h3>
      <p className='article__date'>{createdAt.toDate().toDateString()}</p>
      <h5 className='article__subtitle'>{description}</h5>
      </div>

      <div className="d-flex flex-row-reverse">
        {user && <LikeArticle id={id} likes={likes}/>}
      </div>
    </div>
  </div>
</div>
))
    )
  }
    </div>
  )
}

export default Articles
