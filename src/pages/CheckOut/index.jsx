import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import styles from '../Login/login.module.css'
import style from './checkout.module.css'
import FormController from '../../components/formConteoller/formController'
import CheckoutCart from '../../components/checkoutCart/CheckoutCart'
import axios from 'axios'
import { useMutation } from 'react-query'
import toast from 'react-hot-toast'
import {loadStripe} from '@stripe/stripe-js';
const Checkout = () => {
    // shippingAddress: {
    //     details: String,
    //     phone: String,
    //     city: String,
    //     postalCode: String,
    //   },
    const [cartId, setCartId] = useState(0);
    const [products , setProducts]= useState([])

    const handleCartId = (id) => {
        setCartId(id);
    };
    const handleCartProducts =(products)=>{
        setProducts(products)
    }

    const egyptGovernorates = [
        { key: "choose your governorate", value: "" },
        { key: "Cairo", value: "Cairo" },
        { key: "Alexandria", value: "Alexandria" },
        { key: "Giza", value: "Giza" },
        { key: "Qalyubia", value: "Qalyubia" },
        { key: "Dakahlia", value: "Dakahlia" },
        { key: "Sharqia", value: "Sharqia" },
        { key: "Gharbia", value: "Gharbia" },
        { key: "Monufia", value: "Monufia" },
        { key: "Beheira", value: "Beheira" },
        { key: "Kafr El Sheikh", value: "Kafr El Sheikh" },
        { key: "Damietta", value: "Damietta" },
        { key: "Port Said", value: "Port Said" },
        { key: "Ismailia", value: "Ismailia" },
        { key: "Suez", value: "Suez" },
        { key: "South Sinai", value: "South Sinai" },
        { key: "North Sinai", value: "North Sinai" },
        { key: "Faiyum", value: "Faiyum" },
        { key: "Beni Suef", value: "Beni Suef" },
        { key: "Minya", value: "Minya" },
        { key: "Asyut", value: "Asyut" },
        { key: "Sohag", value: "Sohag" },
        { key: "Qena", value: "Qena" },
        { key: "Luxor", value: "Luxor" },
        { key: "Aswan", value: "Aswan" },
        { key: "Red Sea", value: "Red Sea" },
        { key: "New Valley", value: "New Valley" },
        { key: "Matrouh", value: "Matrouh" },
    ];
    const [shippingCost, setShippingCost] = useState(0);
    const handleCityChange = (value) => {
        switch (value) {
            case 'Cairo':
                setShippingCost(100);

                break;
            case 'Alexandria':
                setShippingCost(120);
                break;
            case 'Giza':
                setShippingCost(110);
                break;
            case 'Qalyubia':
                setShippingCost(130);
                break;
            case 'Dakahlia':
                setShippingCost(140);
                break;
            case 'Sharqia':
                setShippingCost(115);
                break;
            case 'Gharbia':
                setShippingCost(125);
                break;
            case 'Monufia':
                setShippingCost(135);
                break;
            case 'Beheira':
                setShippingCost(150);
                break;
            case 'Kafr El Sheikh':
                setShippingCost(145);
                break;
            case 'Damietta':
                setShippingCost(160);
                break;
            case 'Port Said':
                setShippingCost(165);
                break;
            case 'Ismailia':
                setShippingCost(170);
                break;
            case 'Suez':
                setShippingCost(175);
                break;
            case 'South Sinai':
                setShippingCost(200);
                break;
            case 'North Sinai':
                setShippingCost(190);
                break;
            case 'Faiyum':
                setShippingCost(155);
                break;
            case 'Beni Suef':
                setShippingCost(145);
                break;
            case 'Minya':
                setShippingCost(180);
                break;
            case 'Asyut':
                setShippingCost(185);
                break;
            case 'Sohag':
                setShippingCost(195);
                break;
            case 'Qena':
                setShippingCost(175);
                break;
            case 'Luxor':
                setShippingCost(210);
                break;
            case 'Aswan':
                setShippingCost(220);
                break;
            case 'Red Sea':
                setShippingCost(230);
                break;
            case 'New Valley':
                setShippingCost(240);
                break;
            case 'Matrouh':
                setShippingCost(250);
                break;
            default:
                setShippingCost(0); // Default cost when no city is selected or when governorate is not recognized
                break;
        }
    };
    const paymentMethodTypeOption = [
        { key: 'bank', value: 'card' },
        { key: 'cash on delivery', value: 'cash' },
    ]
    const initialValues = {
        shippingAddress: {
            details: "",
            phone: "",
            city: "",
            postalCode: "",
        },
        shippingPrice:"",
        copon: '',
        paymentMethodType:''
    }
    const validationSchema = Yup.object({
        shippingAddress: Yup.object({
            details: Yup.string().required("Required").min(10, "invalidValue"),
            phone: Yup.string().required("Required").matches(/^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}?\)?)[-.\s]?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})$/, 'Invalid phone number'),
            city: Yup.string().required("Required"),
            postalCode: Yup.number().required("Required").min(10000, ' Zip code must be 5 number')
                .max(99999, ' Zip code must be 5 number'),
        }),
        paymentMethodType:Yup.string().required("Required"),

    })
    const onSubmit = (values) => {
        const updatedValue={...values,
            shippingPrice:shippingCost
        }
        if(values.paymentMethodType === 'cash' || !values.paymentMethodType){
            mutation.mutate(updatedValue)
            console.log(updatedValue)
        }
        if(values.paymentMethodType=== 'card'){
            cardMutation.mutate(products)
        }
    }
    const handlecheckoutWithCash=async(data)=>{
        const respone = await axios.post(`http://localhost:3000/api/v1/orders/${cartId}`,data,{
            withCredentials: true,
        })
        return respone.data
    }
    const mutation = useMutation(handlecheckoutWithCash,{
        onSuccess:()=>{
            toast.success('your order is under processing')
        },
        onError:()=>{
            toast.error('something went wrong')
        }
    })
    // const cardPayment = async()=>{
    //     const stripe = await loadStripe('pk_test_51Q2apNRtt1tTdQQg9PbuS24EiGLRAV4z2eiCASEaT0ndTU0QTnijANIdr2R0Vv9mVfy9SGhNtP61h1DmQPLIvcim000xtDAbr2');
    // }
    console.log(products,"checkoutP")
    // {
    //     "shipping_price":100,
    //     "line_items":[
    //          {
    //       "title": "Product 1",
    //       "description": "This is a cool product",
    //       "price": 100, // $20.00
    //       "quantity": 1,
    //       "imageCover":"https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
    //     },
    //     {
    //       "title": "Product 2",
    //       "description": "Another cool product",
    //       "price": 100, // $15.00
    //       "quantity": 1,
    //       "imageCover":"https://burst.shopifycdn.com/photos/wrist-watches.jpg?width=1000&format=pjpg&exif=0&iptc=0"
    //     }
    //     ]
    // }
    
    // console.log(bodydata,"bodydata")
    const handlecheckoutWithCard = async(products)=>{
        // const body = { products };
        const bodydata ={
            shipping_price:shippingCost,
            line_items:products.map((product)=>({
                title:product.product.title,
                description:product.product.description,
                price: product.price,
                quantity:product.quantity,
                imageCover:product.product.imageCover
    
            }))
        } 
        const response = await axios.post(`http://localhost:3000/api/v1/orders/checkout-session/${cartId}`,bodydata,{
            withCredentials: true,
            headers:{
                "Content-Type": "application/json"
            }
        
        })
        console.log(response)
        return response.data
    }
    const cardMutation = useMutation(handlecheckoutWithCard,{
        onSuccess:async(res)=>{
        const stripe = await loadStripe('pk_test_51Q2apNRtt1tTdQQg9PbuS24EiGLRAV4z2eiCASEaT0ndTU0QTnijANIdr2R0Vv9mVfy9SGhNtP61h1DmQPLIvcim000xtDAbr2');
        const result =await stripe.redirectToCheckout({ sessionId: res.session.id});
            toast.success('your order is under processing')
        },
        onError:(err)=>{
            // console.log(err)
            toast.error('something went wrong')
        }
    })
    // const cards= async()=>{
    //     const stripe = await loadStripe('pk_test_51Q2apNRtt1tTdQQg9PbuS24EiGLRAV4z2eiCASEaT0ndTU0QTnijANIdr2R0Vv9mVfy9SGhNtP61h1DmQPLIvcim000xtDAbr2');
    //     const body={
    //         products:products
    //     }
    //     const headers={
    //         "Content-Type": "application/json"
    //     }
    //     const response = await fetch('http://localhost:3000/webhook-checkout',{
    //         method:'POST',
    //         body: JSON.stringify(body),
    //         headers:headers
    //     })
    //     const session = await response.json();
    //     const result = stripe.redirectToCheckout({
    //         sessionId: session.id
    //     })
    // }
    //applay copon
    const applayCopon = async(copon)=>{
        
        const response = await axios.put(`http://localhost:3000/api/v1/cart/applyCoupon`,copon,{
            withCredentials: true,
        })
        return response.data;
    }
    const coponMutation = useMutation(applayCopon,{
        onSuccess:(res)=>{
            console.log(res.data,"cooooooooo")
            toast.success('your coupon is applied successfully')
        },
        onError:()=>{
            toast.error('something went wrong')
        }
    })
    const handleApplayCopon =(copon)=>{
        let data = {coupon:copon}
        coponMutation.mutate(data)
    }

    // 

    return (
        <div className={` ${style.checkout}`}>
            <h3>billing details</h3>
            <div>
                
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {
                        formik => {
                            return (
                                <Form className={style.checkOutContainer}>
                                    <div>
                                        <div>
                                            <label htmlFor="details">Address Details</label>
                                            <FormController
                                                control="input"
                                                type="text"
                                                id="details"
                                                divStyle={styles.formControl}
                                                name="shippingAddress.details"
                                                className={styles.input}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone">Phone</label>
                                            <FormController
                                                control="input"
                                                type="text"
                                                id="phone"
                                                divStyle={styles.formControl}
                                                name="shippingAddress.phone"
                                                className={styles.input}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="city">City</label>
                                            <FormController
                                                control="select"
                                                id="city"
                                                options={egyptGovernorates}
                                                name="shippingAddress.city"
                                                selectClass={styles.select}
                                                optionClass={styles.option}
                                                divStyle={styles.formControl}
                                                onChange={(e) => {
                                                    handleCityChange(e.target.value);
                                                    formik.setFieldValue("shippingAddress.city", e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="postalCode">Postal Code</label>
                                            <FormController
                                                control="input"
                                                type="text"
                                                id="postalCode"
                                                divStyle={styles.formControl}
                                                name="shippingAddress.postalCode"
                                                className={styles.input}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <CheckoutCart shippingCost={shippingCost} img={require('../../assets/pr11.png')} onCartIdChange={handleCartId} order={false} cartProduct={handleCartProducts}/>
                                        <div>
                                            <FormController
                                                control='radio'
                                                options={paymentMethodTypeOption}
                                                name='paymentMethodType'
                                            />
                                        </div>
                                        <div className={style.copon}>
                                            <FormController
                                                control="input"
                                                type="text"
                                                id="copon"
                                                divStyle={styles.formControl}
                                                name="copon"
                                                placeholder="copon"
                                                className={styles.input}
                                                
                                            />
                                            <button type='button' className={styles.submit} onClick={()=>handleApplayCopon(formik.values.copon)}>applay copon {formik.values.copon}</button>
                                        </div>

                                        <button type="submit" className={styles.submit}>checkout</button>
                                    </div>
                                </Form>
                            )
                        }
                    }
                </Formik>
            </div>


        </div>
    )
}

export default Checkout
