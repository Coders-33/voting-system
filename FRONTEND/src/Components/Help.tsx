import React, { useEffect, useRef, useState } from "react";
import styles from "../Styling/Help.module.css";
import {
  commonQuestions,
  commonResponses,
  GenerateRelaventQuestion,
} from "../script/GetData";


const Help: React.FC = () => {


  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    {
      sender: "bot",
      text: "Hello! How can I help you? Click on a question below.",
    },
  ]);


useEffect(() => {

    if(scrollDivRef.current) {
        scrollDivRef.current.scrollIntoView({ behavior : "smooth" })
   }


} , [messages])

  const handleQuestionClick = (question: string) => {
    const response = Object.entries(commonResponses).find(([key, value]) => {
      if (key == question) {
        return value;
      }
    })?.[1];

    

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: question },
      {
        sender: "bot",
        text: response || "Sorry, I don't understand. Please contact support.",
      },
    ]);




   if(response) {
    let suggestQuestions = GenerateRelaventQuestion(question);
    if(suggestQuestions) {
        setSuggestedQuestions(suggestQuestions);
    }
   }

  };
  
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const scrollDivRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.container}>
      <h2>Help & Support</h2>

      <div className={styles.chatbox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              msg.sender === "user" ? styles.user : styles.bot
            }`}
          >
            <span
              className={
                msg.sender === "user" ? styles.userMessage : styles.botMessage
              }
            >
              {msg.text}
            </span>
          </div>
        ))}
        <div ref={scrollDivRef} ></div>
        <div ref={scrollDivRef} ></div>
      </div>

      <div className={styles.buttonBox}>
        {Object.entries(commonQuestions).map(([key, value]) => (
          <button
            key={key}
            className={styles.questionButton}
            onClick={() => handleQuestionClick(key)}
          >
            {key}
          </button>
        ))}
      </div>
 
{ suggestedQuestions.length > 0 &&

<div className={styles.suggestedQuestions} >
<span>Suggested Questions : </span>
<div className={styles.buttonBox} >
  { suggestedQuestions.map((question ,index) => (
     
     <button
     key={index}
     className={styles.questionButton}
     onClick={() => handleQuestionClick(question)}
   >
     {question}
   </button>
  ))}
</div>
</div>

}

</div>


)}

export default Help;
