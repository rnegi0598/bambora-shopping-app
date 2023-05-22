import React from "react";
import "./List.scss";
import Card from "../Card/Card";
import { useSelector } from "react-redux";

const List = ({ subCats, maxPrice, sort, category }) => {
    const products=useSelector(state=>state.products.products);
    const dataTemp=products.filter((prod)=>{
        return prod.category===category && prod.price<=parseInt(maxPrice)  ;
    });
    let data=[];
    // filtering sub category
    dataTemp.forEach(item => {
        subCats.forEach(element => {
            console.log(item.subCategory," ",element);
            if(element===item.subCategory){
                data.push(item);
            }
        });
    });
   if(subCats.length===0){
    data=dataTemp
   }
   //sort
   sort && data.sort((a,b)=>{
    
    return sort==="asc"?a.price>b.price:a.price<b.price
   })
   
  return (
    <div className="list">
      {data?.map((item) => (
        <Card item={item} key={item.id} />
      ))}
    </div>
  );
};

export default List;
