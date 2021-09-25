import React,{Component} from 'react'
import './App.css';
import MyNavbar from './Header/MyNavbar';
import { BrowserRouter as Router, } from 'react-router-dom'

import MyFooter from './Footer/MyFooter';
import { Col, Container, Offcanvas, Row } from 'react-bootstrap';
import MyRouterSwitch from './AllRoutes/MyRouterSwitch';
import AdminSideNav from './SideNav/AdminSideNav';
import UserSideNav from './SideNav/UserSideNav';
import DefaultSideNav from './SideNav/DefaultSideNav';


class App extends Component{
    constructor(props){
      super(props);

      this.state=({
        user_type:localStorage.getItem('user_type')??"DEFALUT",
        sidePanelForSmallSize:false
      })

      this.changeUser = ()=>{
        if(this.state.user_type==='ADMIN')
          this.setState({...this.state,user_type:'USER'})
        else if(this.state.user_type==='USER')
          this.setState({...this.state, user_type:'DEFALUT'})
        else
          this.setState({...this.state,user_type:'ADMIN'})

        
      }

      this.sidePanel = ()=>{
        this.setState({...this.state,sidePanelForSmallSize:!this.state.sidePanelForSmallSize})
        console.log("SIDE PANEL"+this.state.sidePanelForSmallSize);
      }
      this.updatePage = ()=>{
        this.setState( { ...this.state,user_type:localStorage.getItem('user_type')} )
      }

    }
    
  render(){
  return (
      <div className="App">
        <Router>
           {/*======== NAVBAR ======== */}
           <MyNavbar sidePanel={this.sidePanel} updateUser={this.updatePage} changeUser={this.changeUser}/>
           {/* <UserIconPanel /> */}

            {/*======== PAGE ======== */}
            <Container fluid>

              <Row>
                {/*======== SIDE NAV ======== */}
                {/* ---------------FOR MOBILE VIEW-------------------- */}
                <Offcanvas backdropClassName="d-sm-none d-block" show={this.state.sidePanelForSmallSize} onHide={this.sidePanel}>
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title></Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body className="text-center">
                      {this.state.user_type === 'ADMIN' ?  <AdminSideNav /> : this.state.user_type ==='USER' ? <UserSideNav/> : <DefaultSideNav />}
                  </Offcanvas.Body>
                </Offcanvas>
                {/* --------------------FOR DESKTOP VIEW--------------- */}
                  <Col className="col-lg-2 py-3 col-md-3 d-md-block d-none bg-light border-end min-vh-100">
                        {this.state.user_type === 'ADMIN' ?  <AdminSideNav /> : this.state.user_type ==='USER' ? <UserSideNav/> : <DefaultSideNav />}
                  </Col>
                {/*======== CONTENT ======== */}
                  <Col className="col-lg-10 col-md-9 py-3">
                    <MyRouterSwitch updateUser={this.updatePage} />
                  </Col>
              </Row>

             
            </Container>
            {/*======== FOOTER ======== */}
          <MyFooter />
          
        </Router>
      </div>
    )
  }
}

export default App;
