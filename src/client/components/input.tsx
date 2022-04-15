import React, { useCallback, useState } from 'react'
export const useInputString = initialValue => {
    const [value, setValue] = useState(initialValue);
    return {
      value,
      setValue,
      reset: () => setValue(''),
      bind: {
        value,
        onChange: event => {
          setValue(event.target.value);
        }
      }
    };
  };
  export const useInputChecked = initialValue => {
    const [value, setValue] = useState(initialValue);
  
    return {
      value,
      setValue,
      reset: () => setValue(false),
      bind: {
        value,
        onChange: event => {
          setValue(event.target.checked);
        }
      }
    };
  };

  export const useToggle = initialValue => {
    const [value, setValue] = useState(initialValue)
     const toggle = useCallback(()=>{
       setValue(v=>!v)
      },[])
    return [value,toggle]
  }