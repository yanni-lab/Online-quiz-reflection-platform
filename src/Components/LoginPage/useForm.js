import {useState} from 'react';
const useForm = () => {
    const [values,setValues] = useState({
        username: '',
        password: ''
    })
    const [errors,setErrors] = useState({})
    const handleChange = e =>{
        const {name, value} = e.target
        setValues({
            ...values,
            [name]:value
        })
    }

    const handleSubmit = e => {

    };

    return {handleChange,handleSubmit,values,errors};
};

export default useForm