import React, { useState } from 'react'
interface TooltipProps {
  text: string
  children: React.ReactElement
}
const Tooltip = ({ text, children }: TooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false)

  const handleMouseEnter = () => {
    setShowTooltip(true)
    console.log('handleMouseEnter')
  }

  const handleMouseLeave = () => {
    setShowTooltip(false)
  }

  return (
    <div>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </div>
      {showTooltip && <div>{text}</div>}
    </div>
  )
}

export default Tooltip
