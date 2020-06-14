import styled from 'styled-components'

export const Wrapper = styled.div`
    background-color: ${({ theme }) => theme.backgroundColors.main};
    color: ${({ theme }) => theme.colors.main};
    flex-grow: 1;
`
