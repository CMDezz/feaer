import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export default function DashboardProductCreate(props) {
    const baseUrl = process.env.REACT_APP_API_URL;

    const createForm = useRef();
    const cateInput = useRef();
    const groupCateInput = useRef();
    const [isCheckedSmall, setIsCheckedSmall] = useState(false);
    const [isCheckedMedium, setIsCheckedMedium] = useState(false);
    const [isCheckedLarge, setIsCheckedLarge] = useState(false);
    const [inputValue, setInputValue] = useState([])
    const [cate, setCate] = useState([])
    const [cateValue, setCateValue] = useState("")
    const [size, setSize] = useState([])
    const [sex, setSex] = useState("629ef31f85deb3c935243765")
    const [file, setFile] = useState([])
    const [productGroupCate, setProductGroupCate] = useState("")
    const [productGroupCateList, setProductGroupCateList] = useState([])

    const [productImg, setProductImg] = useState([])

    const checkedSize = (event) => {
        if (event.target.id === "1") {
            if (isCheckedSmall) {
                setIsCheckedSmall(false)
            } else {
                setSize(size=>[...size, 'Small'])
                setIsCheckedSmall(true)
            }
        }
        if (event.target.id === "2") {
            if (isCheckedMedium) {
                setIsCheckedMedium(false)
            } else {
                setSize(size=>[...size, 'Medium'])
                setIsCheckedMedium(true)
            }
        }
        if (event.target.id === "3") {
            if (isCheckedLarge) {
                setIsCheckedLarge(false)
            } else {
                setSize(size=>[...size, 'Large'])
                setIsCheckedLarge(true)
            }
        }
    }

    const handleOnChange = (event,isSize=false) => {
        console.log('event.target.name ',event.target.name)
        console.log('event.target.value ',event.target.value)
        if (isSize){
            let clone = inputValue['SizeAndStock'] ?inputValue['SizeAndStock'] : {S:'',M:'',L:''};
            let size = {...clone,[event.target.name]: event.target.value};
            setInputValue({...inputValue, "SizeAndStock": size})
        }else{
            setInputValue({...inputValue, [event.target.name]: event.target.value})
        }
    }
    
    // useEffect(()=> {
    //     axios.get(`http://localhost:4000/products`)
    //         .then(res => {
    //             const test = Object.values(res.data.reduce((a, {productGroupCate}) => {
    //                 a[productGroupCate] = a[productGroupCate] || {productGroupCate};
    //                 return a;
    //             }, Object.create(null)));
    //             setProductGroupCateList(test)
    //         }
    //     )
    //     axios.get(`http://localhost:4000/category`)
    //         .then(res => {
    //             setCate(res.data)
    //         }) 
    // },[])

    const onSubmit = async (event) => {
        event.preventDefault()
        const imgurrConfig = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization':'Client-ID 5a823def27c9647',
                'Accept':'*',
                'Access-Control-Allow-Origin':'*'                
            }
        }

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
            Name:inputValue.Name,
            Price:inputValue.Price,
            FinalPrice:inputValue.Price,
            Category:inputValue.Category,
            SizeAndStock:inputValue.SizeAndStock ?? {S:0,M:0,L:0},
            Desc:inputValue.Desc,
            Sex:{"_id":sex},
            Image:imgLink?[imgLink]:[],
            ImageDetail:imgLink?[imgLink]:[],
        }
        console.log('model ne ',model)
        // const imageArr = Array.from(file);
        // imageArr.forEach(image => {
        //     formData.append('productImg', image);
        // });

        // formData.append("productName", inputValue.name);
        // formData.append("productSale", inputValue.sale);
        // formData.append("productPrice", inputValue.price);
        // formData.append("productCate", cateValue);
        // formData.append("productGroupCate", productGroupCate);
        // formData.append("productSize", size);
        // formData.append("productDes", inputValue.des);
        // formData.append("productSex", sex);
        // formData.append("productDate", new Date());
        axios.post(`${baseUrl}/product/createNewProduct`, model)
        .then(()=>{
            props.setCloseCreateFunc(false);
            props.setToastFunc(true);
        })
    }

    const addNewCate = () => {
        // axios.post('http://localhost:4000/category', {
        //     cateName: inputValue.cate
        // })
        setCate(cate=>[...cate, {cateName: inputValue.cate}])
        setCateValue(inputValue.cate)
        cateInput.current.value = ""
    }

    const addNewGroupCate = () => {
        setProductGroupCate(inputValue.groupCate)
        setProductGroupCateList(productGroupCateList => [...productGroupCateList, {productGroupCate: inputValue.groupCate}])
        groupCateInput.current.value = ""
    } 

    const deleteImg = (event) => {
        const virutalFile = [...file]
        virutalFile.splice(event.target.id, 1)
        setFile(virutalFile)

        const items = [...productImg]
        items.splice(event.target.id, 1)
        setProductImg(items)
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
                            props.setCloseCreateFunc(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faTimes}/>
                    </div>
                </div>
                <form onSubmit={onSubmit} encType="multipart/form-data" ref={createForm}>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Tên</div>
                        <div className="dashboard-right">
                            <input type="text" name="Name" onChange={handleOnChange} required></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Hình ảnh </div>
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
                                name="Image"
                                className="noborder"
                                multiple="multiple"
                                style={{height: '50px'}}
                            ></input>
                            <div className="flex" style={{ overflowY: 'hidden', flexWrap:'wrap'}}>
                                { productImg && 
                                    productImg.map((item, index) => {
                                        return (
                                            <div key={index} className="create-box-img">
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
                        <div className="dashboard-left flex">Giá </div>
                        <div className="dashboard-right">
                            <input type="number" name="Price" placeholder="Nhập giá" onChange={handleOnChange} required></input>
                        </div>
                    </div>
                    {/* <div className="create-box-row flex">
                        <div className="dashboard-left flex">Sale off </div>
                        <div className="dashboard-right flex-center">
                            <input type="number" placeholder="%" style={{ width: "100px"}} onChange={handleOnChange} name="sale" required></input>
                            <label>From: </label>
                            <input type="date"  name="fromdate" onChange={handleOnChange} placeholder="dd/mm/yyyy" pattern="(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)"/>
                            <label>To: </label>
                            <input type="date"  name="todate" onChange={handleOnChange} placeholder="dd/mm/yyyy" pattern="(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)"/>
                        </div>
                    </div> */}
                    {/* <div className="create-box-row flex">
                        <div className="dashboard-left flex">Category group</div>
                        <div className="dashboard-right flex-center">
                            <select style={{ width: "350px"}} 
                                onChange={(event) => {setProductGroupCate(event.target.value)}}
                                value={productGroupCate}
                            >
                                { productGroupCateList.length > 0 &&
                                    productGroupCateList.map((item, index) => {
                                        return(
                                            <option key={index}>{item.productGroupCate}</option>
                                        )
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
                    {/* <div className="create-box-row flex">
                        <div className="dashboard-left flex">Category </div>
                        <div className="dashboard-right flex-center">
                            <select style={{ width: "350px"}} 
                                onChange={(event) => {setCateValue(event.target.value)}}
                                value={cateValue}>
                                <option></option>
                                { cate.length > 0 &&
                                    cate.map((item, index) => {
                                        return(
                                            <option key={index}>{item.cateName}</option>
                                        )
                                    })
                                }
                            </select>
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
                    </div> */}
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Giới tính </div>
                        <div className="dashboard-right flex">
                            <select style={{ width: "200px"}} 
                                onChange={(event) => {setSex(event.target.value)}}
                                value={sex}
                                required>
                                <option></option>
                                <option value='629ef31f85deb3c935243765'>Nam</option>
                                    <option value='629ef31c85deb3c935243763'>Nữ</option>
                            </select>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Size and stock</div>
                        <div className="dashboard-right flex">
                            {
                                ['S','M','L'].map(size=>{
                                    return <div className='d-flex justify-content-center align-items-center'> 
                                        <strong>{size}</strong>
                                        <input type='number'  name={size} onChange={(e)=>handleOnChange(e,true)}/>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Mô tả </div>
                        <div className="dashboard-right">
                            <input type="text" name="Desc" onChange={handleOnChange} required></input>
                        </div>
                    </div>

                    <div className="flex-center" style={{marginTop: '40px'}}>
                    <button className="create-box-btn btn" type='submit'>
                        Thêm
                    </button>
                </div>
                </form>
            </div>
        </div>
    )
}