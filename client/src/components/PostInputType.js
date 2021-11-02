import '../App.css';
import React, { useState } from 'react';

function PostInputType({inputTypes, setInputTypes, key}) {

  const [values, setValues] = useState({
    titleName: '',
    postType: '',
    postlength: '',
  })

  const submitHandler = async (e) => {
    // e.preventDefault();
  }

  const changeHandler = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  return (
    <div dir='rtl' className='input-type'>
        <h3>  קלט למשתמש:</h3>
      <label htmlFor="titlename">שם  </label>
      <input autoComplete="off" type="text" id="titlename" name="titlename" onChange={changeHandler('titleName')} value={values.titleName} />

      <label htmlFor="posttype">סוג </label>
      <input readOnly type="text" id="posttype" name="posttype" onChange={changeHandler('postType')} value={values.postType} />

      <label htmlFor="postlength">אורך הפוסט</label>
      <input autoComplete="off" type="text" id="postlength" name="postlength" onChange={changeHandler('postLength')} value={values.postLength} />

    </div>
  );
}

export default PostInputType;
