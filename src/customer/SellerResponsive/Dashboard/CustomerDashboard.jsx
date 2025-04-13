import { useState, useEffect } from 'react';

import Sidebar from "./Sidebar";
import styled from "styled-components";
import { Provider, useDispatch } from 'react-redux';
import store from '../../../store/index';
import { getAuth } from 'firebase/auth';
import CustomerDashboardHeader from './customerdashboardHeader';
import CustomerRenderPage from './CustomerRenderPage';
import { getCustomer } from '../../../store/reducers/customerProductReducer';



const SideDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: end;
align-items: end;
background: var(--Dark, #09262a);
height: 100vh;
transition: width 0.3s ease-in-out;
width: 20%;
@media (max-width: 1024px) {
    display : none;
    width : 100%;
    align-items : center;
    justify-content : start
}
`
const styles = {
fullDiv: {
display: 'flex',
justifyContent: 'end',
height: '100vh', // Fill the whole height of the viewport
width: '100vw', // Fill the whole width of the viewport
background: 'var(--Dark, #09262a)',
backgroundColor: 'var(--Dark, #09262a)',
overflow: 'auto', // Prevent overflow
},


sideDiv: {
    display: 'flex',
    flexDirection: 'column', // Arrange children in a column
    justifyContent : " start",
    alignItem: " start",
    width: '20%', // 30% width for the right div
    background: 'var(--Dark, #09262a)',
    backgroundColor: 'var(--Dark, #09262a)',
    height: '100vh', // Fill the whole height of the viewport

},
mainContent: {
    flex: 1, // Take up remaining space (70%)
    backgroundColor: '#F6F5F5', // Light gray background for the left div
    display: 'flex',
    width: '100%',
    flexDirection: 'column', // Arrange children in a column
    padding: '4px 16px', // Padding for the main content
    borderRadius: '10px', // Rounded corners for a nicer look
    overflowY: 'scroll', // Enable vertical scrolling
    overflowX: 'hidden', // Hide horizontal scrollbar
    scrollbarWidth: 'none', // For Firefox
    gap: '24px'         
},

// Hide scrollbars for WebKit browsers (Chrome, Safari)
'scrollableDiv::-webkit-scrollbar': {
    display: 'none', // Hide scrollbar
},
};


const Customerdashboard = () => {
    const user='seller'
    const [currentPage, setCurrentPage] = useState('الرئيسية');
    const [isOpen , setIsOpen] = useState(false)
    const dispatch=useDispatch()
    const customerid=localStorage.getItem("customerId")
    //test

    useEffect(() => {   



        const handleResize = () => {
          if (window.innerWidth <= 1024) {
            setIsOpen(false); 
          
          } else {
            setIsOpen(true);
          
          }
        };
    
        handleResize(); // Check initially
        window.addEventListener('resize', handleResize); 
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    
      
const toggleSidebar = () => {
  dispatch(getCustomer(customerid))
        if (window.innerWidth <= 1024) {
          setIsOpen((prevState) => !prevState); 
         
        }
      
      };



    return (

        <div style={styles.fullDiv}>
            <Provider store={store} >
                <div style={styles.mainContent}>
                   <CustomerDashboardHeader setCurrentPage={setCurrentPage} currentPage={currentPage} toggleFunc = {toggleSidebar} />
                    <CustomerRenderPage currentPage={currentPage} user={user} setCurrentPage={setCurrentPage} />
                </div>
            </Provider>

            <SideDiv style= {{display : isOpen ? 'flex' : 'none'}}>
                <Sidebar  setCurrentPage={setCurrentPage} currentPage={currentPage} open = {isOpen} toggleSidebar={toggleSidebar} />
            </SideDiv>
        </div>

    );
};

export default Customerdashboard;