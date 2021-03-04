import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  .header {
    background-color: #fff;

    .header-top {
      height: 60px;
      line-height: 60px;
      padding: 0 20px;
      text-align: right;

      a {
        margin-left: 20px;
      }
    }

    .breadcrumb {
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      border-top: 1px solid #ddd;

      .breadcrumb-title {
        text-align: center;
      }

      .weather {
        text-align: right;
      }
    }
  }
`