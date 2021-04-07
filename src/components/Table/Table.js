import React, {useState} from "react";
import {connect} from 'react-redux';
import styles from "./tableStyles.module.css"; 
import Confirm from '../Confirm/Confirm.js';
import {deletePerson, sortPerson} from '../../store/action';
import arrow from './arrowIcon.svg';
import dynamicSort from '../../helpers/sortPersons';

function Table(props){

    const [values, setValues] = useState({
        openModal: false,
        elemDelete: null,
        order: "asc",
        oldProperty: null
    })

    const toggleConfirm = () => {
        setValues({
            ...values,
            openModal: !values.openModal
        });
    };

    const deleteThisPerson = () => {
        props.deletePerson(values.elemDelete);
        setValues({
            ...values,
            openModal: false
        })
    }

    const handelDelete = (elemId)=>{
        setValues({
            ...values,
            elemDelete: elemId,
            openModal: true
        })
    }

    const person = props.persons.map((element,index) => {
        return <div key={element.id} className={styles.tableBodyElem}
            >
                <div className={styles.w6}>
                    <p>{index+1}</p>
                </div>
                <div className={styles.w25}>
                    <p>{element.fullname}</p>
                </div>
                <div className={styles.w25}>
                    <p>{element.email}</p>
                </div>
                <div className={styles.w20}>
                    <p>{element.phone}</p>
                </div>
                <div className={styles.w6}>
                    <p>{element.age}</p>
                </div>
                <div className={styles.w12}>
                    <p>{element.gender}</p>
                </div>
                <div className={styles.w6}>
                    <button onClick={()=>handelDelete(element.id)}>X</button>
                </div>
            </div>
    })

    let personsLength = props.persons.length;

    const onSort = (property)=>{
        const ordered = props.persons.sort(dynamicSort(property, values.order));
        let newVal="";
        if(values.oldProperty!==null && values.oldProperty===property){
            newVal = values.order==="asc" ? "desc" : "asc";
        }else{
            newVal = "asc";
        }

        setValues({
            order:newVal,
            oldProperty: property
        })
        props.sortPerson(ordered);
    }

    return(
        <div className={styles.tableResult}>
            <div className={styles.tableTitle}>
                <div className={styles.w6}></div>
                <div className={styles.w25}>
                    <p>Full Name</p>
                    {personsLength>=2 ? 
                        <button onClick={()=>onSort("fullname")}>
                            <img src={arrow} alt=""/>
                        </button> :
                    null}
                </div>
                <div className={styles.w25}>
                    <p>Email</p>
                    {personsLength>=2 ? 
                        <button onClick={()=>onSort("email")}>
                            <img src={arrow} alt=""/>
                        </button> : 
                    null}
                </div>
                <div className={styles.w20}>
                    <p>Phone number</p>
                    {personsLength>=2 ? 
                        <button onClick={()=>onSort("phone")}>
                            <img src={arrow} alt=""/>
                        </button> : 
                    null}
                </div>
                <div className={styles.w6}>
                    <p>Age</p>
                    {personsLength>=2 ? 
                        <button onClick={()=>onSort("age")}>
                            <img src={arrow} alt=""/>
                        </button> :
                    null}
                </div>
                <div className={styles.w12}>
                    <p>Gender</p>
                    {personsLength>=2 ? 
                        <button onClick={()=>onSort("gender")}>
                            <img src={arrow} alt=""/>
                        </button> :
                    null}
                </div>
                <div className={styles.w6}></div>
            </div>
            <div>
                {person}
            </div>
            {
                values.openModal &&               
                <Confirm
                    onRemoveConfirm={deleteThisPerson}
                    onRemoveCancel={toggleConfirm}
                /> 
            }
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        persons: state.persons
    };
};

const mapDispatchToProps = {
    deletePerson,
    sortPerson
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)