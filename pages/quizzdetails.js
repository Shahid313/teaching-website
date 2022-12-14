import Head from 'next/head'
import Image from 'next/image'
import React,{useState, useEffect} from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter, useRouter } from 'next/router';
// import $ from 'jquery';
// import Popper from 'popper.js';

function QuizzDetails(props) {
  const [quizz, setQuizz] = useState([]);
  const [difficulty, setDifficulty] = useState([]);
  const router = useRouter();
  const quizzImagePath = "http://localhost:5000/uploads/quiz_images/";
  useEffect(() => {
    const quizzId = props.router.query.quizzId;
    if(quizzId != null){
      localStorage.setItem('id', quizzId);
    }

    let id = localStorage.getItem('id');
        axios.get(`http://localhost:5000/get_quizz_by_id?quizzId=${id}`).then((response) => {
          setQuizz(response.data.quizz);
          setDifficulty(response.data.quizz.difficulty);

        })
    }, []);

    const getSolution = () => {
      let id = localStorage.getItem('id');
      router.push({
        pathname: '/solution',
        query: { quizzId: id }
    });
    }
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className='QuizzDetailBox'>
      <div className='quizImage'>
        <Image src={quizzImagePath+quizz.image} layout="fill" alt='quiz image'/>
      </div>
      <div className='QuizzText'>
      <h1 className='subject'>{quizz.title}</h1>
      <h5 className='subject'>{quizz.subject}</h5>
      <h5 className='questionTag'>Question</h5>
      <p className='question'>{quizz.question}</p>
      <h5 className='answerTag'>Answer</h5>
      <p className='answer'>{quizz.answer}</p>
      <h5 className='difficultyTag'>Difficulty</h5>
      <div>
        {
          difficulty.map((diff, index) => {
            return(
              <svg key={index} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="diffIcon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            )
          })
        }
      </div>
      </div>
      <p className='solution' onClick={() => getSolution()}>Solution</p>
      </div>



    </div>
  )
}

export default withRouter(QuizzDetails);