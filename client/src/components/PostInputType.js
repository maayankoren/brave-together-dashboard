import '../App.css';
import React, { useState, useEffect } from 'react';
import {RiDeleteBin2Line} from 'react-icons/ri';

function PostInputType({ inputTypes, setInputTypes, index, deleteInputType }) {

  const [checkboxesNumOfOptions, setCheckboxesNumOfOptions] = useState(0);
  const [checkboxesOptions, setCheckboxesOptions] = useState([]);
  
  const [selectNumOfOptions, setSelectNumOfOptions] = useState(0);
  const [selectOptions, setSelectOptions] = useState([]);

  const translateTagName = (tageName) => {
    if (tageName === 'select') {
      return 'בחירה יחידה מתוך אפשרויות';
    }
    if (tageName === 'checkboxes') {
      return 'בחירה מרובה מתוך אפשרויות';
    }
    if (tageName === 'input') {
      return 'טקסט קצר';
    }
    if (tageName === 'textarea') {
      return 'טקסט ארוך';
    }
  }

  useEffect(() => {
    console.log(checkboxesNumOfOptions)
    const newInputArr = [...inputTypes];
    if (selectOptions.length) {
      newInputArr[index] = { ...inputTypes[index], options: selectOptions }
    }
    if (checkboxesOptions.length) {
      newInputArr[index] = { ...inputTypes[index], options: checkboxesOptions }
    }
    setInputTypes(newInputArr);
  }, [selectOptions, checkboxesOptions])

  const changeSelectOptionsHandler = selectOptionsIndex => event => {
    const selectOptionArr = [...selectOptions]
    selectOptionArr[selectOptionsIndex] = event.target.value
    setSelectOptions(selectOptionArr);
  }

  const changeCheckboxesOptionsHandler = checkboxesOptionsIndex => event => {
    const checkboxesOptionArr = [...checkboxesOptions]
    checkboxesOptionArr[checkboxesOptionsIndex] = event.target.value
    setCheckboxesOptions(checkboxesOptionArr);
  }

  const changeHandler = name => event => {
    if (name === 'selectNumOfOptions') {
      setSelectNumOfOptions(event.target.value);
      while(event.target.value < selectOptions.length){
        selectOptions.pop();
      }
      while(event.target.value > selectOptions.length){
        selectOptions.push("");
      }
      return;
    }
    if (name === 'checkboxesNumOfOptions') {
      setCheckboxesNumOfOptions(event.target.value);
      while(event.target.value < checkboxesOptions.length){
        checkboxesOptions.pop();
      }
      while(event.target.value > checkboxesOptions.length){
        checkboxesOptions.push("");
      }
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
        <input required autoComplete="off" min="0" type="number" id="postlength" name="postlength" onChange={changeHandler('length')} value={inputTypes[index].length} />
      </> : <></>}
      {inputTypes[index].tag === 'textarea' ? <>
        <label dir='rtl' htmlFor="numOfRows"> מספר שורות </label>
        <input required autoComplete="off" min="0" type="number" id="numOfRows" name="numOfRows" onChange={changeHandler('rows')} value={inputTypes[index].rows} />
      </> : <></>}
      {inputTypes[index].tag === 'select' ? <>
        <label dir='rtl' htmlFor="selectNumOfOptions"> מספר אפשרויות </label>
        <input required min="0" max="10" autoComplete="off" type="number" id="selectNumOfOptions" name="selectNumOfOptions" onChange={changeHandler('selectNumOfOptions')} value={selectNumOfOptions} />
        {selectNumOfOptions ? <>
          האפשרויות אשר יופיעו למתשמש:

          {selectOptions.map((value, selectOptionsIndex) => {
            return <input className='selectOption' type="text" onChange={changeSelectOptionsHandler(selectOptionsIndex)} value={selectOptions[selectOptionsIndex]} key={selectOptionsIndex} />
          })}
        </> : <></>}
      </> : <></>}

      {inputTypes[index].tag === 'checkboxes' ? <>
        <label dir='rtl' htmlFor="checkboxesNumOfOptions"> מספר אפשרויות </label>
        <input required min="0" max="10" autoComplete="off" type="number" id="checkboxesNumOfOptions" name="checkboxesNumOfOptions" onChange={changeHandler('checkboxesNumOfOptions')} value={checkboxesNumOfOptions} />
        {checkboxesNumOfOptions ? <>
          האפשרויות אשר יופיעו למתשמש:

          {checkboxesOptions.map((value, checkboxesOptionsIndex) => {
            return <input className='selectOption' type="text" onChange={changeCheckboxesOptionsHandler(checkboxesOptionsIndex)} value={checkboxesOptions[checkboxesOptionsIndex]} key={checkboxesOptionsIndex} />
          })}
        </> : <></>}
      </> : <></>}

    </div>
  );
}

export default PostInputType;
