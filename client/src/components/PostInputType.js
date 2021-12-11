import '../App.css';
import React, { useState, useEffect } from 'react';
import {RiDeleteBin2Line} from 'react-icons/ri';

function PostInputType({ inputTypes, setInputTypes, index, deleteInputType }) {

  const [numOfOptions, setNumOfOptions] = useState(0);
  const [selectOptions, setSelectOptions] = useState([]);

  const translateTagName = (tageName) => {
    if (tageName === 'select') {
      return 'בחירה מתוך אפשרויות';
    }
    if (tageName === 'input') {
      return 'טקסט קצר';
    }
    if (tageName === 'textarea') {
      return 'טקסט ארוך';
    }
  }

  useEffect(() => {
    const newInputArr = [...inputTypes];
    if (selectOptions.length) {
      newInputArr[index] = { ...inputTypes[index], options: selectOptions }
    }
    setInputTypes(newInputArr);
  }, [selectOptions])

  const changeOptionsHandler = optionsIndex => event => {
    const optionArr = [...selectOptions]
    optionArr[optionsIndex] = event.target.value
    setSelectOptions(optionArr);
  }

  const changeHandler = name => event => {
    if (name === 'numOfOptions') {
      setNumOfOptions(event.target.value);
      event.target.value > selectOptions.length ? selectOptions.push("") : selectOptions.pop();
      return;
    }
    const newInputArr = [...inputTypes];
    newInputArr[index] = { ...inputTypes[index], [name]: event.target.value }
    setInputTypes(newInputArr);
  }

  return (
    <div dir='rtl' className='input-type'>
      <div onClick={()=>deleteInputType(index)} className="delete-input">
        <RiDeleteBin2Line color='rgb(156, 156, 156)' size='30px'/>
      </div>
      <h3>  קלט למשתמש:</h3>

      <label htmlFor="titlename">שם  </label>
      <input required autoComplete="off" type="text" id="titlename" name="titlename" onChange={changeHandler('label')} value={inputTypes[index].label} />

      <label htmlFor="posttype"> סוג </label>
      <input readOnly type="text" id="posttype" name="posttype" value={translateTagName(inputTypes[index].tag)} />

      {inputTypes[index].tag === 'input' ? <>
        <label dir='rtl' htmlFor="postlength"> מספר תווים מקסימלי </label>
        <input required autoComplete="off" type="text" id="postlength" name="postlength" onChange={changeHandler('length')} value={inputTypes[index].length} />
      </> : <></>}
      {inputTypes[index].tag === 'textarea' ? <>
        <label dir='rtl' htmlFor="postlength"> מספר שורות </label>
        <input required autoComplete="off" type="text" id="postlength" name="postlength" onChange={changeHandler('rows')} value={inputTypes[index].rows} />
      </> : <></>}
      {inputTypes[index].tag === 'select' ? <>
        <label dir='rtl' htmlFor="postlength"> מספר אפשרויות </label>
        <input required min="0" max="10" autoComplete="off" type="number" id="numOfOptions" name="numOfOptions" onChange={changeHandler('numOfOptions')} value={numOfOptions} />
        {numOfOptions ? <>
          האפשרויות אשר יופיעו למתשמש:

          {selectOptions.map((value, optionsIndex) => {
            return <input className='selectOption' type="text" onChange={changeOptionsHandler(optionsIndex)} value={selectOptions[optionsIndex]} key={optionsIndex} />
          })}
        </> : <></>}
      </> : <></>}
    </div>
  );
}

export default PostInputType;
