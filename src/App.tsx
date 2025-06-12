import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import './App.css';
import Home from "./pages/main/Home";
import Header from "./pages/main/Header";
import Footer from "./pages/main/Footer";
import 'swiper/css';
import 'swiper/css/pagination';
import RecipeList from "./pages/recipe/RecipeList";
import FoodList from "./pages/food/FoodList";
import BoardList from "./pages/board/BoardList";
import BoardInsert from "./pages/board/BoardInsert";
import BoardDetail from "./pages/board/BoardDetail";
import RecipeDetail from "./pages/recipe/RecipeDetail";
import FoodDetail from "./pages/food/FoodDetail";
import ScrollToTop from "./components/ScrollToTop";
import RecipeFind from "./pages/recipe/RecipeFind";
import FoodFInd from "./pages/food/FoodFInd";
import Login from "./pages/member/Login";
import RequireAuth from "./components/RequireAuth";
import BoardUpdate from "./pages/board/BoardUpdate";
import News from "./pages/news/News";

function App() {

  return (
      <div className={"min-h-screen flex flex-col"}>
      <Router>
          <ScrollToTop />
          <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/recipe/:page" element={<RecipeList/>} />
          <Route path="/recipe/find/:fd" element={<RecipeFind/>} />
          <Route path="/recipe/detail/:no" element={<RecipeDetail/>} />
          <Route path="/food/:page" element={<FoodList/>} />
          <Route path="/food/find/:fd" element={<FoodFInd/>} />
          <Route path="/food/detail/:fno" element={<FoodDetail/>} />
          <Route path="/board/:page" element={<BoardList/>} />
          <Route path="/board/detail/:no" element={<BoardDetail/>} />
          <Route path="/board/insert" element={<RequireAuth>
                                                  <BoardInsert />
                                              </RequireAuth>}
          />
            <Route path="/board/update/:no" element={<RequireAuth>
                <BoardUpdate />
            </RequireAuth>}
            />
            <Route path="/news" element={<News/>} />
        </Routes>

          <Footer/>
      </Router>
      </div>
  );
}

export default App;
