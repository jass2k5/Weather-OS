import React from 'react';


export const DayNightSwitch = ({ checked, onChange }) => {
  return (
    <div className="dayNightToggleWrapper">
      <input 
        className="input" 
        id="dayNightSwitch" 
        type="checkbox" 
        checked={checked}
        onChange={onChange}
      />
      <label className="toggle" htmlFor="dayNightSwitch">
        <span className="toggle__handler">
          <span className="crater crater--1" />
          <span className="crater crater--2" />
          <span className="crater crater--3" />
        </span>
        <span className="star star--1" />
        <span className="star star--2" />
        <span className="star star--3" />
        <span className="star star--4" />
        <span className="star star--5" />
        <span className="star star--6" />
      </label>
    </div>
  );
};