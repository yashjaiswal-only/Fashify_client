import styled from "styled-components"

const Container=styled.div`
    height:18px;
    background-color:teal;
    color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:15px;
    font-weight:bold;
    margin-top:3.5rem;
`
const Announcement = () => {
  return (
    <Container>
        Super deal ! Free Shipping on order above $50
    </Container>
  )
}

export default Announcement
