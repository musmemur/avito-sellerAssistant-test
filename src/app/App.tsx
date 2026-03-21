import {Route, Routes} from "react-router-dom";
import {AdvertsPage} from "../pages/AdvertsPage";
import {AdvertPage} from "../pages/AdvertPage";
import {EditAdvertPage} from "../pages/EditAdvertPage";
import './styles/index.css';

function App() {

  return (
    <Routes>
      <Route path='/ads' element={<AdvertsPage/>}></Route>
      <Route path='/ads/:id' element={<AdvertPage/>}></Route>
      <Route path='/ads/:id/edit' element={<EditAdvertPage/>}></Route>
    </Routes>
  )
}

export default App
