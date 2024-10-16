import React, { useEffect, useState } from 'react'
import style from './updarePrpfile.module.css'
import styles from '../../pages/Login/login.module.css'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import FormController from '../formConteoller/formController'
import userImage from '../../assets/p1.jpg'
import defaultImage from '../../assets/profile.webp'
import Cookies from 'js-cookie';

import { useSelector } from 'react-redux'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useMutation, useQuery } from 'react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const UpdateProfile = () => {
    // const userData = useSelector((state) => state.user.userData);
    const userC = Cookies.get('userId')
    const logwith = Cookies.get('logedWith')
    console.log(userC,"mgkfm")

    const [profilePicture, setProfilePicture] = useState(defaultImage);
    const [profilePictureUpdated, setProfilePictureUpdated] = useState(profilePicture);
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
    const Country = [
        { key: "choose your governorate", value: "" },
        { key: "Egypt", value: "Egypt" },
    ]
    const getUser = async () => {
        const response = await axios.get("http://localhost:3000/api/v1/users/getMe", {
            withCredentials: true
        }
        )
        return response.data
    }
    const [userDataFetch, setUserDataFetch] = useState(null);
    const navigate = useNavigate()
     useQuery('get-user', getUser, {
        onSuccess: (res) => {
            setUserDataFetch(res.data)
            console.log(res.data)
            if (res.data.profilePicture) {
                setProfilePicture(res.data.profilePicture)
            }
            console.log(res.data)
        },
        // onError: (err) => {
        //     navigate("/login")
        //     toast.error("Please Login First ")
        // }
    });

 

    



    const initialValues = userDataFetch ? {
        username: userDataFetch.username || '',
        email: userDataFetch.email || '',
        phone: userDataFetch.phone || '',
        profilePicture: "",
        addresses: [
            {
                country: 'Egypt', 
                city: userDataFetch.addresses[0]?.city || '',
                street: userDataFetch.addresses[0]?.street || '',
                zipcode: userDataFetch.addresses[0]?.zipcode || ''
            }
        ]
    } : {
        username: '',
        email: '',
        phone: '',
        profilePicture: "",
        addresses: [
            {
                country: 'Egypt',
                city: '',
                street: '',
                zipcode: ''
            }
        ]
    };
    const validationSchema = Yup.object({
        username: Yup.string(),
        email: Yup.string().email('invalid email'),
        phone: Yup.string().matches(/^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}?\)?)[-.\s]?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})$/, 'Invalid phone number'),
        profilePicture: Yup.mixed(),
        addresses: Yup.array()
            .of(
                Yup.object({
                    country: Yup.string(),
                    city: Yup.string(),
                    street: Yup.string(),
                    zipcode: Yup.number()
                        .typeError('Invalid ZIP code , Zip code must be 5 number')
                        .positive('Invalid ZIP code')
                        .integer('Invalid ZIP code')
                        .min(10000, ' Zip code must be 5 number')
                        .max(99999, ' Zip code must be 5 number')
                })
            )
            .min(1, 'At least one address is required'),
    })
    const updateUserData = async (updatedUser) => {
        const response = await axios.put("http://localhost:3000/api/v1/users/updateMe", updatedUser, {
            withCredentials: true,
        })
        return response.data

    }
    const mutation = useMutation(updateUserData, {
        onSuccess: (res) => {
            
            toast.success("Profile updated successfully!");
            console.log("res updated successfully", res.data.profilePicture)
        },
        onError: (error) => {
            
            toast.error("There is something wrong , pleaseTry again")
            console.error("Error updating profile:", error);
        }
    });

    const onSubmit = (values) => {
        // run with new fun
        // const {addresses,...updatedValue}=values
        // const updatedValues = {
         
        //     ...values,
        //     address: values.addresses[0],
        //     profilePicture: profilePictureUpdated // Set profilePicture to the local state
        // };
        const updatedValues = {
            ...values,
            
            profilePicture: profilePictureUpdated  // Set profilePicture to the local state
        };

        console.log(updatedValues, "updated values");
        mutation.mutate(updatedValues,{
            onSuccess:(res)=>{
                setProfilePicture(res.data.profilePicture)
                console.log(res)
            }
        });
        // mutation.mutate(values);
    };
    const handleFileChange = (event) => {
        
        const file = event.target.files[0];
        // console.log(file)
        if (file) {
            const maxSize = 1024 * 1024 * 1; // 5MB

        if (file.size > maxSize) {
            toast.error('File size exceeds 5MB limit.');
            
        }else{

            const reader = new FileReader();
            reader.onloadend = () => {
                // setProfilePicture(reader.result); // Set the uploaded image
                setProfilePictureUpdated(reader.result)
                console.log(reader.result)
            };
            // console.log(profilePicture,"prrrrrrrrr")
            reader.readAsDataURL(file); // Read the file as a data URL
        }
        }
    };


    const handleDelete = () => {
        // setProfilePicture(defaultImage); // Reset to default image
        setProfilePictureUpdated(defaultImage)

    };

    return (
        <div className={style.updateProfile}>
            <h3>hello , {userDataFetch?.username || 'user'}</h3>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize >
                {
                    Formik => {
                        return (
                            <Form className={styles.loginForm}  >
                                <div className={style.ProfileImg}>
                                    <img src={profilePicture} alt="person" />
                                    <div>
                                        <label htmlFor="profilePicture" className={style.imgBtn}>choose image</label>
                                        <FormController
                                            control="input"
                                            type="file"
                                            name="profilePicture"
                                            id="profilePicture"
                                            onChange={handleFileChange}
                                            hidden
                                        />
                                        <button type='button' onClick={handleDelete} className={style.imgBtn}><i class="fa-solid fa-trash"></i> delete</button>
                                    </div>
                                </div>
                                <FormController
                                    control="input"
                                    type="text"
                                    placeholder="Enter your updated name"
                                    divStyle={styles.formControl}
                                    name="username"
                                    className={styles.input}

                                />
                                <FormController
                                    control="input"
                                    type="email"
                                    placeholder="Enter your updated email"
                                    divStyle={styles.formControl}
                                    name="email"
                                    className={styles.input}
                                />
                                <FormController
                                    control="input"
                                    type="text"
                                    placeholder="Enter your updated phone"
                                    divStyle={styles.formControl}
                                    name="phone"
                                    className={styles.input}
                                />
                                <FormController
                                    control="select"
                                    options={Country}
                                    name="addresses[0].country"
                                    selectClass={styles.select}
                                    optionClass={styles.option}
                                    divStyle={styles.formControl}
                                />
                                <FormController
                                    control="select"
                                    options={egyptGovernorates}
                                    name="addresses[0].city"
                                    selectClass={styles.select}
                                    optionClass={styles.option}
                                    divStyle={styles.formControl}
                                />
                                <FormController
                                    control="input"
                                    type="text"
                                    placeholder="Enter your updated street"
                                    divStyle={styles.formControl}
                                    name="addresses[0].street"
                                    className={styles.input}
                                />
                                <FormController
                                    control="input"
                                    type="text"
                                    placeholder="Enter your zip code"
                                    divStyle={styles.formControl}
                                    name="addresses[0].zipcode"
                                    className={styles.input}
                                />
                                <div className={styles.submitContainer}>
                                    <button type="submit" className={styles.submit} disabled={!Formik.isValid}>update profile</button>
                                </div>
                            </Form>
                        )
                    }
                }

            </Formik>
        </div>
    )
}

export default UpdateProfile
