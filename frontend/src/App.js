import { BrowserRouter,BrowserRouter as Router, Switch,Route, useHistory } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Main from "./pages/Main/Main";
import Mained from "./pages/Mained/Mained";
import Sell from "./pages/Sell/Sell";
import ListSell from "./pages/Sell/ListSell";
import EditSell from "./pages/Sell/EditSell";
import Detail from "./components/Detail/Detail";
import Cart from "./pages/Cart/Cart";
import Admin from "./pages/Admin/Admin";
import Payment from "./pages/Payment/Payment";
import Order from "./pages/Order/Order";
import DetailNoSigup from "./pages/Main/DetailNoSigup/DetailNoSigup";
// Admin
import ListProduct from "./pages/Admin/Product/ListProduct";
import ListOrder from "./pages/Admin/Order/ListOrder";
import AddProduct from "./pages/Admin/Product/AddProduct";
import EditProduct from "./pages/Admin/Product/EditProduct";
import WaitShipping from "./pages/Admin/Order/WaitShipping";
import Shipping from "./pages/Admin/Order/Shipping";
import HistoryOrder from "./pages/Admin/History/HistoryOrder";
import ListNew from "./pages/Admin/New/ListNew";
import AddNew from "./pages/Admin/New/AddNew";
import OrderHistoryUser from "./pages/Order/OrderHistoryUser";
import DetailSell from "./pages/Mained/Sell/DetailSell";




function App() {
  const history = useHistory();
  return (
    <div>
      <BrowserRouter>
      
        <Switch>
        <Router  history={history}>
          <Route exact path="/dangnhap">
            <Login></Login>
          </Route>
          <Route exact path="/dangky">
            <Register></Register>
          </Route>
          
          <Route exact path="/">
            <Main />
          </Route>
        
          
          <Route exact path="/mained"> 
            <Mained />
          </Route>
         
          
          <Route exact path="/detail/:id">
            <Detail />
          </Route>

          <Route exact path="/detailnosigup/:id">
            <DetailNoSigup />
          </Route>

          <Route exact path="/cart">
            <Cart />
          </Route>

          <Route exact path="/thanhtoan">
            <Payment/>
          </Route>

          <Route exact path="/order">
            <Order/>
          </Route>

          
          <Route exact path="/admin">
            <Admin />
          </Route>
          <Route exact path="/listproduct">
            <ListProduct />
          </Route>
          <Route exact path="/addproduct">
            <AddProduct />
          </Route>
          <Route exact path="/editproduct/:id">
            <EditProduct />
          </Route>

          <Route exact path="/waitshipping">
            <WaitShipping/>
          </Route>

          <Route exact path="/shipping">
            <Shipping/>
          </Route>

          <Route exact path="/listorder">
            <ListOrder />
          </Route>

          <Route exact path="/orderhistoryuser">
            <OrderHistoryUser />
          </Route>
          
          <Route exact path="/orderhistory">
            <HistoryOrder />
          </Route>
          
          <Route exact path="/listnew">
            <ListNew />
          </Route>

          <Route exact path="/addnew">
            <AddNew/>
          </Route>

          <Route exact path="/sell"> 
            <Sell></Sell>
          </Route>

          <Route exact path="/detailsellnosigup/:id">
            <DetailSell/>
          </Route>

          <Route exact path="/listsell"> 
            <ListSell/>
          </Route>
          <Route exact path="/editsell/:id">
            <EditSell />
          </Route>








          </Router>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

