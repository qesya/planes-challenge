import React, { useRef, useEffect, useState } from "react"
import { motion, useMotionValue, useAnimation } from "framer-motion"
import styled from "@emotion/styled"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledCard = styled(motion.div)`
  position: absolute;
`

const Item = styled.div`
    background: #f9fafb;
    width: 200px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 80px;
    padding: 10px;
    text-shadow: 0 10px 10px #d1d5db;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
  `;

const Image = styled.img`
    width: inherit;
    height: 250px;
    object-fit: cover;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  `;

const Title = styled.p`
    font-size: 16px;
  `;

const Position = styled.p`
  width: inherit;
  background-color: #ffffff !important;
  padding: 10px;
  font-size: 20px;
`;

export const Card = ({ children, style, onVote, id, position, name, image, ...props }) => {
  // motion stuff
  const cardElem = useRef(null)

  const x = useMotionValue(0)
  const controls = useAnimation()

  const [constrained, setConstrained] = useState(true)

  const [direction, setDirection] = useState()

  const [velocity, setVelocity] = useState()

  const getVote = (childNode, parentNode) => {
    const childRect = childNode.getBoundingClientRect()
    const parentRect = parentNode.getBoundingClientRect()
    let result =
      parentRect.left >= childRect.right
        ? false
        : parentRect.right <= childRect.left
          ? true
          : undefined
    return result
  }

  const getDirection = () => {
    return velocity >= 1 ? "right" : velocity <= -1 ? "left" : undefined
  }

  const getTrajectory = () => {
    setVelocity(x.getVelocity())
    setDirection(getDirection())
  }

  const flyAway = (min) => {
    const flyAwayDistance = (direction) => {
      const parentWidth = cardElem.current.parentNode.getBoundingClientRect()
        .width
      const childWidth = cardElem.current.getBoundingClientRect().width

      direction === 'right' && (parentWidth / 2 + childWidth / 2) ?
        toast.success('Liked') :
        toast.error('Disliked');

      return direction === "left"
        ? -parentWidth / 2 - childWidth / 2
        : parentWidth / 2 + childWidth / 2
    }

    if (direction && Math.abs(velocity) > min) {
      setConstrained(false)
      controls.start({
        x: flyAwayDistance(direction)
      })
    }


  }

  useEffect(() => {
    const unsubscribeX = x.onChange(() => {
      const childNode = cardElem.current
      const parentNode = cardElem.current.parentNode
      const result = getVote(childNode, parentNode)
      result !== undefined && onVote(result)
    })

    return () => unsubscribeX()
  })

  return (
    <StyledCard
      animate={controls}
      dragConstraints={constrained && { left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={1}
      ref={cardElem}
      style={{ x }}
      onDrag={getTrajectory}
      onDragEnd={() => flyAway(500)}
      whileTap={{ scale: 1.1 }}
      {...props}
    >
      <div>
        <Position>
          Position: {position}</Position>
        <Item>
          <Image src={image} />
          <Title>{name}</Title>
        </Item>
      </div>
    </StyledCard>
  )
}
