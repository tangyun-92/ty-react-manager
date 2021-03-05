import styled from 'styled-components'

export const SiderWrapper = styled.div`
  min-height: calc(100vh - 60px);
  overflow-y: scroll;

  .logo {
    height: 62px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);

    img {
      height: 35px;
    }

    h1 {
      color: #fff;
      font-size: 20px;
      display: inline-block;
      margin-left: 10px;
      font-weight: normal;
    }
  }
`
