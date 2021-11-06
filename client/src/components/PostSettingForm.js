import '../App.css';
import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import PostInputType from './PostInputType';

function PostSettingForm() {

    const [inputTypes, setInputTypes] = useState([])

    const [showOptions, setShowOptions] = useState(false)

    const submitHandler = async (e) => {
        console.log(inputTypes);
        e.preventDefault();
    }
    const deleteInputType = (index) => {
        if (window.confirm('האם אתה בטוח שאתה רוצה למחוק את סוג הקלט?')) {
            console.log('sds',index)
            setInputTypes( inputTypes.filter((item,i) => i !== index));
          }
    }

    const addInputType = name => {
        if (name === 'input') {
            setInputTypes([...inputTypes, { label: '', tag: name, length: '' }]);
        } else if (name === 'textarea') {
            setInputTypes([...inputTypes, { label: '', tag: name, rows: '', cols: '50' }]);
        } else {
            setInputTypes([...inputTypes, { label: '', tag: name, options: [] }]);
        }
        setShowOptions(!showOptions);
    }

    return (
        <div className='post-settings'>
            <h2 style={{ textAlign: 'center' }}> הגדרות העלאת פוסט</h2>
            <h4 style={{ textAlign: 'center' }}>  :בחר את סוגי הקלט שיופיעו למשתמש בעת יצירת פוסט</h4>

            {/* {values.error ? <h3>{values.error}</h3> : <></>} */}

            <form dir='rtl' onSubmit={e => submitHandler(e)}>
                <div className="react-icon" onClick={() => setShowOptions(!showOptions)}>
                    <AiOutlinePlus color='white' size='50px' />
                </div>
                {showOptions ? <ul className="input-options">
                    <li className="input-option" onClick={() => addInputType('input')}>טקסט קצר</li>
                    <li className="input-option" onClick={() => addInputType('textarea')}>טקסט ארוך</li>
                    <li className="input-option" onClick={() => addInputType('select')}>בחירה מתוך אפשרויות</li>
                </ul> : <></>}

                {inputTypes.map((inputType, index) => <PostInputType inputTypes={inputTypes} setInputTypes={setInputTypes} index={index} deleteInputType={deleteInputType} key={index} />)}

                {inputTypes.length ? <input type="submit" value="שמור"></input> : <></>}

            </form>
        </div>
    );
}

export default PostSettingForm;
