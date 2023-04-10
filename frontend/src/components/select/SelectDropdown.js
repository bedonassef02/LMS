import React, { useState } from "react";
import "./SelectDropdown.css";

const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" }
];

const SelectDropdown = () => {
    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Selected option: ${selectedOption}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="select-container">
                <select value={selectedOption} onChange={handleOptionChange}>
                    <option value="">Select an option</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

        </form>
    );
};

export default SelectDropdown;