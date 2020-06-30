import styled from 'styled-components'

const Wrapper = styled.div`
    background-color: ${({ theme }) => theme.backgroundColors.main};
    color: ${({ theme }) => theme.colors.main};
    flex-grow: 1;
`

export default Wrapper
