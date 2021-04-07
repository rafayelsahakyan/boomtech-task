import React, {useState} from "react";
import styles from "./formStyles.module.css"; 
import "./inputDate.css"; 
import "react-phone-number-input/style.css";
import PhoneInput, {isValidPhoneNumber}  from "react-phone-number-input";
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import idGenerator from '../../helpers/idGenerator';
import countAge from '../../helpers/countAge';
import {connect} from 'react-redux';
import {addPerson} from '../../store/action';

function Form(props){

    const [values, setValues] = useState({
        name:'',
        surname:'',
        email:'',
        phone:'',
        birth:'',
        gender:'Male'
    })

    const [errors, setErrors] = useState({
        name: null,
        surname: null,
        email: null,
        phone: null,
        birth: null,
        gender: null
    })

    const handleChange = ({target:{name,value}})=>{
        setErrors({
            ...errors,
            [name]: null
        })

        setValues({
            ...values,
            [name]: value
        })
    }

    const disableSpace = (event)=>{
        if(event.charCode === 32){
            event.preventDefault();
        }
    }

    const handleSubmit = (event)=>{
        const {name, surname, email, phone, birth, gender} = values;
        let valid = true;

        let nameMessage = null;
        if(name){
            const reg = /^[A-Za-z]+$/;
            if(!reg.test(name)){
                nameMessage = 'Invalid name';
                valid = false;
            }
        }else{
            valid = false;
            nameMessage = 'First name is required';
        }

        let surnameMessage = null;
        if(surname){
            const reg = /^[A-Za-z]+$/;
            if(!reg.test(surname)){
                surnameMessage = 'Invalid surname';
                valid = false;
            }
        }else{
            valid = false;
            surnameMessage = 'Last name is required';
        }

        let emailMessage = null;
        if(email){
            const reg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
            if(!reg.test(email)){
                emailMessage = 'Invalid email';
                valid = false;
            }
        }else{
            emailMessage = 'Email is required';
            valid = false;
        }

        let phoneMessage = null;
        if(phone){
            if(isValidPhoneNumber(phone)===false){
                valid = false;
                phoneMessage = 'Invalid phone number';
            }
        }else{
            valid = false;
            phoneMessage = 'Phone number is required';
        }

        let birthMessage = null;
        if(!birth){
            valid = false;
            birthMessage = 'Birth date is required';
        }

        setErrors({
            name: nameMessage,
            surname: surnameMessage,
            email: emailMessage,
            phone: phoneMessage,
            birth: birthMessage,
        })

        if(valid){
            setValues({
                name:'',
                surname:'',
                email:'',
                phone:'',
                birth:'',
                gender:gender
            })
            const newPerson = {
                id: idGenerator(),
                name,
                surname,
                fullname:`${name} ${surname}`,
                email,
                phone,
                birth,
                age: countAge(birth),
                gender
            }
            props.addPerson(newPerson);
        }

    }

    return(
        <div className={styles.regForm}>
            <h4>Registration Form</h4>
            <p>Name</p>
            <div>
                <div>
                    <input 
                        className={styles.userName} 
                        type="text"
                        name="name"
                        value={values.name}
                        placeholder="First"
                        onKeyPress={disableSpace}
                        onChange={handleChange}
                        maxLength="15"
                    />
                    {errors.name ? <p className={styles.errors}>{errors.name}</p> : null}
                </div>
                <div>
                    <input 
                        className={styles.userName} 
                        type="text"
                        name="surname"
                        value={values.surname}
                        placeholder="Last"
                        onKeyPress={disableSpace}
                        onChange={handleChange}
                        maxLength="15"
                    />
                    {errors.surname ? <p className={styles.errors}>{errors.surname}</p> : null}
                </div>
            </div>
            

            <p>Email</p>
            <input 
                type="email" 
                name="email"
                value={values.email}
                onChange={handleChange}
                onKeyPress={disableSpace}
            />
            {errors.email ? <p className={styles.errors}>{errors.email}</p> : null}

            <p>Phone number</p>
            <PhoneInput
                className={styles.inputPhone}
                placeholder=""
                international
                name="phone"
                defaultCountry="AM"
                value={values.phone}
                onChange={phone=>{
                    setValues({...values,phone})
                    setErrors({...errors,phone: null})
                }}
            />
            {errors.phone ? <p className={styles.errors}>{errors.phone}</p> : null}

            <p>Birth date</p>
            <DatePickerComponent 
                id="datepicker" 
                value={values.birth}
                name="birth"
                max={new Date('12/31/2002')}
                format='dd-MM-yyyy' 
                start="Decade"
                placeholder='dd-mm-yyyy' 
                onChange={handleChange}
            />
            {errors.birth ? <p className={styles.errors}>{errors.birth}</p> : null}

            <p>Gender</p>
            <div onChange={handleChange} className={styles.genderInput}>
                <input type="radio" value="Male" name="gender" id="male" defaultChecked/>
                <label htmlFor="male">Male</label>
                <span className={styles.checkmark}></span>
            </div>
            <div onChange={handleChange} className={styles.genderInput}>
                <input type="radio" value="Female" name="gender" id="female" />
                <label htmlFor="female">Female</label>
                <span className={styles.checkmark}></span>
            </div>
            {errors.gender ? <p className={styles.errors}>{errors.gender}</p> : null}

            <button
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    )
}
const mapDispatchToProps = {
    addPerson
}

export default connect(null, mapDispatchToProps)(Form);