export default function handleInputChange (e, formData, setFormData) {
    const { name, value } = e.target;
    
    const updatedFormData = {
        ...formData,
        [name] : value
    }

    setFormData(updatedFormData)
};