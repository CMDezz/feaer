import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export default function DashboardCollectionEdit(props) {

    const createForm = useRef();

    const [collectionName, setCollectionName] = useState("")
    const [collectionBanner, setCollectionBanner] = useState([])
    const [product, setProduct] = useState([])
    const [productList, setProductList] = useState([])
    const [file, setFile] = useState([])

    const collection = props.collection

    useEffect(()=>{
        // axios.get(`http://localhost:4000/products`)
        //     .then(res => {
        //         setProduct(res.data)
        //     }
        // )
        // if (collection) {
        //     setCollectionBanner([collection.collectionBanner])
        //     setCollectionName(collection.collectionName)
        //     setProductList(collection.collectionItems)
        // }
    },[collection])

    const onSubmit = (event) => {
        event.preventDefault()

        event.preventDefault()
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        const formData = new FormData();
        const imageArr = Array.from(file);
        imageArr.forEach(image => {
            formData.append('collectionBanner', image);
        })
        formData.append("productList", JSON.stringify(productList));
        formData.append("collectionName", collectionName);
        // axios.post(`http://localhost:4000/collection/update/${collection._id}`, formData, config)
        // .then(()=>{
        //     props.setCloseEditFunc(false);
        //     props.setToastFunc(true);
        // })
    }

    const deleteImg = (event) => {
        const virutalFile = [...file]
        virutalFile.splice(event.target.id, 1)
        setFile(virutalFile)

        const items = [...collectionBanner]
        items.splice(event.target.id, 1)
        setCollectionBanner(items)
    }

    return (
        <div className="DashboardProductInfo">
            <div className="create-box"> 
                <div className="create-box-title flex">
                    <div className="create-box-title-text">
                        Order infomation
                    </div>
                    <div  
                        className="create-box-title-close flex-center"
                        onClick={()=>{
                            props.setCloseEditFunc(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faTimes}/>
                    </div>
                </div>
                <form onSubmit={onSubmit} encType="multipart/form-data" ref={createForm}>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Name</div>
                        <div className="dashboard-right">
                            <input 
                                type="text" name="name" 
                                value={collectionName || ""}
                                onChange={(event)=>{
                                    setCollectionName(event.target.value)
                                }} required
                            ></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Collection Banner </div>
                        <div className="dashboard-right">
                            <input 
                                onChange={(event) => {
                                    const files = event.target.files;
                                    for (let i = 0; i< files.length; i++) {
                                        setCollectionBanner(news=>[...news, URL.createObjectURL(files[i])])
                                    }
                                    const fileArr = Array.prototype.slice.call(files)
                                    fileArr.forEach(item=>{
                                        setFile(file=>[...file, item])
                                    })
                                }}
                                type="file"
                                className="noborder"
                                multiple="multiple"
                                style={{height: '50px'}}
                            ></input>
                            <div className="flex" style={{ overflowY: 'hidden', flexWrap:'wrap'}}>
                                { collectionBanner && 
                                    collectionBanner.map((item, index) => {
                                        return (
                                            <div key={index} className="create-box-img" style={{width: '130px'}}>
                                                <img key={index} src={item} alt=""></img>
                                                <div 
                                                    className="create-box-img-overlay"
                                                >
                                                    <p
                                                        id={index}
                                                        onClick={deleteImg}
                                                        className="icon">X
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Items</div>
                        <div className="dashboard-right">
                            <select 
                                className="input"
                                style={{height: '25px', marginBottom: '10px'}}
                                value={""}
                                onChange={(event)=>{
                                    const isExists = (cartItems = [], item = {}) => {
                                        for (let cartItem of cartItems) {
                                            if (cartItem._id === item._id) {
                                                return cartItem;
                                            }
                                        }
                                        return false;
                                    }

                                    const value = event.target.value
                                    const virtualCart = [...productList] 
                                    if (productList.length === 0) {
                                        virtualCart.push({...JSON.parse(value), count: 1})
                                    } else {
                                        if (!isExists(productList, JSON.parse(value))) {
                                            virtualCart.push({...JSON.parse(value), count: 1})
                                        } else {
                                            for (let i = 0; i < virtualCart.length; i++) {
                                                if (virtualCart[i]._id === JSON.parse(value)._id) {
                                                    virtualCart[i].count += 1
                                                    break
                                                }
                                            }
                                        }
                                    }
                                    setProductList(virtualCart)
                                }}
                            >
                                <option selected value>select a product</option>
                                {product.map((item, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={JSON.stringify(item)}
                                        >Name: {item.productName}, Price: {item.productFinalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</option>
                                    )
                                })}
                            </select>
                            <div className="" style={{ overflowY: 'hidden', flexWrap:'wrap'}}>
                                { productList && 
                                    productList.map((item, index) => {
                                        return (
                                            <div 
                                                key={index}
                                                className="order-list-item"
                                            >
                                                <img src={item.productImg[0]} alt=""></img>
                                                <p style={{width: '55%'}}>{item.productName}</p>
                                                <div 
                                                    id={index}
                                                    className="delete-order-item flex-center"
                                                    onClick={(event)=>{
                                                        var arr = [];
                                                        const id = event.target.id;
                                                        for (let i in productList) {
                                                            if (i !== id) {
                                                                arr.push(productList[i])
                                                            }
                                                        }
                                                        setProductList(arr)
                                                    }}>
                                                    <FontAwesomeIcon style={{pointerEvents: 'none'}} icon={faTimes}/>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div> 
                    <div className="flex-center" style={{marginTop: '40px'}}>
                        <button className="create-box-btn btn">
                            Update collection
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}