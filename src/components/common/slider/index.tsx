import React from "react";

interface ISlider {
  value?: number;
  min?: number;
  max?: number;
  handleChange: (value: any) => void;
}

const Slider = ({ value, handleChange, min = 0, max = 100 }: ISlider) => {
  return (
    <div>
      <label
        htmlFor="default-range"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Default range
      </label>
      <input
        id="default-range"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
    </div>
  );
};

export default Slider;
