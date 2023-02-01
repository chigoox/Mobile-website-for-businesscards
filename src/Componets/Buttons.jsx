import React from 'react'

export default function Buttons(prop) {
  const textCenter = "w-[55%] mx-auto mt-4 "
  const ThinWhiteBorder = "border-1 border-gray-100"



  if (prop.size == 1){
    return (
        <button id={prop.id} onClick={prop.clicked} className={`${prop.center ? textCenter:""} ${prop.ThinWhiteBorder ? ThinWhiteBorder:""} font-bold hover:bg-[color:var(--buttonHover)] hover:text-white border-2 bg-[color:var(--ButtonColor)] border-[color:var(--AccentColor)] h-10 w-36 rounded-lg text-[color:var(--TextColor)]`}>
            <h3>{prop.text}</h3>
        </button>
      )

  }else{
    return (
        <button id={prop.id} onClick={prop.clicked} className={`${prop.center ? textCenter:""} ${prop.ThinWhiteBorder ? ThinWhiteBorder:""} font-bold hover:text-white hover:bg-[color:var(--buttonHover)] border-2 bg-[color:var(--ButtonColor)] border-[color:var(--AccentColor)] h-12 w-60 m-1 rounded-lg text-[color:var(--TextColor)]`}>
            <h3>{prop.text}</h3>
        </button>
    )
  }
        


    
}
