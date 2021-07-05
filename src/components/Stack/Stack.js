import React from "react"
import styled from "@emotion/styled"
import { Card } from "../Card/Card"

const Frame = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`

export const Stack = ({ onVote, children, data, ...props }) => {
  const handleVote = (item, vote) => {
    onVote(item, vote)
  }

  return (
    <>
      <Frame {...props}>
        {data.map((item, index) => {
          let isTop = index === data.length - 1
          return (
            <Card
              drag={isTop}
              key={item.key || index}
              onVote={(result) => handleVote(item, result)}
              position={item.position}
              name={item.name}
              image={item.image}
            >
              {item}
            </Card>
          )
        })}
      </Frame>
    </>
  )
}
