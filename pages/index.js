import React from 'react'

//importing sanity api from client.js 
import {client} from '../lib/client';

import { Footer, FooterBanner, HeroBanner, Product } from '../components';

const Home = ({products, bannerData}) => {
  return (
    <div>
    <HeroBanner  heroBanner={bannerData.length && bannerData[0]}/>
     <div className='products-heading'>
        <h2>
          Best Selling Product
        </h2>
        <p>
          Spice it up with customer favourites
        </p>
     </div>
     <div className='products-container'>
        {products?.map((product)=> <Product key={product._id} product={product} />)}
     </div>

     <FooterBanner/>
    </div> 
  )
}



export const getServerSideProps = async () =>{
  //grab all products data from sanity 
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  //grab all banner data from sanity
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);
  //returns an object the products and banner props data 
  return {
    props: {products, bannerData}
  }
}

export default  Home