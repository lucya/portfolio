import React from "react";
import FortuneConversation from "../../components/Chatgpt/FortuneConversation";
import './Fortune.css';

const Fortune: React.FC = () => {

  return (
    <div className="fortune-container">
      <FortuneConversation />
    </div>
  );
}

export default Fortune;