import React from 'react'
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
const ContactPage =  () => {
    const navigate = useNavigate()
    const baseUrl = process.env.REACT_APP_API_URL;

    const submitContact = async(e)=>{
        e.preventDefault()
        let Name = e.target.name.value
        let Mail = e.target.email.value
        let Subject = e.target.subject.value
        let Desc = e.target.message.value
        if (!Name || ! Mail || !Subject || !Desc){
            Swal.fire({
                title: "Lỗi",
                text: "Vui lòng nhập đầy đủ thông tin",
                icon: "warning",
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.close()
                }
              });
            return;
        }
        // đăng ký tài khoản 

        const body ={
            Mail:Mail,
            Desc:Desc,
            Name:Name,
            Subject:Subject,
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };

        let resp = await fetch(baseUrl+'/contact/createNewContact',requestOptions)
        .then(response=>{
            return response.json()
        })        
        .then(res=>{
                Swal.fire({
                    title: "Thành công",
                    text: "Feaer đã nhận được liên hệ từ bạn, Feaer sẽ trả lời sớm nhất có thể.",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.close()
                      navigate('/')
                    }
                  });
                  return
            })
            .catch(err=>console.log('err'))
    }
    return <>
        {/*Section: Contact v.2*/}
        <section className="mb-4 mx-auto mt-2 px-5">
            {/*Section heading*/}
            <h2 className="h1-responsive font-weight-bold text-center my-4">Contact us</h2>
            {/*Section description*/}
            <p className="text-center w-responsive mx-auto mb-5 px-5">Nếu bạn có bất cứ câu hỏi nào về chúng tôi, hoặc về sản phẩm, hoặc bạn cần hỗ trợ, đừng ngần ngại liên hệ nhé.</p>
            <div className="row">
                {/*Grid column*/}
                <div className="col-md-9 mb-md-0 mb-5">
                    <form id="contact-form" name="contact-form" onSubmit={submitContact}>
                        {/*Grid row*/}
                        <div className="row">
                            {/*Grid column*/}
                            <div className="col-md-6">
                                <div className="md-form mb-0">
                                    <label htmlFor="name" className>Họ Tên:</label>
                                    <input type="text" id="name" name="name" className="form-control" />
                                </div>
                            </div>
                            {/*Grid column*/}
                            {/*Grid column*/}
                            <div className="col-md-6">
                                <div className="md-form mb-0">
                                    <label htmlFor="email" className>Email liên hệ:</label>
                                    <input type="text" id="email" name="email" className="form-control" />
                                </div>
                            </div>
                            {/*Grid column*/}
                        </div>
                        {/*Grid row*/}
                        {/*Grid row*/}
                        <div className="row">
                            <div className="col-md-12">
                                <div className="md-form mb-0">
                                    <label htmlFor="subject" className>Tiêu đề:</label>
                                    <input type="text" id="subject" name="subject" className="form-control" />
                                </div>
                            </div>
                        </div>
                        {/*Grid row*/}
                        {/*Grid row*/}
                        <div className="row">
                            {/*Grid column*/}
                            <div className="col-md-12">
                                <div className="md-form">
                                    <label htmlFor="message">Vấn đề bạn muốn hỏi là:</label>
                                    <textarea type="text" id="message" name="message" rows={2} className="form-control md-textarea" defaultValue={""} />
                                </div>
                            </div>
                        </div>
                        {/*Grid row*/}
                    </form>
                    <div className="w-100 text-center text-md-left">
                        <button className="btn btn-info text-light float-right" type='submit' form='contact-form'>Gửi cho Feaer</button>
                    </div>
                    <div className="status" />
                </div>
                {/*Grid column*/}
                {/*Grid column*/}
                <div className="col-md-3 text-center">
                    <ul className="list-unstyled mb-0">
                        <li><i className="fas fa-map-marker-alt fa-2x" />
                            <p>368 Quận... TPHCM</p>
                        </li>
                        <li><i className="fas fa-phone mt-4 fa-2x" />
                            <p>+ 01 234 567 89</p>
                        </li>
                        <li><i className="fas fa-envelope mt-4 fa-2x" />
                            <p>contact@feaer.com</p>
                        </li>
                    </ul>
                </div>
                {/*Grid column*/}
            </div>
        </section>
        {/*Section: Contact v.2*/}

    </>
}

export default ContactPage