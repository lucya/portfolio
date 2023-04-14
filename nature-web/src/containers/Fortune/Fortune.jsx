import Header from "../../components/Header/Header";
import FortuneConversation from "../../components/Chatgpt/FortuneConversation";
import Footer from "../../components/Footer/Footer";
import './Fortune.css';

function Fortune() {

  return (
    <div className="fortune-container">
      <FortuneConversation />
    </div>
  );
}

export default Fortune;