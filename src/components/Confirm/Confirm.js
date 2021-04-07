import React, {useEffect} from 'react';
import styles from './confirmStyle.module.css';

export default function Confirm(props) {

    useEffect(()=>{
        document.body.style.overflow = "hidden";
        return()=>{
            document.body.style.overflow = "auto";
        }
    }, [])  

  return (
      <div className={styles.bigContainer}>
          <div className={styles.confirmModul} onClick={props.onRemoveCancel}></div>
          <div className={styles.confirmWindow}>
              <span onClick={props.onRemoveCancel}>X</span>
              <h6> Are you sure?</h6>
              <p>Do you really want to remove this person? This process cannot be undone.</p>
              <div>
                  <button onClick={props.onRemoveConfirm}>Delete</button>
                  <button onClick={props.onRemoveCancel}>Cancel</button>
              </div>
          </div>
      </div>
  );
}