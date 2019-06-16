
export class EmailBody {


  getUserOrderFeedbackEmailTemplateCode(order_item:string, order_desc:string, order_price:string, order_text:string):string {
    return `<html>
    <head>
      <style type='text/css'>
        @media screen {
          @font-face {
            font-family: 'Fira Sans';
            font-style: normal;
            font-weight: 400;
            src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v8/va9E4kDNxMZdWfMOD5Vvl4jLazX3dA.woff2) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          @font-face {
            font-family: 'Fira Sans';
            font-style: normal;
            font-weight: 400;
            src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v8/va9E4kDNxMZdWfMOD5Vvk4jLazX3dGTP.woff2) format('woff2');
            unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
          }
          @font-face {
            font-family: 'Fira Sans';
            font-style: normal;
            font-weight: 500;
            src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnZKveRhf6Xl7Glw.woff2) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          @font-face {
            font-family: 'Fira Sans';
            font-style: normal;
            font-weight: 500;
            src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnZKveQhf6Xl7Gl3LX.woff2) format('woff2');
            unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
          }
          @font-face {
            font-family: 'Fira Sans';
            font-style: normal;
            font-weight: 700;
            src: local('Fira Sans Bold'), local('FiraSans-Bold'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnLK3eRhf6Xl7Glw.woff2) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          @font-face {
            font-family: 'Fira Sans';
            font-style: normal;
            font-weight: 700;
            src: local('Fira Sans Bold'), local('FiraSans-Bold'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnLK3eQhf6Xl7Gl3LX.woff2) format('woff2');
            unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
          }
          @font-face {
            font-family: 'Fira Sans';
            font-style: normal;
            font-weight: 800;
            src: local('Fira Sans ExtraBold'), local('FiraSans-ExtraBold'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnMK7eRhf6Xl7Glw.woff2) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          @font-face {
            font-family: 'Fira Sans';
            font-style: normal;
            font-weight: 800;
            src: local('Fira Sans ExtraBold'), local('FiraSans-ExtraBold'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnMK7eQhf6Xl7Gl3LX.woff2) format('woff2');
            unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
          }
        }
    
        #outlook a {
          padding: 0;
        }
    
        .ReadMsgBody,
        .ExternalClass {
          width: 100%;
        }
    
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass td,
        .ExternalClass div,
        .ExternalClass span,
        .ExternalClass font {
          line-height: 100%;
        }
    
        div[style*='margin: 14px 0'],
        div[style*='margin: 16px 0'] {
          margin: 0 !important;
        }
    
        table,
        td {
          mso-table-lspace: 0;
          mso-table-rspace: 0;
        }
    
        table,
        tr,
        td {
          border-collapse: collapse;
        }
    
        body,
        td,
        th,
        p,
        div,
        li,
        a,
        span {
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          mso-line-height-rule: exactly;
        }
    
        img {
          border: 0;
          outline: none;
          line-height: 100%;
          text-decoration: none;
          -ms-interpolation-mode: bicubic;
        }
    
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: none !important;
        }
    
        body {
          margin: 0;
          padding: 0;
          width: 100% !important;
          -webkit-font-smoothing: antialiased;
        }
    
        .pc-gmail-fix {
          display: none;
          display: none !important;
        }
    
        @media screen and (min-width: 621px) {
          .pc-email-container {
            width: 620px !important;
          }
        }
    
        @media screen and (max-width:620px) {
          .pc-sm-p-30-20 {
            padding: 30px 20px !important
          }
          .pc-sm-fs-30 {
            font-size: 30px !important
          }
          .pc-sm-fs-18 {
            font-size: 18px !important
          }
        }
    
        @media screen and (max-width:525px) {
          .pc-xs-p-25-10 {
            padding: 25px 10px !important
          }
          .pc-xs-fs-16 {
            font-size: 16px !important
          }
          .pc-xs-br-disabled br {
            display: none !important
          }
        }
      </style>
      <!--[if mso]>
        <style type='text/css'>
            .pc-fb-font {
                font-family: Helvetica, Arial, sans-serif !important;
            }
        </style>
        <![endif]-->
      <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
    </head>
    <body style='width: 100% !important; margin: 0; padding: 0; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;' class=''>
      <span style='color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;'>Thanks for your order</span>
      <table class='pc-email-body' width='100%' bgcolor='#f4f4f4' border='0' cellpadding='0' cellspacing='0' role='presentation' style='background-color: #f4f4f4; table-layout: fixed;'>
        <tbody>
          <tr>
            <td class='pc-email-body-inner' align='center' valign='top'>
              <!--[if gte mso 9]>
                <v:background xmlns:v='urn:schemas-microsoft-com:vml' fill='t'>
                    <v:fill type='tile' src='' color='#f4f4f4'/>
                </v:background>
                <![endif]-->
              <!--[if (gte mso 9)|(IE)]><table width='620' align='center' border='0' cellspacing='0' cellpadding='0' role='presentation'><tr><td width='620' align='center' valign='top'><![endif]-->
              <table class='pc-email-container' width='100%' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='margin: 0 auto; max-width: 620px;'>
                <tbody>
                  <tr>
                    <td align='left' valign='top' style='padding: 0 10px;'>
                      <table width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation'>
                        <tbody>
                          <tr>
                            <td height='20' style='font-size: 1px; line-height: 1px;'>&nbsp;</td>
                          </tr>
                        </tbody>
                      </table>
                      <!-- BEGIN MODULE: Transactional 1 -->
                      <table border='0' cellpadding='0' cellspacing='0' role='presentation' width='100%'>
                        <tbody>
                          <tr>
                            <td class='pc-sm-p-30-20 pc-xs-p-25-10' style='padding: 40px 30px; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);' bgcolor='#ffffff' valign='top'>
                              <table width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation'>
                                <tbody>
                                  <tr>
                                    <td class='pc-sm-fs-30 pc-fb-font' style='font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 46px; letter-spacing: -0.6px; color: #151515; padding: 0 10px;' valign='top'>Thanks for your order!</td>
                                  </tr>
                                  <tr>
                                    <td height='15' style='line-height: 1px; font-size: 1px;'>&nbsp;</td>
                                  </tr>
                                </tbody>
                                <tbody>
                                  <tr>
                                    <td class='pc-sm-fs-18 pc-xs-fs-16 pc-fb-font' style='font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 20px; line-height: 30px; letter-spacing: -0.2px; color: #9B9B9B; padding: 0 10px' valign='top'>${order_text}</td>
                                  </tr>
                                  <tr>
                                    <td height='25' style='line-height: 1px; font-size: 1px;'>&nbsp;</td>
                                  </tr>
                                </tbody>
                                <tbody>
                                  <tr>
                                    <td style='padding: 5px 10px;' valign='top'>
                                      <table border='0' cellpadding='0' cellspacing='0' role='presentation'>
                                        <tbody>
                                          <tr>
                                            <td style='text-align: center; border-radius: 8px; padding: 14px 19px; background-color: #1595E7;' bgcolor='#1595E7' valign='top' align='center'>
                                              <a class='pc-fb-font' href='https://officekitchen.ng/user-profile' style='text-decoration: none; line-height: 24px; letter-spacing: -0.2px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 500; color: #ffffff; word-break: break-word; display: block;'>View your account</a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                                <tbody>
                                  <tr>
                                    <td height='25' style='line-height: 1px; font-size: 1px;'>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td style='padding: 0 10px;' valign='top'>
                                      <table border='0' cellpadding='0' cellspacing='0' role='presentation' width='100%'>
                                        <tbody>
                                          <tr>
                                            <th class='pc-fb-font' style='letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; padding: 10px 10px 10px 0; border-bottom: 1px solid #E5E5E5; width: 400px; color: #151515;' align='left'>
                                              Item
                                            </th>
                                            <th class='pc-fb-font' style='letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; padding: 10px 10px 10px 0; border-bottom: 1px solid #E5E5E5; width: 44px; color: #151515;' align='right'>
                                              Qty
                                            </th>
                                            <th class='pc-fb-font' style='letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5; padding: 10px 0; width: 56px; color: #151515;' align='right'>
                                              Price
                                            </th>
                                          </tr>
                                        </tbody>
                                        <tbody>
                                          <tr>
                                            <td style='padding: 20px 10px 20px 0; font-size: 16px; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; border-bottom: 1px solid #E5E5E5;' valign='top'>
                                              <table border='0' cellpadding='0' cellspacing='0' role='presentation' width='100%'>
                                                <tbody>
                                                  <tr>
                                                    <td valign='top'>
                                                      <!--[if (gte mso 9)|(IE)]><table role='presentation' cellspacing='0' cellpadding='0' border='0' width='400'><tr><td width='120' valign='top'><![endif]-->
                                                      <div style='display: inline-block; max-width: 120px; vertical-align: top;'>
                                                        <table border='0' cellpadding='0' cellspacing='0' role='presentation' width='100%'>
                                                          <tbody>
                                                            <tr>
                                                              <td style='padding: 0 20px 0 0;' valign='top'>
                                                                <img class='pc-fb-font' src='https://officekitchen.ng/assets/img/theme/team-4-800x800.jpg' width='100' alt='' style='border: 0; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; display: block;' height=''>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </div>
                                                      <!--[if (gte mso 9)|(IE)]></td><td width='280' valign='top'><![endif]-->
                                                      <div style='display: inline-block; max-width: 280px; vertical-align: top;'>
                                                        <table border='0' cellpadding='0' cellspacing='0' role='presentation' width='100%'>
                                                          <tbody>
                                                            <tr>
                                                              <td style='padding: 9px 0 0;' valign='top'>
                                                                <table border='0' cellpadding='0' cellspacing='0' role='presentation' width='100%'>
                                                                  <tbody>
                                                                    <tr>
                                                                      <td class='pc-fb-font' style='font-family: 'Fira Sans', Helvetica, Arial, sans-serif; letter-spacing: -0.3px; line-height: 28px; font-weight: 500; font-size: 18px; color: #151515; padding: 0 0 4px 0;' valign='top'>
                                                                        ${order_item}
                                                                      </td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td height='4' style='font-size: 1px; line-height: 1px;'>&nbsp;</td>
                                                                    </tr>
                                                                  </tbody>
                                                                  <tbody>
                                                                    <tr>
                                                                      <td class='pc-fb-font' style='font-family: 'Fira Sans', Helvetica, Arial, sans-serif; letter-spacing: -0.2px; line-height: 24px; font-size: 16px; color: #9B9B9B;;' valign='top'>
                                                                        ${order_desc}
                                                                      </td>
                                                                    </tr>
                                                                  </tbody>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </div>
                                                      <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                            <td class='pc-fb-font' style='padding: 29px 10px 20px 0; color: #9B9B9B; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;' valign='top' align='right'>
                                              1
                                            </td>
                                            <td class='pc-fb-font' style='padding: 29px 0 20px; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5; color: #151515;' valign='top' align='right'>
                                              ${order_price}
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <!-- END MODULE: Transactional 1 -->
                      <table width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation'>
                        <tbody>
                          <tr>
                            <td height='20' style='font-size: 1px; line-height: 1px;'>&nbsp;</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Fix for Gmail on iOS -->
      <div class='pc-gmail-fix' style='white-space: nowrap; font: 15px courier; line-height: 0;'>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
    </body>
    </html>`;
  }

}