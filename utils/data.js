import { collection,where,query,onSnapshot, documentId, doc,setDoc, updateDoc, and} from 'firebase/firestore';
import {useEffect, useState} from 'react';
import { db } from './firebaseHelper';


export function userData(id){
  const [user,setUser]=useState({});
  useEffect(()=> {
    const q = query(collection(db, "users"),where(documentId(),"==",id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => { 
      let usr =[]; 
        querySnapshot.forEach((doc) => {
          usr.push(
          {
            'id':id,
            'name':doc.data().name,
            'fullName':doc.data().surname,
            'email':doc.data().email,
            'language':doc.data().language,
          });
        });
        setUser(usr[0]);
      });
    return ()=>unsubscribe();
    },[]);
    return(user)
}

export const getSpecialists =()=>{
    const [specs,setSpecs]=useState([]);
    useEffect(()=> {
      const q = query(collection(db, "specs"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => { 
        let spec = []; 
        querySnapshot.forEach((doc) => {
          spec.push(
            {
                'id':doc.id,
                'fullName':doc.data().fullName,
                'email':doc.data().email,
                'speciality':doc.data().speciality
          });
          });
          setSpecs(spec);
        });
        return ()=>unsubscribe();
      
      },[]);
      return(specs)
  }
  
  export const getMessages =()=>{
    const [messages,setMessages]=useState([]);
    useEffect(()=> {
      const q = query(collection(db, "messages"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => { 
        let msg = []; 
        querySnapshot.forEach((doc) => {
          msg.push(
            {
                'id':doc.id,
                'text':doc.data().text,
                'patient':doc.data().patient,
                'specialist':doc.data().specialist,
                'sender':doc.data().sender,
          });
          });
          setMessages(msg);
        });
        return ()=>unsubscribe();
      
      },[]);
      return(messages)
  }
  