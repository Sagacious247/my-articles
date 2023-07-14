import { doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { auth, db } from '../firebaseConfig'
import LikeArticle from './LikeArticle'
// import {useAuthState} from "react-firebase-hooks/auth"
import Comment from './Comment'
import { UserAuth } from './auth/AuthContext'


function Article() {
    const {id} = useParams()
    const [article, setArticle] = useState(null)
    const {user} = UserAuth()
    // const [user] = useAuthState(auth)

    useEffect(() => {
        const docRef = doc(db, 'Articles', id)
        onSnapshot(docRef, (snapshot) => {
         setArticle({...snapshot.data(), id: snapshot.id})
        })
    }, [])
  return (
    <div className='container boder bg-light'
    style={{marginTop: 70}}>
      {
        article && (
            <div className="row">
                <div className="col-3">
                    <img 
                    src={article.imageUrl}
                     alt={article.title} 
                     style={{width: "100%", padding: 10}}/>
                </div>
                <div className="col-9 mt-3">
                    <h2>{article.title}</h2>
                    <h5>Author: {article.createdBy}</h5>
                    <div>Posted on: {article.createdAt.toDate().toDateString()}</div>
                    <hr />
                    <h4>{article.description}</h4>

                    <div className="flex flex-row-reverse">
                        {user && <LikeArticle id={id} likes={article.likes}/>}

                        <div className="pe-2">
                            <p>{article.likes.length}</p>
                        </div>
                    </div>

                    {/* Comment */}
                    <Comment id={article.id}/>
                </div>
            </div>
        )
      }
    </div>
  )
}

export default Article
