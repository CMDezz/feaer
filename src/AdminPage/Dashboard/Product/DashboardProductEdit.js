import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import {Select} from 'antd'

export default function DashboardProductEdit(props) {

    const createForm = useRef();
    const cateInput = useRef();
    const groupCateInput = useRef();
    const [isCheckedSmall, setIsCheckedSmall] = useState(false);
    const [isCheckedMedium, setIsCheckedMedium] = useState(false);
    const [isCheckedLarge, setIsCheckedLarge] = useState(false);
    const [inputValue, setInputValue] = useState([])
    const [cate, setCate] = useState([])
    const [file, setFile] = useState([])
    const product = props.product
    const baseUrl = process.env.REACT_APP_API_URL;


    const [productImg, setProductImg] = useState([])
    const [productName, setProductName] = useState("")
    const [productSale, setProductSale] = useState(0)
    const [productPrice, setProductPrice] = useState(0)
    const [productDes, setProductDes] = useState("")
    const [productCate, setProductCate] = useState([])
    const [productGroupCate, setProductGroupCate] = useState("")
    const [productGroupCateList, setProductGroupCateList] = useState([])
    const [productSize, setProductSize] = useState({})
    const [productSex, setProductSex] = useState([])

    const checkedSize = (event) => {
        if (event.target.id === "1") {
            if (isCheckedSmall) {
                const size = productSize.filter((item)=> {
                    return item !== 'Small'
                })
                setProductSize(size)
                setIsCheckedSmall(false)
            } else {
                setProductSize(productSize=>[...productSize, 'Small'])
                setIsCheckedSmall(true)
            }
        }
        if (event.target.id === "2") {
            if (isCheckedMedium) {
                const size = productSize.filter((item)=> {
                    return item !== 'Medium'
                })
                setProductSize(size)
                setIsCheckedMedium(false)
            } else {
                setProductSize(productSize=>[...productSize, 'Medium'])
                setIsCheckedMedium(true)
            }
        }
        if (event.target.id === "3") {
            const size = productSize.filter((item)=> {
                return item !== 'Large'
            })
            setProductSize(size)
            if (isCheckedLarge) {
                setIsCheckedLarge(false)
            } else {
                setProductSize(productSize=>[...productSize, 'Large'])
                setIsCheckedLarge(true)
            }
        }
    }

    const handleOnChange = (event) => {
        setInputValue({...inputValue, [event.target.name]: event.target.value})
    }
    
    useEffect(()=> { 
        if (product) {
            setProductName(product.Name)
            setProductImg(product.Image)
            setProductSale(product.Discount?product.Discount.Value:0)
            setProductPrice(product.Price)
            setProductDes(product.Desc)
            setProductCate(product.Category?product.Category:[])
            setProductSex(product.Sex?product.Sex._id:'')
            setProductSize(Object.keys(product.SizeAndStock)?.length ?product.SizeAndStock  : {S:'',M:'',L:''})
            // setProductGroupCate(product.productGroupCate)
            axios.get(`${baseUrl}/category`)
                .then(res => {
                    setCate(res.data)
                }
            )
            // axios.get(`${baseUrl}/products`)
            //     .then(res => {
            //         const test = Object.values(res.data.reduce((a, {productGroupCate}) => {
            //             a[productGroupCate] = a[productGroupCate] || {productGroupCate};
            //             return a;
            //         }, Object.create(null)));
            //         setProductGroupCateList(test)
            //     }
            // )
            // if (product.productSize) {
            //     for (let i of product.productSize) {
            //         if(i === "Small") setIsCheckedSmall(true)
            //         if(i === "Medium") setIsCheckedMedium(true)
            //         if(i === "Large") setIsCheckedLarge(true)
            //     }
            // }
            console.log('product ',product)
        }
    },[product])

    const onSubmit = async (event) => {
        event.preventDefault()
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        const imgurrConfig = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization':'Client-ID 5a823def27c9647',
                'Accept':'*',
                'Access-Control-Allow-Origin':'*'                
            }
        }

        // axios.post('https://api.imgur.com/3/image',,config)
        const formData = new FormData();

        
        const uploadImage = async()=>{
            let resultLink = ''
            const imageArr = Array.from(file);
            // await  imageArr.forEach(async image => {
            //     console.log('image ',image)
                const _imageForm = new FormData()
                _imageForm.append('image', imageArr[0]);
                await axios.post('https://api.imgur.com/3/upload',_imageForm,imgurrConfig)
                    .then(res=>{
                        console.log('res nay ',res)
                        resultLink = (res.data.data.link)
                    })
            return resultLink
            
        }
        let imgLink = ''
        if (file.length){
            imgLink = await uploadImage()
        }
        console.log('imgLink ',imgLink)
        let model = {
            Name:productName,
            id:product._id,
            Price:productPrice,
            FinalPrice:productPrice,
            Category:productCate,
            SizeAndStock:productSize,
            // ImageDetail:product.ImageDetail?.length ? [...product.ImageDetail,imgLink]:[]
            Desc:productDes,
            Sex:{"_id":productSex},
            updatedAt:new Date(),
            Image:imgLink?[...productImg,imgLink]:productImg,
        }
        // formData.append("Name", productName);
        // formData.append("id", product._id);
        // // formData.append("productSale", productSale);
        // formData.append("Price", productPrice);
        // formData.append("Category", productCate);
        // formData.append("SizeAndStock", JSON.stringify(productSize));
        // formData.append("Desc", productDes);
        // formData.append("Sex", productSex);
        // formData.append("updatedAt", new Date());
        // formData.append("Image", JSON.stringify([...product.Image,imgLink]));

        axios.put(`${baseUrl}/product/editProduct`, model)
        .then(()=>{
            props.setCloseEditFunc(false);
            props.setToastFunc(true);
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    const onChangeSize = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        let _productSize = {...productSize}
        _productSize[name] = value;
        setProductSize(_productSize)
    }

    const addNewCate = () => {
        // axios.post('http://localhost:4000/category', {
        //     cateName: inputValue.cate
        // })
        setCate(cate=>[...cate, {cateName: inputValue.cate}])
        setProductCate(inputValue.cate)
        cateInput.current.value = ""
    }
 
    const addNewGroupCate = () => {
        setProductGroupCate(inputValue.groupCate)
        setProductGroupCateList(productGroupCateList => [...productGroupCateList, {productGroupCate: inputValue.groupCate}])
        groupCateInput.current.value = ""
    } 

    const deleteImg = (event) => {
        const id = event.target.id
        const virutalFile = [...file]
        virutalFile.splice(id, 1)
        setFile(virutalFile)

        const items = [...productImg]
        items.splice(id, 1)
        setProductImg(items)
        // axios.post(`http://localhost:4000/products/update/${product._id}`, {
        //     deleteImgId: id
        // })
    }

    return (
        <div className="DashboardProductInfo">
            <div className="create-box">
                <div className="create-box-title flex">
                    <div className="create-box-title-text">
                        Thông tin sản phẩm
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
                { product && 
                    <form onSubmit={onSubmit} encType="multipart/form-data" ref={createForm}>
                        <div className="create-box-row flex">
                            <div className="dashboard-left flex">Tên</div>
                            <div className="dashboard-right">
                                <input 
                                    type="text" name="name" 
                                    value={productName}
                                    onChange={(event)=>{
                                        setProductName(event.target.value)
                                    }} required
                                ></input>
                            </div>
                        </div>
                        <div className="create-box-row flex">
                            <div className="dashboard-left flex">Hình </div>
                            <div className="dashboard-right">
                                <input 
                                    onChange={(event) => {
                                        const files = event.target.files;
                                        for (let i = 0; i< files.length; i++) {
                                            setProductImg(product=>[...product, URL.createObjectURL(files[i])])
                                        }
                                        const fileArr = Array.prototype.slice.call(files)
                                        fileArr.forEach(item=>{
                                            setFile(file=>[...file, item])
                                        })
                                    }}
                                    type="file"
                                    name="productImg"
                                    className="noborder"
                                    multiple="multiple"
                                    style={{height: '50px'}}
                                ></input>
                                <div className="flex" style={{ overflowY: 'hidden', flexWrap:'wrap'}}>
                                    { productImg && 
                                        productImg.map((item, index) => {
                                            return (
                                                <div className="create-box-img">
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
                            <div className="dashboard-left flex">Giá cơ bản </div>
                            <div className="dashboard-right">
                                <input 
                                    type="number" name="price" 
                                    placeholder="USD" 
                                    value={productPrice}
                                    onChange={(event)=>{
                                        setProductPrice(event.target.value)
                                    }} required
                                ></input>
                            </div>
                        </div>
                        {/* <div className="create-box-row flex"> */}
                            {/* <div className="dashboard-left flex">Khuyến mãi </div>
                            <div className="dashboard-right flex-center"> */}
                                {/* <input 
                                    type="number" placeholder="%" 
                                    style={{ width: "100px"}} 
                                    name="sale" 
                                    value={productSale}
                                    onChange={(event)=>{
                                        setProductSale(event.target.value)
                                    }}
                                    required></input> */}
                                {/* <label>From: </label>
                                <input type="date"  name="fromdate" onChange={handleOnChange} placeholder="dd/mm/yyyy" pattern="(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)"/>
                                <label>To: </label>
                                <input type="date"  name="todate" onChange={handleOnChange} placeholder="dd/mm/yyyy" pattern="(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)"/> */}
                            {/* </div> */}
                        {/* </div> */}
                        {/* <div className="create-box-row flex">
                            <div className="dashboard-left flex">Thể loại</div>
                            <div className="dashboard-right flex-center">
                                <select style={{ width: "350px"}} 
                                    onChange={(event) => {setProductGroupCate(event.target.value)}}
                                    value={productGroupCate}
                                >
                                    <option></option>
                                    { productGroupCateList.length > 0 &&
                                        productGroupCateList.map((item, index) => {
                                            if (item.productGroupCate) {
                                                return(
                                                    <option key={index}>{item.productGroupCate}</option>
                                                )
                                            }
                                            return null
                                        })
                                    }
                                </select>
                                <input type="text" name="groupCate" placeholder="New category group?" style={{  margin:'0 10px'}} onChange={handleOnChange} ref={groupCateInput}></input>
                                <div className="btn" style={{
                                    fontSize: '14px',
                                    fontFamily: 'sans-serif',
                                    fontWeight: '300',
                                    padding: '0 10px',
                                    cursor: 'pointer',
                                    width: '350px',
                                    height: '30px'
                                }}
                                onClick={addNewGroupCate}>
                                    Add
                                </div>
                            </div>
                        </div> */}
                        <div className="create-box-row flex">
                            <div className="dashboard-left flex">Thể loại </div>
                            {console.log('----------product cate',productCate)}
                            <div className="dashboard-right flex-center">

                                <Select
                                mode="multiple"
                                placeholder="Chọn thể loại"
                                onChange={(value,options) => {console.log('vslue ',value);setProductCate(value)}}
                                defaultValue={[...productCate]}
                                value={productCate}
                                // defaultValue={productCate}
                                // style={{ width: '100%' }}
                                options={props.category}
                                fieldNames={{label:'Name',value:'_id'}}
                                style={{minWidth:'50%'}}
                                />
                                {/* <select style={{ width: "350px"}} 
                                    onChange={(event) => {setProductCate(event.target.value)}}
                                    value={productCate}
                                >
                                    <option></option>
                                    { props.category.length > 0 &&
                                        props.category.map((item, index) => {
                                            return(
                                                <option key={item._id}>{item.Name}</option>
                                            )
                                        })
                                    }
                                </select> */}
                                <input type="text" name="cate" placeholder="New category?" style={{  margin:'0 10px'}} onChange={handleOnChange} ref={cateInput}></input>
                                <div className="btn" style={{
                                    fontSize: '14px',
                                    fontFamily: 'sans-serif',
                                    fontWeight: '300',
                                    padding: '0 10px',
                                    cursor: 'pointer',
                                    width: '350px',
                                    height: '30px'
                                }}
                                onClick={addNewCate}>
                                    Add
                                </div>
                            </div>
                        </div>
                        <div className="create-box-row flex">
                            <div className="dashboard-left flex">Giới tính </div>
                            <div className="dashboard-right flex">
                                <select style={{ width: "200px"}} 
                                    onChange={(event) => {setProductSex(event.target.value)}}
                                    value={productSex}
                                    required>
                                    <option></option>
                                    <option value='629ef31f85deb3c935243765'>Nam</option>
                                    <option value='629ef31c85deb3c935243763'>Nữ</option>
                                </select>
                            </div>
                        </div>
                        <div className="create-box-row flex">
                            <div className="dashboard-left flex">Size </div>
                            <div className="dashboard-right flex">
                                {console.log('size ',productSize)}
                                {
                                    (Object.keys(productSize).length?Object.keys(productSize):['S','M','L']).map(size=>{
                                        return <div className='d-flex justify-content-center align-items-center'> 
                                            <strong>{size}</strong>
                                            <input type='number' value={productSize?productSize[size]:''} name={size} onChange={onChangeSize}/>
                                        </div>
                                    })
                                }
                                {/* <div 
                                    className={isCheckedSmall ? "size-check isChecked" : "size-check"}
                                    id="1" 
                                    onClick={checkedSize}>Small</div>
                                <div 
                                    className={isCheckedMedium ? "size-check isChecked" : "size-check"}
                                    id="2" 
                                    onClick={checkedSize}>Medium</div>
                                <div 
                                    className={isCheckedLarge ? "size-check isChecked" : "size-check"}
                                    id="3" 
                                    onClick={checkedSize}>Large</div> */}
                            </div>
                        </div>
                        <div className="create-box-row flex">
                            <div className="dashboard-left flex">Mô tả </div>
                            <div className="dashboard-right">
                                <input 
                                    type="text" 
                                    name="des" 
                                    value={productDes || ""}
                                    onChange={(event)=>{
                                        setProductDes(event.target.value)
                                    }}required></input>
                            </div>
                        </div>

                        <div className="flex-center" style={{marginTop: '40px'}}>
                            <button className="create-box-btn btn">
                                Cập nhập
                            </button>
                        </div>
                    </form>
                }
            </div>
        </div>
    )
}