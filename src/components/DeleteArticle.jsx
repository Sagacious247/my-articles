import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { db, storage } from '../firebaseConfig'
import { toast } from 'react-toastify'
import { deleteObject, ref } from 'firebase/storage'

function DeleteArticle({id, imageUrl}) {

    const handleDelete = async () => {
      if(window.confirm("Are you sure you want to delete?")) {
        try{

          await deleteDoc(doc(db, 'Articles', id))
          toast("Article deleted successfully", {type: "success"})

          const storageRef = ref(storage, imageUrl)
          await deleteObject(storageRef)
        }catch(error) {
          toast("Error deleting article", {type: "error"})
          console.log(error)
        }
      }
    }
  return (
    <div>
      <i onClick={handleDelete} className="fa fa-times"
      style={{cursor: "pointer"}}
      />
    </div>
  )
}

export default DeleteArticle
