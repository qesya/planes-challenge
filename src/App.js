import React, { useState } from "react"
import "./styles.css"
import { Stack } from "./components/Stack/Stack"
import styled from "@emotion/styled"
import { stuntman } from './utils/data';
import { CloseIcon } from "../src/assets/icons/CloseIcon";
import { CheckedIcon } from "../src//assets/icons/CheckedIcon";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
  `;

const StuntManCard = styled(Stack)`
    background: #fff;
    flex: 1;
    margin-bottom: 120px;
  `

const WrapperButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  margin: 0 auto;
  bottom: 140px;
  left: 0;
  right: 0;
`;

const ButtonClose = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 100px;
  cursor: pointer;
`;

const ButtonChecked = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: 1px solid green;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const EndList = styled.p`
  font-size: 22px;
  font-weight: 700;
`;

export default function App() {
  const [status, setStatus] = useState(undefined);
  const [data, setData] = useState(stuntman);

  const pop = (array) => {
    return array.filter((_, index) => {
      return index < array.length - 1
    })
  }

  const onSwipe = (item, vote) => {
    const newStack = pop(data);
    setData(newStack);
    setStatus(vote)
  }

  const onClickButton = (direction) => {
    if (direction === 'left') {
      setTimeout(() => {
        const newStack = pop(data);
        setData(newStack);
        setStatus(false)
      }, 500)
      toast.error("Disliked");
    } else {
      setTimeout(() => {
        const newStack = pop(data);
        setData(newStack);
        setStatus(false)
      }, 500)
      toast.success(`Liked`);
    }
  }

  return (
    <div className="App">
      <Container>
        {
          data.length > 0 ?
            (
              <>
                <StuntManCard onVote={(item, vote) => onSwipe(item, vote)} data={data} />
                <WrapperButton>
                  <ButtonClose onClick={() => onClickButton('left')}>
                    <CloseIcon width="24px" height="24px" />
                  </ButtonClose>
                  <ButtonChecked onClick={() => onClickButton('right')}>
                    <CheckedIcon width="24px" height="24px" />
                  </ButtonChecked>
                </WrapperButton>
              </>
            )
            : <EndList>end of list</EndList>
        }
        <ToastContainer
          position="bottom-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Container>
    </div >
  )
};
