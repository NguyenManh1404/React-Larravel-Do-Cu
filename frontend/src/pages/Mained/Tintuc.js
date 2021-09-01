import React from 'react';
import { useEffect, useState } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Image } from "react-bootstrap";
import "./mained.css";


export default function Tintuc() {
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

      const [tintuc, setTintuc] = useState([]);
      useEffect(() => {
          getTintuc();
      }, []);
  
      async function getTintuc() {
          let result = await fetch("http://127.0.0.1:8000/api/tintuc");
          result = await result.json();
          setTintuc(result);
        }



 return (
   <div>
        <div className="title">
                <h1>
                    <b>Tin tức</b>
                </h1>
        </div>
        <Carousel responsive={responsive}>
        {tintuc.map((tintuc,key) => (
            <div className="tintuc" key={key}>
            <Image
            className="d-block w-100"
            src={"http://127.0.0.1:8000/image/tintuc/" + tintuc.image} alt={tintuc.image}
            fluid
          />
          <p>{tintuc.name}</p>
          <p>{tintuc.detail}</p>
            <h6>{tintuc.created_at}</h6>
            </div>
        ))}
        </Carousel>
   </div>
 );
}