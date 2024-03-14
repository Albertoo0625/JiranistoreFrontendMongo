import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import homer from "../homer.svg";
import styled from 'styled-components';
import { ButtonContainer } from './Button';
import SearchForm from './Search';
import { ProductConsumer } from '../context';
import Excel from './Excel';
export default class Navbar extends Component {
  render() {
    return (
      <ProductConsumer>
        {(value)=>{
          const { search } = value;
          const { getExcelData } = value;
          return(

<div style={{alignSelf:"flex-start",width:"100%"}}>
<NavbarWrapper className='navbar navbar-expand-sm navbar-dark px-sm-5'>
 <Link to="/home">

    <img src={homer} alt='store'
    className='navbar-brand' />
 </Link>
 <SearchForm search={search}/>
 <div>
  <Excel getExcelData={getExcelData}/>
 </div>
 <ul className='navbar-nav align-items-center'>
    <li className='nav-item ml-5' style={{margin:"20px"}}>
        <Link to='/seller' className="nav-link">Seller</Link>
    </li>
 </ul>
    <Link to='/cart' className='ml-auto'>
    <ButtonContainer>
        <span className='mr-2'>
        <i className='fas fa-cart-plus'/>
        </span>
        Cart
    </ButtonContainer>
    </Link>
</NavbarWrapper>
</div>

       ) }}
   
      </ProductConsumer>
    )
  }
}



const NavbarWrapper= styled.nav`
background: var(--mainBlue);
.nav-link{
    color:var(--mainWhite) !important;
    font-size:1rem;
    text-transform:capitalize;
}
width: 100%;
`;
