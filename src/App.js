import Rotues from "./AllRotues/Rotues";
import "./App.css";
import Navbar from "./Components/Navbar";
// import { PostTweet } from "./Components/PostTweet";
// import ViewTweet from "./Components/ViewTweet";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Rotues />
      {/* <PostTweet />
      <ViewTweet /> */}
    </div>
  );
}

export default App;
