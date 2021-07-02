import React, { useState } from 'react';
import Select from 'react-select';



const SelectInput = ({options,returnValue, id, placeholder}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const handleChange = value => {
    setSelectedOption(value.value);
    returnValue(value.value, id);
  }
  return (
      <Select
        defaultValue={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder={placeholder}
      />
  );
}

export default SelectInput;
