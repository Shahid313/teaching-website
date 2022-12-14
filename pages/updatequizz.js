import Head from 'next/head'
import Image from 'next/image'
import React,{useState, useEffect} from 'react'
import styles from '../styles/Home.module.css'
import { withRouter, useRouter } from 'next/router';
import axios from 'axios'
import Navbar from '../components/Navbar'

function UpdateQuizz(props) {

  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [subject, setSubject] = useState('');
  const [difficulty, setDifficulty] = useState([]);
  const [image, setImage] = useState('');

  const router = useRouter();

  const handleIncreaseDifficulty = () => {
    if(difficulty.length == 5){
      return false;
    }else{
      setDifficulty([...difficulty, 1]);
    }
  }

  const handleDecreaseDifficulty = (index) => {
    const values = [...difficulty];
    values.splice(index,1);
    setDifficulty(values);

  }
    
    
    
    
    useEffect(() => {
    const quizzId = props.router.query.quizzId;
    if(quizzId != null){
      localStorage.setItem('id', quizzId);
    }

    let id = localStorage.getItem('id');
        axios.get(`http://localhost:5000/get_quizz_by_id?quizzId=${id}`).then((response) => {
          setTitle(response.data.quizz.title);
          setQuestion(response.data.quizz.question);
          setAnswer(response.data.quizz.answer);
          setSubject(response.data.quizz.subject);
          setDifficulty(response.data.quizz.difficulty);
        })
    }, []);


    const editquizz = (e) => {
    let id = localStorage.getItem('id');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('question', question);
    formData.append('answer', answer);
    formData.append('difficulty', difficulty);
    formData.append('quiz_image', image);
    formData.append('subject', subject);
    formData.append('quizzId', id);

    const config = {
      headers: { 
        'content-type': 'multipart/form-data' }
     }
    
    axios.post('http://localhost:5000/update_quiz', formData, config).then((res) => {
      if(res.data.msg == "Quizz updated succesfully"){
        alert("Quizz updated succesfully");
        router.push('/')
      }
    }).catch((err) => {
      console.log(err);
    })

    e.preventDefault();
    }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.h1}>Update Quiz</h1>
      <div className={styles.formcontainer}>
      <hr/>
      <div className={styles.container}>
        <label htmlFor="title"><strong>Title</strong></label>
        <input onChange={(e) => (setTitle(e.target.value))} value={title} className={styles.input} type="text" placeholder="Enter quiz title" name="title" required/>
        
        <label htmlFor="question"><strong>Question</strong></label>
        <textarea onChange={(e) => (setQuestion(e.target.value))} value={question} className={styles.input} rows="4" cols="50" placeholder="Enter question" name="question" required></textarea>

        <label htmlFor="answer"><strong>Answer</strong></label>
        <input onChange={(e) => (setAnswer(e.target.value))} value={answer} className={styles.input} type="text" placeholder="Enter answer" name="answer" required/>

        <label><strong>Difficulty</strong></label>
        <div className={styles.difficultyInput}>

        {difficulty.map((diff, index) => (
        <svg key={index} onClick={() => handleDecreaseDifficulty(index)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.diffIcon}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
      ))}
      <div className={styles.increaseDifficultyButton} onClick={() => handleIncreaseDifficulty()}><p className={styles.increaseDecreaseDiffSymbol}>+</p></div>
      </div>

        <label htmlFor="subject"><strong>Subject</strong></label>
        <input onChange={(e) => (setSubject(e.target.value))} value={subject} className={styles.input} type="text" placeholder="Enter subject" name="subject" required/>
        <br/>
        <br/>
        <label className={styles.uploadImageButton} htmlFor="image">Image</label>

        <input onChange={(e) => setImage(e.target.files[0])} className={styles.fileInput} type="file" id="image"/>

      </div>
      <button onClick={(e) => editquizz(e)} className={styles.button} type="submit">Update</button>
      
      
      </div>


    </div>
  )
}

export default withRouter(UpdateQuizz);