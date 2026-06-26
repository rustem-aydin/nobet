interface Props {
  title?: string
  subtitle?: string
  description?: string
  datetitle?: string
  date?: string
  buttonTitle: string
  buttonURL: string
}
export const getEmail = (props: Props) => {
  const {
    buttonURL = process.env.PUBLIC_URL,
    buttonTitle = 'URL GİT',
    date = '21 Haziran- 23 Haziran',
    datetitle = 'Başlangıç-Bitiş Tarihi',
    description = 'Bu personel 2024 tarhinde mazeret istiyor.',
    subtitle = 'Ramazan ayı boyunca iftara özel indirim fırsatı yanınızda.',
    title = 'Değerli MSB Personeli,',
  } = props
  return `<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Yemeksepeti & MSB Fırsatı</title>
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet" />

  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      background-color: #f7f7f7;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }

    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #f7f7f7;
      padding-bottom: 40px;
    }

    .main-table {
      background-color: #ffffff;
      margin: 0 auto;
      width: 100%;
      max-width: 600px;
      border-spacing: 0;
      font-family: "Open Sans", Arial, sans-serif;
      color: #333333;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    .inner-padding {
      padding: 30px 40px;
    }

    .btn-primary:hover {
      background-color: #c2003e !important;
    }

    @media screen and (max-width: 600px) {
      .inner-padding {
        padding: 20px 20px !important;
      }

      .mobile-center {
        text-align: center !important;
      }

      .main-table {
        width: 100% !important;
        border-radius: 0 !important;
      }

      h1 {
        font-size: 22px !important;
        line-height: 28px !important;
      }
    }
  </style>

  <!-- Outlook için VML Ayarları -->
  <!--[if mso]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
</head>

<body style="margin: 0; padding: 0; background-color: #f7f7f7">
  <center class="wrapper">
    <table class="main-table" width="600" cellpadding="0" cellspacing="0" border="0" align="center"
      style="margin-top: 20px; margin-bottom: 20px">
      <tr>
        <td style=" border-bottom: 1px solid #eeeeee">
          <table width="40%" cellpadding="0" cellspacing="0" border="0">
           

        </td>
      </tr>
    </table>
    </td>
    </tr>

    <tr>
      <td bgcolor="#caf0f8" style="padding: 0px 40px; background-color: #caf0f8">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td>
              <h1 style="
                      margin: 0 0 10px 0;
                      font-family: &quot;Open Sans&quot;, Arial, sans-serif;
                      font-size: 26px;
                      line-height: 32px;
                      color: #333333;
                      font-weight: 700;
                    ">
                ${title}
              </h1>
              <p style="
                      margin: 0;
                      font-family: &quot;Open Sans&quot;, Arial, sans-serif;
                      font-size: 16px;
                      line-height: 24px;
                      color: #555555;
                    ">
                ${subtitle}
              </p>
            </td>
            <td width="40"  >
             <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAB/CAYAAAAZ82cMAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAGYktHRAAAAAAAAPlDu38AAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfqBhEFFzbQHIT6AABW6klEQVR42u29eZRk113n+Xn3rbEvuS9VWfui0mJJli3J8iIs461pgzGbp5npZtptYAZDA9MLntPQ7dPdgDE0p3t6ZsBgsxhjY4xlbIxsyZZtLS5ZUpVKtaj2qszKrFwjY494650/7nsvImsxAszSc3jnRGVWZMRb7u/e3/r9fS/8w/EPxz8cNz80gLNnzxBFEaOjY5iGgZQSAJl8YPjjGmiaBlKCFv9Vxv/E/0++nxxSSvV5QF57VinTr6dvD11/y/mH7+FG94T6qQ1/d+i99H6H3k8vPfw81x7JPV7/B5DatYOk3kam50/GILmH4ffX19d54utfJ5PN8K53fR9G+vwSoWnauCaEpd1AIOnvQw8nh+5AoqWCiKJoaKAlcuj3a+57y8zQNJG+K6UkklI9XHyDDD2Q0DQ0IRCa+p6mXSOYGwy8NjyBtK3X5prPyKF/ko/L+Fm2CFq75rtSxjJK7kONk6bJwWeSz0vQNM2TUq4iiQAlkPPnz+N5Xq7T7f73XC53ZxRFUXrh5GdykfhkIj6xEBpCCIQQ6LqBrutbXmrQbjzzkgeMoogwDAlDnzAMQUo0IdB1HcMwEJqOpqnxkVFEEAT0fQ/f8/F99R05NIvV5bShn1t/Hwzm0DrTtoox/TyoZxACw9ARQo8nXUgQhIRhQBTJdNIMhk1uec7B6bX02pqmiaWlpaPnzp//X0qlUjMVSLvdpt/vi06nM3vlypUdy8vL2LadSjy6ZrkNP5SaqRqapgZQxAOZfC5Vf+mMl+nvMoqUMBKBBD5hGCGlRNd1TNPENM0t1wyCAM/zcF0Xz/NiQYbpwwsh0s8nvyf3lbw3/EreU9/V4lW6dWUlE8O2LKx4XFzXpdfr4XkeQRCkE2t4ot14RamVHIUR27dvJwiC9W63KyzbJhVIFEVE6oRRq9WiUqkwOTGBaZkITSR/i29eSxbwkAaS6UBeO+ujeEZLKQmCQF0riiARRhgShRFSRukMlVLieR79fl99PgyVMIdn3NCksCxLDbCmoRuGWlVCbPlpGiaGqf5vmSa6oasVLQR6/Dn1GghI08SWAVUDrhRYcu/Dzx6FIWGsrsMoGkzGKFLaJFazURTRbDaT55CGYaDHK89IJRoPkK4LKpUKY+PjWKaJiGd7YheS1RCLJL6oFgshBKluPAhDgiBIBZcMauD76aqIopAwCAlioUTxOZJZH4ZhqpKu1fWJWpNSoguBiFeB0ASGaaSrwtANNft1gWVZWJaJYZhYlokQOoahowsd3dDRNLFlxWuxwCMZgYQgVCpKCB1dCCKpxkxK0mcPwmS1qGdRE3QwiYQQhGGI0DSErhMEAbZtY1nmNSskfakH1HUR35hSA8kNJDNHCC1eITJ1uKJQfUYGEPT7hPHqyGQcdF3NDCEEQeAjIkkUCXShI8KAIAjjh0tUiSAMQoQQmKZJt9PBtKzUdqkHHOj9YTWk7megMoMwIHRD+v0+lUoF01SmUakoJQDQ0v8LLX722IPTpY7v+/i+BxI8zyObzWHoBqGmBl0INWlNYRIEIZom44kcpgJhixsUr27T1AuFgpbNZtVzqCWVqJpEp4fxrCeWdJR6MMnJkwEZ1u9CF4BGEPh0ez1yuRytVgvf92NPSAla1w01QzShjLdQDoDYovuh7/bJ5XLMzM7S7nQG7nA824adtig27EqoUWrofd+n1WwSBgHr6+u0Wi3CMHEiomsmY6x6pJqYUTLTZYTrubSaLSRQq23iuq6yrZqI70NLX0qtDyaMlFG6asIwiF8huq5jO7YolUoU8vmBQIIwiPW71KQc6ET10FGszuSQDRnYj3gekYQamgb9fh+AyakphBD0ev10FqmZGc9AMeS+CiWc5KxSynRGT05MKGPu++nqGNxf7GrHOnzYfgVBgOu5dDodiqUiuq6zubmJ57pEURSrw4GtSzREFKtT9Yrw/YBOp0Ov30fKiE67TafTIQwCpIyUdoiiWAByaHWm2jUVdhhGSk0HAbqu4zgOhUKBXCyQIZUlNSmlSB42DEPl4aApgxpF6SyHIW8CGev6IPaUAhr1BiOjozi2TbFYZGlpKdXpyUDqQiCRiFgVSikJfDWAQRAoD8Z1KZWKsY61qNfrFAqF1J4YpolhxDZC0wjCEBKvK3aDe70euhBks1lKpRKXLl0im81SKOQxTYvA93EymVgVG+mkCoOQMAqJIrXK1tbWsW1LCToMWV1dBUjtrEjUfDxJRGy8hx0RtVKIHRm1QizTwnEcLMsaUlnX6LfUNY3CWL8y5NZJROwaSqncUN/38Vw1E5vNJkEYUq1WCcKQ0dFRpJR0u116vR5hGOJ5Hn4QIHQ9DjQ1wiAAjVTNBEFApVrFNE18z2N2dhbdMNA0DcMwsGybIAhSg5/cn+/76LquHIjYq6uOjKDrOpVyGdu26XQ6tNsd5br2+2q2h1GswkJc16Xb69Fud9jc3KRWqynB6ga+H5DP5+h2uzQaDVqtFq7rEsZaJrGxSNJxSlR6FMXOU+yF6bpyQEzTwjSGjPpAKAylHWSsphJVI1OboutK1ajlLen1+lRHRthZraZLX2gage9TyOd51T33EIQBvh+wtLTI4uIiMzPT2LalrhNqhGFIo9FgcnKSYrEY+/+CIAjohF127tzJzp07AXBdl9OnT1Or1RgbHUWL0z1SSnq9HoZhsGfPHqw4hkmOTDbL3XffnbrDjUaD8+fPMzExQTabjdWxwPcDri4tYdk25XI5VStRGBL4PuVyhempaXK5HE4mQ6PRYHl5Ob1vbWBOEEIjDAduuvLYZOzgJPGNiWFeI5DhfM+18YSm6elSVMsuCbCIVZHG5YsXabdazMzOoseuXRAE6Szu9Xq89NJpVldXmZubI5fLx0GbRqRH2I6D1mxy/PhxZqanmZqe3hLkJUe9Xuf555+n3W4zNTWFruvKYxECLYrQdZ35+XnW19c5dOgQ5VJJqZPYrdXiVTg/P89LL73E1NQUxWIxNbKgZm6hWGB+foH19XWmpqYwDEM5MZEWx20RrudxeX6etbU1JiYmcGxbubXxYKsJHXt+URR7YtpAbesCwzC1bDaj6YnqVTMx9nJ0oemxno+iJBWgArPEfKeqKzbOpmFQyBeoVCssLS3x/HPP0e12B6rM82h3Ohw+/AwbGxscPHiQiQkV4yQRvWGqKHhsbIzx8XHOX7jAmTNnVKAVJkINWFpa4ktf+hL9fp8dO3ZQKpXSmZU8h+M4jI2N0e12OXz4MK12G9txsC0b21avCxcu8sILLzA5Ocn09HRqh5RxV4NYLJbYsWOOIAg4e+YMQeArDRE/f7vd4amnnmJ+fp7p6Wmq1aoKMNOsALFNYSiEUMIZzn0lgWkSLxkApmkSRZGm64ZIJEUsFCE0JMqe6LqeelORjDAw0HSBqWnk83kqFZf19Q1830fKiCDwCXwf1+0TBAFzc3OUyyUMw1C6fygHZMYDW61WabVasdKUiQ+HlOD2+5imyfS0UheJ4Uxc3MS+aJpGpVJhfX0d0zTIOA66oacK2fd9SqUSIyMj6LqIV31EGBLHXWqC5vN5JsbHWV1bU9MxTuXJKMIP1GTbMTdHpVKOhaqlqRopJSI+l4wkum4gIx9ijzKxwRKpwg4RDVaIZZlxFGul1j5eH6knlagwEQeLyWzRNA2hJ96XxujoCIau02g0OH36DI1mA8MwqVQq8aAN8kuDmCOOtOP3bNtmYnwcoQlWV1a5cOEivh8wMjJCqVTakqdKvJvh+CTJzE5NTTExMYllWzQaDXzfw7Ed9uzejWVaKjsQydg7DFO3NPH6kpirUiljWiatVpsL5y/Q6/exLJtKpZLm93Shp0lUIdTzcU3uTDeMNGmqCz1Ot0RpXJKuENt20DSRCkTpbJkUCtTMSqPN4eypTNMpiaHK5XIsLi5y/MQJwjBkfX2dyclJCoU8buzHg9LHuhDx7FezVBeCKAyxLeUKvnT6NKdPn8YwDOr1Onv37KFcLuN53hbvRWgCXSjPJZlMvu+zZ89ubMvixReP8+yzzzIxMc7997+GsbExCsUC/X6PTDZDGIZqosSRehiEoKtzRFFExsmwtHSV8xcu4Ng2ruexbds2MpmMChAjGQtCpDm3JMkqZYSIvT61GkWcNlGr2w98+n0X04wGAnEcB10IbNvWTNOM3bdrUubpf2W65LaolVhdXLlyhY2NDXbu3JGqn+Wry0RSpsWv4cheSokUIKVOqIXK+ArBsRdfpNvtcsstt2AYBrVajZOnTuE4zsAJSYx9nBdKssjJxCiXK3z9ySe4fOky1WoV3w944oknOHToECMjVer1BmEQpE6IyhSINN8URRESuHDxIt1ul9tuvZVKpUK73WZ9fR1d1ykUlHMi41hIaKRBtK4LZKSDVOo+DJXqEsJX1wgC+n2XTreHbQ+tkEwmg2masdGzCIIg1ZeJJLShWgIySZMMXGZD19PXbbfdSqFQUHo4l6dYLLK+voHneam3kkTjQlezSsQpFMuy8VyXQqHA7t27sSwLKSXZbI5ms0Gz2VQTSNdJ0hJJ0UzoOjIM0wzwsWPHaLVaTE1OYts2Qtdx+33Onj2L49jYtqNigvg7yU8ttmciXrH5XI6DBw9SLBaxTJNSsUi1WmFzs56qzMTWaolQhtR5JCMEGlLqQIhhKjvn+R6yA7VajUzGGQgkm80ShiG2bWMY5jUJuqTKlZZr0hBSaGKoeqtRrlQolkrxd5RN0Q2DXC6HbTtq+WpxZB7niqRMon41sIaus237NpWSjy2fujeLcrlMLpcnSU8keas0BxUNSgCJTi6XShiGqWyilNiOc13mNVlZepI+kRGGbiCBsfExJicnVWJTqGc3DIN8Pk8+l4/T+PqWyaoJDS2U8apRqks5SCJOtQgMXcfzfDzPZ2NjnVycXIxtiE0YhliWckWJM6HJoA8XVlL7oa6mDGicble5oSAdmOEVFMY1jySvEwZBWqSSceSaGNcgDNLK4CBVH6V/G+SFwkEeKk7vJ+9HUbQlXZ+kbYaLaL1eDzN2v3Uh1GTUk/rJwIU1jEElVKX09TgPJ7Di2CNJ/UdIVZoVGlGYlG0TNRjEFUcfTYi02Fav19Mo3yCWuCY0DN3A0PXYqxo2H8P2ZFCQTnI2oYzodDqJOlezXSbV6FjFaai6u5Yk3wbRtZQSc2iGD/+Mhj6TpHQSm5ao0TSATFLmJHm2QS0cBnWatEgW32+a4hCD1Lsu9C3nTTLTSTI0maSdTod+v8fY6BiaEScV0+w4W4x8FKkVkkyOJPeXBNBDAtERYVzq1PUtLqREblFXW4/BYHW7HWq1Bo98+RgdN72bOIWgHkYTAqEn9XcVFKkK3RAAYbCsUjUjI0mYvOKcE1J5aaapXHbTNDEtVfI1DFVwMnR1nURV+L5Pv9+PS6/+FhUnh84fRBFRKNMst5SRipmQA3RKGFDMCh64bx+5rEOlUlVuezxeiec1GEvSmpCaBBpuECAh1S6pQEzTQuoRerw001p6JDGMuIwptq6O4YslRf5mq8OXv7FK05xBouN5garU2RYZxyTjmGQzFtmMRS5rkXUMMoaBZanBSyLcRCMmuTM/COm7AW3Xo9F2abX6dLoerh8gI4kQAZYJji3JZiCX1chlDbKOjm0ZmKaOLrRUDWOoV3L+IIrw/RDXDekGPt2eT6/v03d9XC/A9QI8L8D3w9jmQNiuMZvvcs/dAY4dxhVDhTgZnqxbf1eel+cltaVY1carNhWIrgvkULFfxrMgGWxdT9LmIo3UpSbRpAbawDBraGhWFjtTVF4Lbry01XL1Ag3ZjwhCn74naVkB5vBMTuObdJHEFb+BUNRASYJQeS0qgNUIIoEboM4fBfQ8iWUGmIZIV+KNzp0UofwwwvdV7cPzQ/wgIggkYQBhJJAYaqXrBpEE7CK6rbRGEkgqMEgcNROrLgYeZeKMCDFwhgbl3iGBaLFuT47Ee0lyWVIKkIOkmFrm2kAoQzpb6AaObeD5IZEXQhQSaRruwCClsaY2eOt6bXitchyYoy3giuugfNrQOYf+f/0xqM0P48PSOX0jZJyUREKg2ybCMIkQSn3CEBQoWRHq4lEUpmmXRD7DdZPE00y+axDrsKQ6lkgqKd4ndREhtCGHNzGw8f+GbkYIgW2bWx9oS611a115+OfLPrRrnYyh36O/5rmT79wUxYhS45pQTgpD7nYUKe9lqIiRDLzSFMmYaVtd5aEYT1UMh1zHNEKNEkEYac4l8SC0JJhLZ61MXWWha2QcAz8MB5Nw6BaTqPavc1yLeByATLUhHf7XP/eNDk0DQ2hIYockDiiljOJEYRyppeXlwR0q1zdK0SwDgchrVkgQpAgRz/OGcFqDQkoURWiRhqZrcZADMrUhMq7QqfRD1jFxvTBFGw4/6MsVhnaDz95orOVNfn+5h/aX/q6GqQukpseTNkJGIsaWDVzyYWCysqHhAJT3LSaNAOi7Lq7bx/VcenEtIw3YkoAOyQCZEQ1BgAYp9CjGSmUdA8tM0t0vf1BuNtB/me8Nv/+t/v6XF8Tgy4YhMA2dSDIAyd0EuZhcZWv2Q9z09AZAt6tqyplMhl6/T+AHBGGIGaMJw1hdqaTZQHXJOD0yfHFdaEoglr5lhdxs0K6p5t/wczdbXX/RYMqbnOsve55rz2EYunJmPKV+hxErmhYl0XH8IylGXWtPrkXxDwmk01GrIpfLKSBCpGrHoWXGYb9aKYYxJBRdi2vnIg2shBAYpn7TFXKtGno5A3Hd4IURyCh1MJRN0pApuG1L48KWc9xMBQ5//mb2afCmUlkaIIfq5MPZhUH4oAy5FpcvkjpS3GqQZMm1YXsSr5CeQpT3+7ium8Imfd9P0weqoqah64n7pjyFiIE3hpToQiPj6FimvsVRuUELxQ1n37V/S98LQyzN5/b9FQ7tGyeTMUHTyDuCjc0mj3/jCpfXIIoxsi9HAInJvdnKudn3DEOlULx4xidqXdkJPRVKatS1AbAvCU6T2kti4JPDAHDdflr/ToSQJvNEkOKxorhQn7h4MnbxEhsTxOnrjK1jmVuN181m4c2ENDxIDh5vvH+CV942xuRoxO5d21hdWeHq8jI75ubodCV7Z6f4w89f5vi8SSSMb3n+b6UGb/T5LfelaRiGwNDAZQA/Sm1J7PAMVoocUlvqyimYeygnltaIlEBcXNdN8VDKBVZZVj/wVWY2kkOzITZiQzeRlDx1XZCxlcrSbmBWbzT7078NxzbJm1HEaK7Dgdl1StkagoD5+XkM0yIMVbqn2+1j6D7veOMo+yd7iCjkWx3yBte70Yq40T2iganrmIaIQR/q7QQgIa8p/w6uOOScaxpCxC0baQJTCckAYiCxn6azhSYUai9UUbbv++kXE6HoeowKj0jLt6AE4tg6liGui5qvnaHpWIQBeVtjpOTgBZKNpocbaumybncjDj97hs7j32Ru+ygZx+Lggf3cfscdZLNZpqd1FhcXqVZM3nR/i85jmyw0K7HTcYMjDMnZGtWCRSRhveHSD+PB+RYTKLl3w4jtiCbUs4dRWrdRkB+JpsvUq9raCJTgf5OUjtjS1GQk0k1cXZWiDlRWNYrQoggtBogl9iTpFdE0kX4uycsIoWGbOoYxUFk3FYSUWPh8x71TfN933cr26RKuH/LCiSV+/zMnOTXfQwpBKyxy4opO6Fc5v9zBFE3OX3wCieSOO15BPp9ndmaGRrNJqeBgiy5aVETq1whESmwt4P47K3zPW29h19wImiZ48aVlfvePj3Fqvo8cskHXCiIJbHVdYOgxCh8IozDtBwnDEM3Q49YOPR2T4SMJKAd1lKGmoeER29psEwxQ4rGQkt4O2Fqdi6IwTrCplLht6bEnck1m+JoHNCOX733jNP/2f7+P3dttet01/N4ad99a4P/8317BA7fm0aKQUJjUgxJtbYy2sYO63MvZxQrPPvciCwsLdDodCsVCXPbdyWteOY0t+te4dJKc7vH2+7N8/9vGqeRbLC+dobZ2kdv2OfybH30Ft+8w0Ya6sYYAiINTaWDoQqksMdAYaeUxST9JtqguLYWVqoxCujKGGoVSgQzgPgP1E4ZhWv2L4oaaBIU4bE+IcUUJIEDXNSxTbFkhw2or/T3wuOdAjh94xwHC0MX3Q6rVEUbHxvC8gJwj+en33MXb7qtiERBGkkBq6oWOJ8u4ns7GxjrLy8v0en2KxQKFfIHX3n+A19+VISP6yCBABgEl0+c77hTcfcjBMgSNRouRkVHGJ8ZBahRzGj/83TuYLAaDtgeu9760WC2r50taNgYNRkrjDAprw9NRG9LhKeI/NepDNuS6WTwklPRLW1SXNuQKD4pISOVfm4Za0jeN02VENRvwrn+0l5FqgVqtjmma9LpdIinJ5/O02218t81P/q/38Ko7V/jy00tcXe2i6xrTYxnuPLibgr2Brit4qWkq7FcURXiex1vfsJ27btNYWtcwDYPJkQARrVGplLmyuJj2L+ayWcqVCoViiR3bA950f5WPP1LD1+yb3T26UGorzVfFiHZVohUxwiSMPdJIlQli4NxwnkAM2ZAtccjwsh5OsSdCSZo7Q01DCwM0XyRzBU1TNkTGBVshNAx9uBfxBgFX6PHqWwscOjBJGKomls3NTYQQ9Pt9rly5QrVSIZfPUa9v8Ko7yjzwqll6fZUfyzo6CwuXaDR81YkbBGxsbNBqtchmMiwuLrK6usrBA/vZNukQRj61jQ10y8I0FRCw1WohpcQtFFhZWWHP3r0Ui2Vef98c3zha48xKCDewJ0mPjK6nnTFpcjbwgyGwg8QHTDMZYoUbNuKK7LUx2o0FEh/DUWcqECEgDNGAKFRxi21bGIapGmUimZ5Yj43WtUYdQItXx2vumSSbyRBJCIIw7bYdGxvF8zyWlq6Sa2fZt39/jC50CX3V0kBY4PLleTRNo1qtIjyPXreH67qYpkk2m8UwTYqlEt1uF9/zyRdUn0ngB1iWpYAMpqmAD4bBM888w733vprZ6VEeuLvCpT+r4aFvGbREfSVQn+QIggDXVcU44bpp/6CIsWqq5cDEcRw02ybpTkswAcOemBi+oBLs9XCaIAgJ4oYc1/PodLq4rkur1Y6Re1GKGtRiCP6N9JUWr44792fZu3s8LeAUi0WKxUKcyo4wTZPJiQmuLC5y+fJlLNPAth2KxRLj4xMUikXGx8dpNhp0u11VRzcNHMfBMAwlGMOg1+uTyWSJpGR1dVWhRwx9YAtjva9pGqOjoypLoQnuvWuWHePAUDyzNTjcCpHy4yyH7/vU6414taiV23f7uH0Xt+9SrzdwXY/hvvUU9TZUXb7ugokgFJ4oot/vp52qSfPN9u3buXr1KuPj42QyGUAOYpVrTzhYeoznA95w/04KhQIbGxtMTEzGtfsY34SaXbZlc8cdd1CpVFhcWiKKQvK5PI7jkM1kmJ6aYnNzk+ePHKFQKHDollsYHR2lVqvhui6O49BoNFR/SadDu9XiwoUL3HroEFOTk4PGUaDZapHL5dA0gef5lEtZHrx3lIXPrdPjBm7wUDtfAu9JMh3NZoMdO7anayqJRcIwYGF+gUwmk6Ltk1mqMUD2GEPvb5nVURTFnUHKsPu+j+aph0ii+na7TSGfx7at1OWVEqIwKU1uXR2G7POauwrs3TWBEDrzl+cRQqeQz6ObFrbtpDWZQrGA7aqWODWz+gRhyPrGOqZlUiqX2L9/H/1+n9W1NTqdDmNjY+n9mqZJPp8n4zgUCwUymQxnzpzh2IvHyGSyzM1tp9Fo4tg2vV6PbDZLt9ulVCyyurrCfa/cxgsvNTl8OkDqxsAOJlmKuOSQVP76/T71eh0pJd/85rMEYRCP6SDOKJdLaTolgQfFPkEKmTISQ4V2jRGWqnlf13X27N4dQzcHKMYwCJFRhBenWxK3ToHeBv0lA0XrcWiHzoP3z1GpVNGEYGJykna7pRr/A5EOpOd52LZNbXOTXKFALpclm82wtraGaSqVpOsG5XKFO++8k163q1gdgoBup5Pex+joCIEf0O31GB8fx3Vd2u022WwWz/PJ5bJYlk2tVkvtShiG5HJ5fN/ju79zjoWVcyw2BHIIz5wU71SqSBEVZDIZhYaHuFyh+lXM2FYZpkmxUMA0jaGu50Qo11QMk4G+Vu1rmkaz2eQbhw9vAUkbhsGhW25JWQl8P4jRKXFvXyQJo6HzRCHTpYB3vmUnc9unaMZsETMzM7TbbUZHR2k0GimO14opLBzHod1scuTI86yv15iZmea2226Lm0w9dD1DLpej0+lQKpfY3FRNoYlOX1tbxzJNvvToY+zZs4tt27aTy+VS9Lwez/xbDh2i2WxSLBbpdLvk83nW19fZsa3Cu948y29/ZpGWb6aukYwGuKuEhUHXFS5ZCC09f+I4JGjHlBEDLbXT6dhr1xj1uPaedvhompZ6BsO2xfd9ms0mUTxwyYyIohDDUF2sYTCIVpGQET3uORiwsnSWrzz+NVZWVtB1Hdftp0FYAhQLk8ZNIfBclyeefIrf/8RT/NkXT1MoFMlmM5gxRUYQBBiGMuZC6LTbbcIoStsqNjc3eewrT/DnX17go7/3Bc6fP0u71aLX6w0Afr0uQqjees/zkFHE1aUlisUiT3/jGSZHPF5/ZwaDIB0nBXuVMeDBSAcwCALa7TaWaaZOwvr6uuojdByazSbdTjetn6TCENfUQ7SkWDIUsCRNNblcjlw2lyIOw0CpgNXVVXzfj4WgQBGq50HhqIIw0YoSooinv3mZbqfOvXeNcccdt8W2SKnEJLmp6tPK1V5YmOfTDz/GM0eXWdycwNB8Tp+5wqFbDqSxRMKjUioVWVtbp1goUG80VEO+ZdPrdThzoU7g3E5TdvnkZ46wd0eGB+5/JUGggjjX9Qj8AClVf302k6HVbqNp8OLJZT7xmdNki+MIqgweJ1bJmmqL1oQy2q7bJwpDDh06hGkpcHin08GyTDY36ywvL5PNZrGDMJ0QWgwwT0zCkMoaqJhrmXJSnRdFaLGeT3SxZVnp8lM97eCncE9VJuuTwwt2Ylt1cnk1qxLvrVAoxK6zAkt3u12OHTvGM8++xDPHBeu9GaSZxQtcHn/qMnfcfpE9e3bHM0ypJtV+MLA9SULv1OklltZzRFaZUFRZ88uEl64gxPPs3DGtuoODANfz0IWg0+moGMYwcD2PQmmUdbdItJkDfdDLqGCtaoZbtpWCxf1+n1KxiNB1Hn74YWZmZti2bZYvf+VxkDAzMx2Pl4rqk0k/3Lk2WCHD1Ss5KKL4vk+v1yPw/QEsbaiXL1E1QRhiGjJFGgbhEP5K05G6gy108jlFu5S4ioowwFdcJ2HIiRPH+fwXT3LsnMAzRogsR11Xdzh3pc2Fi1fZvXtX3MZm0O/3CcMI27ZVhlWoTrAw8Dl/qUHLrxLZhirzWkU2g508c3KRRmuB7dtn0TQd3/eQQL/XIwpDHMeh02kzWs2gGyGhYW+poUSRJIzUmNmWCvSSOpIEms0mL730ErquUywW6LTb7Ny5k9HR0RTPFgQqxjFNk3wul5qGgZcVD3TicSW+c6fToVQqMT09lfaOGDG10UunTrG5uZm2wemWymkFQUQYDRCBCdrQsXwyjo2hG6lLnXhynudx+vRp/uRPn+HkfIW+WUEKY8s5xkZLHDiwG9Mw43KoThAv/0wmozqh4smSzeXYs2uGI5cCvAQRj0ZgZIm0HVxcWeRPPvtV7n/1QWZmZpSjEAT4MTtPrbZBtZLFMep4CcB6yIZEoRY7BnpKPJMkGC3L4u6770773/fu3Uu1WsWLiQqyQ60R2WyW0bGxrUwOwyF8krcC8Dwfy7K45ZaDZLO5FFtkmha2bdPv95mbm8M0DPq9XgrQDoYQ6qlKlCF5xyeTsUHT8FxFPtbtdmNb4HPs+AVOXC7SluUtwkhcm4wTkc85mKYVk9ioglI2m1VdVrmcAiEYBoZhMjqSR8dDSwM5dUuRbtJimoX1MTbrrZSbK9EIhmEQBCHlokMpJ6/DlUaJypIJYc/g7wmTxHc8+CB79uwhm1XdVyMjI9Trdfq9HkGg7KVpmhQKeaanppgYHx9aIWLAwCOGVojveZTKJfp9ly984Qv4vp+2v8Wt1FQbDVbX1jAMPTV2np+oLJkOhI5PuRCSz+dUOiZWV51OB8dxWFpa5JtHl+jJMWTc8bTlkBJLj+k+4p4OPyajcRybKJLkclnqm5uYloUW+BQKeQxjFYIY/LxFKBbdYIxzFy5SrbzI7OwshUIhNewAlqUzXhUsNAIQVrpUw1ASCqWe/SBIke+2bdNoNHjkkUe21kZQq1nRVOlp/US1bGcolkqpiTAGc+f6BpjEVoBi5nEcJ/WrQWKaqhlTMdsotoIwknh+SBBGg4klJZZwqZZ0yuUKvufh+T5C0+h2OghN49nnz3Nm3iDS7RtmXTQkGUdPbY/Qddr1etqGF/g+tpNNObUs06JYzOGYIIMhuQ79DESes1ccvN4zfNd3VSiXVIevbSkN4Hl9psdNjl70CUjaxdXqCCJF0+e5ngoSY3uAlHi+nxrspAPLtm0yTgbDNFL1pusGpmWRyThbBZJwDaZF9zinb5omvV6fSqXKW97yFtrt9oB9RwguXbrE9u3buXTpEv0YzxWGEa4fEgTRUKk2opTx2LljgpHqCJ1uN41zEtTk8npIV26tgw+n7QURYyNZlbENAizbptvtks/n0HVBGKoJVC6XqdfrOI5NqZCnVDC42o1Auz4nFQkDV5sCvY7rummKqBunUur1TSbHbByjQ0fmUtxwGEoCTc3+Xr+niHOSvsZ4QtuWNWBoSEByKMYjwxw0mBop0edQCTflwYrth5KsMjjtdptz584xOjrKvn372L17F7t372Jubg4hBMePH1e1jLgoE4YRfTfECwY2REQ+sxM6e3fvIIyiNOmX5MuarSbtrocUW1XV8O8ZI2TnbE5RKoUh8/Pziq3OyaTG1fd9kJK1tTV8z6dQzLF/ZwEhBxSB18JIpTABlQHW4jir3W7HK8RnfDTPaCEEqehFiOGjQRz89nt91fcY5/gMw2B8fJzNzc04E+ynvCwqEO2lz56MfdIjP7AhQwZdi1kIdF3Htm0KhQKXLl3i9OnTg5kbz4IE7ZjL5YAkVR/R7Yd4fhj3sIOBSzHb4xuHv0mz1eL+++7Ftu00b9Vut+n1g+taAIYTeo4VkM1orK+vs7R0lRdfPMV3fMfrMC2TyFVYKAi5eOkSR44eY2Z6kn379lItCQxcPKwtNmQgdI0wIs1uJ4CPtbU1Tpx4iXzeYbTksFAPCOO2Kz8IkTEJjeu5W8g+bdsmn8+xurbGoVtvpV6vc+XKFe655x4WFhZSVzmB52ox+kTbqrLiQBDVMarH/eaR0MjlcipQ6vfxYqhQAgKz4qSZokpVnoMfhrR7Pq47qE2jCZ45uoHbrXFov4NhKDc3k8ngeR6tVptuP4zFd4MVIiWOFbFjxwzNZpvHv3aEeiPgTbpi+DEMg8D30XSdIJCcu9DB95e4/bbb2LF9ElM/hzd0zq24YoEfijhyVyRoQtdZW1ul0dJ47Il5MoUpNDFKkpP1g4hIU4FyGAz4uoabNzsxJaGUkna7nSJQfN+PUyfhILk4dE9bVkjiXcXMQBBpaAzS2UkycYDBGjSdJGCIwI9otj36bpDKwxc5Qv0A+eJVJsY9MhmV6i4UCgRBQKPRpO9y0yYZGUU4ZoSMAo4dP8czL7jMzRRoNOqsrq4qhoh4hYZRxNK6Ta3pc8vBiziZIqYIkYEckLFtEbqOFyhVpaEC3Xw+RxgEbN8+y3PnqrS1MpEwUyl6fohAYqVey4BwU9M0HMcZkDvHalmPJ3wQBApgGA1awhPKq4FAtqgiLV0hXuTj+R69niqPDuu+hJrVMs04/6SkHgQBjbZL3x24NpEmQJiUiwY75sbI5/PUarW0ELZRa9DzK3HvtMTSwdSVJ6dpGiNVk7c9uAdNkxw7ucJau8BuWxV6ms0mq6srVCpVRkdHkFGIbpe4suFy9vwK3/nQHN/52lkef65Lxx0Eq14QEUQKpN1zLbq9noqPPA/brtJ3PWamy2SzLpuBnQKrlRcVoskIS8o4ZBh4pqZpMjU1zT/7Z/+MkZERwjBk/4EDlMrltAYy3JodhgGe56PrQ9QaycpIVFaiwqK4nLpjx44tfIkJ/emxYy8q6jtj0GUVBCGNdh/XG6gsDdAij7lph127dpLNZun1esrt7XaYX9jEi7aBFrJzLOJHvv8VbJudUDOPkEJOkMtEXLp0CaEX0M2IStmOqZ9c8vkCuZwy+I3GJqYRIIwcoTQQAv7pD97Nu9+VodHyANU8c/T4JX73M2epd3U6XoHllc2457yPaSpuxVzGYKICmysR6Hpqf3xf9U5qmsTQjdRDTfJ6y8vLWJbF2toaSdXw4sWLMQgji5Qxzi0M8D2fbreLYQwlF2+ksnRdlWzrjTqnT59GCMH27dtpNBTfyLZt2+h2u4RhSCbO+IZRRBT4tNsuYUICndgA3eW2g1PMbd+ezpROt8P58/NcWS8QOnlE6LFvOuDOWwo4jqTX69Lr9bl0YZHjx0/jen1+6F0PsWPHGo6xyeTkJJalWCh0Q7FUFwp5SpkzvO0H3sCuWY3Pfe6LjI+Pcvfdd5DP58lmsti2haPnefTxDvVOHleMcvLsMs6fP8KOue1p/BCGATtnHU6v+Ej0tDTtBxFa6CMsGTPVKe/UdBxarRaPf+VxwjirMShCRRTyBcrlsipRxMSh/X6fRqORolOu8bIGHpRuGDi2jWM7zC/Ms7q6RiaT4cUXX+Ty5ct813d9V+pLDxSzREQB/Z6LHEagRxFjZcmBfbMI3eDrX/0apVKR+fl5Tp13cY19RLqJFvrIyGd5ZZU/f+Rxbjm4B9/zeeyrL3LirI9pCrq9r3DnHTsJI4OjLxxj584dqh7ue3iex549e3nH2yRnzzzLZ44EHD5aw7HWOXv+Kg/cfzubmw0ajTb33nsXhB4gifQsG94Ozl08w/ZtMzQaDS5cuEgQ+OyeGyPzYpNOGLMQIRFhhAgCdIeYIVukWfBCPo9jO6lAEmLOUqkUVzVDIkNVW33fo9vrpflAGIpDEihKukLiCNPJOFQqFSbGx8lmMliWRbFYTFMnAzZpiWnq2HqE9DyCoZKhkD5zUwau2+YPPv45jh67xOzsjHIhZY7IzBOhgW5w6myNR774deYX2nQ6Lh//9DFeOF/CdfbTFnv40pMtzl1YpZDP0e50OHnyFCdOnOT06dM0Gw0ymQzTU5OcPFPniaMhrr2HBnv4yjcln/2zI4SR4PipJf78i09wdVWl7iNNI9JLoOdjuowuF+c7PPnU85i6y1jBQxuifBVRiIh8HEtgmfoWnK5uGFi2hW3ZaVZD13XuuOMOLMui3WmnKJ3AD+h2u2ysb7BZqw1WSMKPmPCoazGuKPQ8DF1n37696EKn0+1w++23b4HbZLNZBf7SNBzbJGNp6H0vzf1ogCVCMpbHH336KV487fHQ62apVCo4TgbdsJBB7P0Ik41OiYWlDhMTY3T7sNqZIHCqRMJAhiEz07Pccfsubj20jz17+iS0SlEUKdyTpjEzPc0bv+M+zq0vsull1KALm8urG7wxY2PZBS4uhDS9AtKO4c2aQDdMEmLObGGWk6dXeOwrz5ERkwhZIMSKI5cIopBsxsA0BsxxCWrS97yUMMd1VYe+Koa5qWuckJd1ux3W1tfIDrMBJUgPKWWkG6rOnEi80+3SarXodLtcunSJyclJpqamuHr1KkIIcnGmVdM0HNuiWLBgM4BBPYcQnWdeDOi4JTRTo1hw1M4HMmK4Y0BqAl8vcmZR0uy0MCwdK1ek6ypgwGgu4m1vmCCXMVheXqFSLjMyOqpcS8+j1WrRbrc5e/Ysc7MTfNeD0/zhFzfw0JGagZMrcPb8EpcWAxpuAWnmhmIftcLVjhAa1WqBKFPkpaUOljlol0tsIlFIpZTDMFT6I0m7GLqOUyxu6bcZzgcmlFAxkzjtVjtaW1tLKWYNIImWfSlly4hpV4UQinHZtFiuLRNFEXNziqXz0qVLCCGYnp7Gtu2068owdcZGsnDZIxKgxavc12zqcgzNgix1hBZQq23S63UR2kAVqISfRSMo014WLKz38fQcSEk1G/Hut0+zf1eWbdu3s7m5yclTp1K10O316MaZ4yQr/T99717c4AX+5CureJrGal3jC1/v48oSkZHf0mklkNimwDJVbadSckCP8I1pfBmpIhsaIm0VCJmcKKpIJnYo+kFAdXycffv2IoSOaRopoCHZ7ySTyYAckDz3+/328vKKv6WmHg+ye/vtt68ZCbxSV7pvcnKCSrUcL7WYldpTkk8Y1BKvLIoiZqZKaFxVfrsALVTN/FIz0KII25TYtkhniEYY8yEkQtEIdQspRghkhAxhqiz5x68vsWe7zm23387GxgbT09NMT0/jB0HMwa5AF0FaYKoxMlLhJ37kfoqFI3z8Cwu0+w5CnwRNcbtszSqrsm9CMVguOehai1AT6vND8RqA0EK2z1TwPE9xbsX7llxZWGB+/jK6rqBBpmXGpQwFokg4ghPvy/O8lae/8XT/LW9+88CoA/zKr/yKL6W8asaBnkpJ6BimiWlaqqsqrvB1e126vW7ak6jFRaF+v8+2mQqGHmEIRW+3tfVXkrEkhXw2hfwEobguZaKCSY0IwUxV8oNvqVDK1Dl58hTHjh1jZGQkTrsbdDudNC/W7XbJZDIEQcDMzAytVgvDELzrbXv4335wL+WcINR0ohuwSUg0/GCAj8plTQwRDhzI9L4EUgPHgpnpEt1OJ62YJiSY3VjNr6+vs3hlkfnL8ywvL5PP51V5ORywf/u+v3jh/Hk/GGYlFULw4osvEobhFdM0U+BA0ujZ6/UUxCYIME2TcqlEpVpFRhFHX3iBbFbVIXq9HhPjVUo5jZqQoBv4QTjIaUmJZUI2q+oqnU4P17fTlMlWAgTJeN7lex+qMjOh47oVypUqzZj9ulKpUC6XGRkZUbau00nxXfl8nitXrjAzM8vKygq5XI57X1Ehinbx/3zyPC1Xu66HPkKn0VaVTF3XyWUtDDEAaiR3GAoR2w+LctHkwmqXfKGQlm9f/epXc/nyZVZXV2P68q279AApe5AmNPq93pWvfe1rKoU/vELW19bwPO+KaRpRFIXxKtHwPBfbtti+fTt79+1l3759zMzOqt6/Tidtb7MtC9/zyWUMZscdtCjAsRRPbboCpMQwNGzbQkNydaVJ18+lymD4to3IY9fYOgf2jFCpjHDLLbeg6zo7d+6kEyfrjh8/Trfb5fLly3S7XWq1Gv1+P96bKqLv9tOUt+04vOqOMnftsyAKr18hmk697bC+0VATzDQQQwxJqhdeUYsQemyfLhAGCmOVUCRKKRkZqVKr1Wg2Ggo3EMTokqHwICnzIgk73e58AohIBdJsNGi3O3ietyCE3lVAhSBmANJYX9/g3LlzHD9+gna7RbPZ5PHHH+crX/lKjPRQqk25dj32766gBT0cW8ewjCGdpdgNHMehtrnJxSseHrn078OUGBoR589f4bd++/ep1TZiBEeRTCaD7Tjqp2VhGgae55HL5ajX61QqFVZWVpienuLSpUvMzMxQ39zk7Nmz/NGnPs/iwmI60FsUpRC0/SKnz63T63ZvMEVA6hqGAD3y2LerSq22jm05cQ0+iJOKEePj44yMjqq8XrNJvV6P9x6RcUCo6vZhFHVb7fbiysrKVhgQmka/30PCoqZpG7qu5z3fJ4dGLp9jfWODxcVFOp0OU1NTTE9P8+Y3v5m1tTWuXLlCEAbpFhL1RoP9e0axn1hF1yCbNWm4PsT88VGkKMOfO3qeKxtlomGIzfCyFhb1/k46587xyBcfY35+nrvuuhvP8xgfG1MI90wmRYEo6E6HXC5Ho9Fg3/79ZByHK1cWWFtd4YXjF/ji1xt05ARY13fnSlRW+syCw/NHTzA6Mqa6wmLRSU1DN3W0yKdoS7bP5qjVrjI2Np6q9iRHpzjlp1IyhnarzfzCQrppWRK5+76/UavVFvWhvUYMgJ/8yZ/kd3/3d2i12qszMzOXTMuc8zwPTVP0f+MxImJkZIRCocDhw4cByV133Y1lWZw5cwY7xuI2Gw0mpyrMjAjWPJdiPk+n4xH0FAeI68ELxy/y9JEefW0SeYPSqgQiTUc6owih89VvnOQb33yMpaUVDh06wL59+9A0jWw2k+LIHMdJO19LpRLnz53D0AVf+/phHv78UVr9HF1titAs3LRdOhImLX+CJ765yN4dXYIonyp1TRdYhsDruOyYyeGYPj2pVnuy0rLZLCdOnODYsWMUi0W1iUyxiBnDWp3JSdXpHIZkMhn6/f6lc+fOrc7MzPCbv/EbAIPmh7e/7e28973v9c6fP/8qXdfv8X2fcrmMBvS6XQrFIpZlcfTo0bS2fvXq1XQvwSRK7vW6mKZO4IW8dLlLZaSKH0b0+z4aEq8fcHnRpe6VCc1sal+ubQqVqEBR6jbCHEdqZS6cP88z33yeleVFWq1NlpeXKRULnD9/HpC4bp8zZ87S6bT59Gce5XNfOMyR400W66P0tFFCI6dKAdccW1WXSadnsLIW4MqcAl1oAjtjYugC2dnkO++fwDbbFIullEc42VtxcXERx3HI5XL4vk+tVqNWq5HL5cjn84RhSN91GR8bo7ZR+/yHPvShhz/1qU/xwgsvDKksYGH+Ck888QSu6x7J5/Oy2WxoYayKwiiiVa+zuLhIFEXs378/7lDqpZt/qd0NNDKZLI16g1sPjPL4c2eJgoDRSpZ22yXoS/qigCvzRIa+xd29WS090nSkmUPoNpFRAL/F4RfWOPz8M+QyJo88+iztdkSx9A1MA9bWA3TDYrOdpReNgZFHZvJEN1iJ2g2vp+EbJUKZQ8YOiTB0HNvA7fcYL8LObRmajQYz07MYhk6/rwz36uoqlmUxUh1RcNlkk7WEMRuFH443lJH1Rv3IRz/6UeZ2bUuvnwpkemaK1dVVpJRHSqXipoxk1XU9LMsil8uytLSE4zjMbd+OFeNnTcskk8mkLl9CCd5ut6nkTW7bneWFpRrb52YplzKsewFRpN+UyOpmPCgSCIVBZJXQzAJuOIIWunihx+ZyDzST5Y4EIhCOAi6YTjy7Yz6Wm5z3RofUNEItzv0IDSdeHd1Oi7tfPUIYtCiVStiO6tR13X6adFXVVeVdalJL0TtJzd3zVP4vCIJarVY7Uq8rEPZ1ApGoLVh7vd658fHxs7phvFqVWfNkszn27t2TBosJ0CsdSH/gk9i2RS6Xo91u8dpXb+fYx88S+BNMjxdotV3cjnvTofiLCGqU66kjjSwYWcWhy2CHUPUtkVb3vhW7z8vjyNLQLYNcxqTf61NxPF5xS4Ved5ldu3ZjGgadTpd+v0+1WuXSpUuqFMCgOTSpImraoAYyNlag3WmfOXv27PlqtbrlXlKF+qM/+qN0Oh3e+9731t1+/2nHsWm3W0RRhGGozU0cx07Lu2nLQswALXSREhvn83lc12NqIs9d+/KsraxTKdpMjBXQDHGTR/+LZ+7w32U8kyNNJ9JE/BpE4S+H5ecvYqRDF+RzNobQcFt17r19FEN0KJXKiqtdg26vi67rNJtNFhcXyeVyBGHI1atXVdIzJm5OQglQmx9sbtaf/tSnPtVodzp85Ld/+3qBAFiWxZ/+6Z/SarcfNQyz3+/16fdV+jjdrocB9FQMpepF/HddCBzbUUCzzRpvfsMehFej3e4yN12kWMxsicxvpMevHZyt9C0vX3Av59Bu+H8JmsDJWhSyFp1Ol/Gszz23V2m3W4yPj5Ns6+G6LvlcLnYsoBjDpjqdDtWREVrtttoCKgzx4nIFUvY2arXHPvjBD2INbdl0nUA8z2NjY4P19fXnwjA8qwlBs9EYgLpI+LGuZyEYLlfqhk4+X6Db7VEumTx4zwSLC0tkLJ2d26pYjgV8a7Vy7dBr6Ut9U0iJkBFCDr8vr3lxzftbg8+tpEnDd6RUVbmo0CNec4OH7p8mDOqMjIySz+XQNI0gUF1j2WyWYrHI3r176cee1mgcGG5sbKTC67supVKJZqt19sL5C89duHjxurTKFoH8+I//OO12m/e85z3LnU7nUcdxqMcpgORWB3ujD1hugiCg01X1b1fVVZQtyee5evUq3/GanYxn+1xZWmNmPM/MdBlh6N9SGMlAitBH87rgdhCBh5AhIvTQvA6630bz2oP3owDh9RBuBxG4g/f8vnrP76PJ8DoXO21WSFpidZ1i0cE2deobNQ5tszi0N0cQBExOTsZdY+rue70eyysrHDx4gDvvvBPHcdi2bRs7duxgbXUVx3FiwgLVR5PL5djY2PjSRz/6kZVarYZubOVuuM4X/O7v/m7OnTtHr9fzisXiO9vttp1xMjgZtS1S0g6cGPZut8vm5iaGYbBv3z61KWOnm24D0Wm3MUzB9ukKTzxzmUKpzORYkWbXo9P1roP6bxmoMGCiIHnHd2znlbeO0ut0qdU6FO2Qtz+4k3d85152TDusLm/Q7fpkjJA3v2aKe18xhonL8loXnYDX3TXK6++ZpFqAK1dbRJoxlDCMt5dIppkQ5AoZqqUMzWYb29vgn3zPfvrdVbZt2065VEICbtzCoHYBXWNlZYUwDJiamuK2227FcRxOnTpFqVQim8nQ7nRUttc0my+dPv0fnnjiiUvtdpuPfvSjW577OmqNpFGx2Wx+s1KpHDZN46HaZo18IY8db8IeRRLPdak3Gniex8TEBNu3bcN2HHVj0QBcVyyVWF1dY3ZmhtfeXuTJU5e4884DHNw9Rq8f0Kp3VVvrdVpKASZe96ppfuTdd2DbNhsbq5w9V+efvPs1/MD3vILFxavce9co26dt/stvPMOe2RG+/x/vYmykyCf+pM5zL7aYnCzxff9oB7t3jvPEUyd56tl5Ak25w4PcYYwM0QRW1qZayeB6Pr3aCv/krTsp5jxCp8TIyCimpUhyEhiT7/tMTEzgeR7r6xusr28wOzubNqbm83m1lbnvMzIzw8bGxuHnjxx5dmpqCs/1rnvs61bIF77wBX7rtz+C0DRvc3PTKRQKb282m1qSy9dQTfKtdhtdCCYmJiiXSzRbTR5//Kusr6+nW9oNdpeJ2NjY4MDeSS5dWmVhLWBu2yi2Y7LZ7BN411PyaRoYmiTs1+m1N7nl4DaeePoU6+stfuxHXsvRY6d4/89/jHqjzWvv38NzRy5Qq/e4eOECB/bNcOHiCsdO1TFMnYtnT7NjbpRGs8NTzy4T6YMM8yBKEQjHYmwkj9BgfXGR199W5i1vnKPRqDE3t5OM44Cm4fsejUaTXDZLFKm9U8rlMsXiYAPkZrNFIR6zbqeDZdtUKpXw/IULv/iGN7zh8MTkJP/pP/3H6577huQzn/jDjydo8s+XisXjQojba7Ua2axCCyYo80w2y8WLFwnDUJFRdjpbA6EoVBtPFgp4rsvm5hrf8507+cinz3P+osOeXVO43iinz67hdq+NTzRCdE5eaDA7Ee9rKCW6ACkD1jeabNZ9mk3VyqzrktVN0LQQPwaFaUJQ7+ic6Un6bjgw2jLZWlvZDKkBlkGlksU0BGtXr7J/UvDD338XG2vzzMzMks/n4nKESu17nsf8wgJ79+5BSkmr1aJcLlMul9WqiNPuvV4P1/PYtWsX7U7n+Pz8/J+trq6yvLxyQ1V9w6BAF4JarcY73/nOpXqj8QfZTIb65ibdTjfmW9SpbW7yzWef5fTp01y6dInNep19+/YxNzfHwYMHYhySiyY0LNOkXK4QhhFC6/FP/vFeWquLzC+ssXOmxN7do9i5QaEqUSJS0xC6hdDNtKGy0Q544cXL3Peq/fz8z30vP/xDr2d9o856zUUYGXTDHjDkoYHQ0Q2LZJdSYq8MGRtxANOkXM6RsXU2VlaYsLu875+/jjBokc3lqFaraYpd8aa0CQJFKXX58jy7d+9SEJ92GyRYppVqE4WsTDZGW//YB3/5l64uLy+TyWZevkB+4n3vI5fL8dnPfpaVlZVPBGF4Sug6GxsbhGGAbVtMTU2xY8ccBw6owa/X64yNjTEzM82ZM2c5e/ZsileKN3KPt9FrM1oV/PN3HaR29QqLSzV2z5bZt2sUO7tVKHGnS4oBjiLwIpvf+9SLfPKPnyCKOhQLJk994zT1rgW6kSqgIRBrLJwBJXoC5ZGAtExK5RxZR2dzdZWqaPKvfuxBKiXVtj0+Ph5v95eQ8AgqlTKVcllllc+fZ2HhCgcPHkjbExKQiBdDXXfsmKPT6ZxcXFz85K/9l1+nWq2m2d2XJZDkWFtd5Z3v/J5L9c3N385mM7LRbNBpdxBCtfuOj0+Qy+U4cOAAszMzzM/P87WvfZ1z585RKhYplkrxBlpKKJlMhnK5zNLSVaYndN7zfQfZWFzgytIGu2bLHNg7TibvbOl4TeKeIIj3qTUclusGjzy+hK5nuXjpCl87fBVpFJHoqfd0DRdoSvIS6z71u2UpYdiCzdUVqqLBz7z3tYyNwMrKKlNTU2QyGaJYGK7rsrq2xsKVK0RSsmvXTu677z6MeCe6Xbt2xeVv5fj0e10qlTL5fEGura399i/8wi9cfun0aXr93k3H/KYC+dmf/VkKxSJ/8iefYXFp6WOe6z1nmRbrGxv4npdyBPZ6PWq1Gs8+9xynT59mZGSEgwcPMDY2lpKSyXj7CyEEuXhfw/PnLzBWCfnn37uP+tUrXJpfZW6ywKH9ExTKWYh3EZCaThBCp91WbXLCBGHymvv2s222yOceeYH1dgEMR6XrNYNur4fnBzEjnMp/9Xr9eLB0leuybUoV1YNYW7nKuNXmfT9yH8W8y9LVq0xMTJDJZBBCo9938bykN0alQBYXFzl58hRLS0uYhkG93uDy5cspRs331Z7xc9vnqNVqz164cOFjH/rQh5icmOA3f+M3byoQnW9xvOUtb+anf/pneN/73tdeX1/vlyuVt3W7XcMwzbhRUXlcC/Pz5AsF9u3bx9jYmNqzENXi1Wq36bsunu+lvFiJoJaWrjJadTi0Z4znX7hMrR2xbbpCoeDQ6QfKEEtJt9PnhWMXOL/g0osyCKHju22ePnyGU5ciAqOi+jc0tW3qSycvcuZCi06YR8a7wV04t8CJl1Zo+HnIlihVcphaQH1lkV0jIf/rD92JRh3f95mdnSWXy8b956pTuFgsABqbm5tMTkwwNj6e1jw2ajWWl5cJArVfr5SSZqNBtVolm826586fe//tt9/+1Lvf/T/xuc99Pi7w3fjQ+AuOD/7yLxOEIbVaLXfPPff8bi6Xe2cQBGzbto1cLqvY5gI/PVUQ+PS6PToxZVIul2V8fIJOp8PCwgLZbE6xusV8WxsbG5RKRTS9xB89Mk/dL7B7zwyuLzl7qcbaahPZ70MUoAl9wKsbBmhStQlIzYgzvFKxWoeqPU61iWloMkSGAVJoGLkc+UIGGbh0169y194C3/Xm3bSay1SrVXbt2kUul01XQhD4KXPe+Pg4Z8+eJZfLMTY2lraOu56XtnknTA7dbpedO3ewsHDlU1/60pf+l6mpqa7neXzwgx/8luP9LVcIwNvf/nYAJicn/Xq9fqlSqbwtCsNiEIZks7kUE6UADn2ajSb9eOvUbdu2UamUEXGbwOLiUuoWJwA7wzDY3KwT+B3uvnWS2nqdU+c3KRbzTIzlkULQ8SICqQBrJNxeQiB1I1ZTg7ZuYs8qFQZx5dG0sPJZclkDr1Mn2LzKd943xYMPTLG6cpmpqWl27NgRqymRcmv1ej2ajSbrG+uqu0qlPsjnVaCc7PRpmmpTyoTIbHx8nGazeeX48eM/MTs7ezkp9H39a1/76wnkz//8z3nooYe4evUq73//+xefeuopUSmX39jpdERCjaTrgiBQaZRsLsfY2CiFfIFLly7y5JNPMTk5Rb/fY2FhgXK5TFLUTzjQLdOk2+vRbNa4bf8YWSPi2MllQmkwOVYkk7HoBxGuP8wOsdV0D8gz2PJ/BQzQcbImlh7Qqy1TosH3v/0Ae3aYrG8ss3fvPrZtm03L0EEQ0Ot2034T13XZ3NxkcXEx3a06DALyuVy8d6Hy4nw/oF6vJy3R4cmTpz7w/ve//49/9Vd/FU3T+JW/YHW8LIEAPProo7z1rW/lySefZGlp6USlWj2Uz+cOtFttbMdJUYitVpt6XfX9OY5Ns9lC0zTuvPNOXnzxuOLJzeXwfLUHrILD6Ogx0VcURmxsrDMz6bBve5Hz51e4ut6jUspTLmWJADdQGwUMH8M5qSQzDCovJWwdxwHcBt7GFW7d7vCD33M7ghq+73Lo0CEmJsaxLDMGBXbpdXv0XZerV5dZX18nm81RqVRwXZfa5iajoyM0mk0KBRWJK9sVqD3bPY9Cscj5c+cefvyrX/13X/nK426pVOS//bf/9nKG+uUJBOAtb3kLpmlSrVbdWq12slwuP6Tr+kg/BqFZlokRY6Tqm5u0mi3uuOMObr/9djY3N7l48WLacxf4Adu2zVKPU/uGYabYLkM3qG9uIrQ+dx0aJ+z3OH1+jUgzqFby2LaJF/OpEF0rDCUeqWlIQ8ewBabm4TeWyQU1/vEb9/G618yyvnaZcrnM/v37qVTKMTpdo9ft4sd96s14wINAFZuaTWWkR0dHsS2LldVVSsWS4llB0u50aDQalMpllpaWzhw5cuTHp2dmFjSh0e12OXLkyLdXIF/60pd48A1v4MTJk7zpoYdWLl++vFKtVN4chKGdgMRs2yaXyyU5fxzHYWJikmPHXoi38s7RarUolUvMzSkGCEXLkZDWJzQUDq7rUt9cZ9e2PHtm8yxdWWNptYOTyVAoZBCGwA8Vv2MqDE1D6jqaaWAYEtw6tJa5a0+RH/6Be6hWAtbWVpibm2Nubi4ut8ZdToFqnllfW8MwDBqNBoZhMDU5kXpOq6urNJtN1lZX0XWdmZkZDNOg33epb26Sz+WoNxqNYy+++C9f+8ADX/nPv/hLzM7O8JGPfOTlDvPLFwjAY489xvd9//dz9tw5Pvybv3nq7le+0hwZGXldv98XYRht4UIRQmNmZoZur8e5s2cZGx0FTaPdbrN//346nQ7Hjh1TZMOmmdZckt5G27bRhVAsEXR5xS1jlLOwML9Oo+3jZDJkshYIQShjw23oaIaGCLponVV2jkT8z997Fw++fhcb6wtEUcSePXsYHR1VTHCahtvv0+316HQ6hGHIZr1Ot9tNKToy2SzVGEdcrVaw42ro7t27yWYzeJ6vWtJsG9fzwuPHj/+nD3zgA7/hB748cOAAv/e7v/uXGeK/nEASobzpTW/ila98pZyfn39udHR0emx09M5eT3F+JNtZg0wR4KZpks1k6HW72LbN7l27OPzMM6yurbFz505279pFPSZFtm1blYP1mPPRtvGDgHp9g9Gy4BUHqthawNLSJp1+SCbrUMg7mKaO77to7Q22FV2+/60Hefe77sY2O1y5skC1WmV6eppszJurjLBPp6Nq4utr6/R6PQr5AvXNTXTdwHFstaKLxXRP+EKhwMjICJmMQxCE1Gq1tGh38uSJj3zxS4/+/Gtf9zrPskx+//d+7y87vH95gQC87a1vwzAMJiYmvPX19cPVkZFbxsfH93Y6nZRmz4xrxRqQz+eJpKTRUN27vu9z+PBh7r77brZt28bZc+e4cOECuVwuTVWEMa25ETefWpZNr9en1dxg25TFnQeqZPWQjfU23W4fGfSZLkZ8z4Nz/PC7XsH0hM6lS2fp9VQ+qlKppNTi/V5P7ZEShDRbLa5evZrm45JGpdWVFVUTb7ViNakoXlULNKlHpWygwamXXvrc008//VOzs7ObAIVCkWe+RQB4s+MvDAxvdvzqr/4qExMTiqTFdfccOHjgI6VS+YGlpSUAyuVy2urr+4pPt16vc+utt7KyuoIfE9cfPXqURqPB5OQkxUKRIGaxSwBmimPKSOm7e3EbcRD4lMsVTLvMxUWFlb11Xxnfq7OyvAwSKtUq+Xw+bmJVm9KrwpJqUUs4FhcXFzEMk3K5xMryShpPbN++neXlFbZv38aOHXNYpkUYt2dsbm5CzAp38tSprx0+fPifVSqVC1HMm/WL//k//5XG9a+0QgAeeeQRXvva1/Lud/8Q7Xan1mq1nymVSq+YmJjY1m616XQ6MfObosDz4ppyJibOvHJlkaNHj2KaJnNzc2SzOTzPpdVsMjIywtjYGPXNTTxXrTgRQ48sy0pJ1FQqfIOpMZOM2eHKwkVazRb5fJ5qtapo/2JCmV6vR7fbpd1qMTU9zfLyMp7nMTIygmVZCoxgmBSKBQDm5uaUkV9fZ+fOneRyOaRUQJBa3DErdJ3Tp1968rnnnn/v5OTk2Ve+8pUce/FF/tt//a9/1WH9qwskEcqe3bt5xzveQafTXms0Gk/m87lbxsbHdyrXsYGuG4qwWFP7JS4tLXHx4iXW1taYmZlmfHwcXTfodjt0u122zc6SyWSQUUSz1aLZapEvFAYQpJhUzTQValJ5ZB5BEFCtVKgMCSLpE+/1ehQKBVqtFqtraynHl67rlMtlnLgba219DU0TFIsF1tbWmJ+fZ+/evUxOTqLrgl6vT61WS1XfyZMnH/3mN5/9F1NTU6f/w3/4D/yXX/91fvu3fuuvM6R/PYEAPPzww+zdt4+HHnqIVqu1UattftUyzbnqSPWgG7uDCVNo4oGZhsHE5CTFQoEoimg2VTyybds22u02X3n8cSqVCmtra8pdzudTgaQ3Hg94Iphc3MWVsKUmvRjJfoyHDt1CJpNhfn6enTt3cvXqUsobbFkWjuPgZDI0Gg1WVlaQUqqywuysap3r9mJiNAfX7XP8+PFPHT78zI+PT0xc/JF/+k/52f/jZ/mtD//1hPFtEQjApz/9aQ4dOsR9995LfXOzsXT16mNC00rFYvEVYRSJWq2GpgkcRxnnXC6bMvj0en0c22Z8fBzf9/j6E0/QbDY5dMstXLlyhXK5nPZww1ae9OQQaSKRLZ9LqL3bMVht165dlMtlbNumVCxhmCatVotev48V81yNjY0rvt3ZWSrVKkLTaLXbtNtt8vk8jXrdf+HYsf/360888TPjE+PLY6Oj/Nmf/Rkf/vCHvx1D+e0RCMAf/dEfce9991GtVPB8r3vixKkvaxp9J5O5R+i6XattEEUS27JiGkGVKu90lKpaWFhgaWlRucG7dyOEYHl5mfHx8bSpEhhsEjMklOFNgYc51VNudWB1bY18PsfExATnzp3jhRdeoJDPUylXCELlMRWLRbKZLE5GcSMGfpwO8X3yCmNWP3r06Ac++9nPfmDnzh1NKVWrxv/13//7t2sYv30CAfiDP/gDXvPAA4lr6P/cz/3ckwcOHLhoWdZdjuNUmo0GXtxcn+wZGEUR9c06m/VNgiBkY2ODqakpOp0OzWaT8fHxlOcxYc9Ofr92d4H0FUUp4TOQst+tra1TLpdZXr7KmbNn6Xa7NFtN1uLofGJ8XDHUhYq6r95oYJomlmVx4fz5c0eOHPmpD3zgAx9+8MEHfdAYHxvjg7/yK9/OIfz2CgSU+nrTm95Eu93m4MGD8qE3vvH4177+9acMw9hdKBZ3ua6r2NYY7B5QLBYYGx+nWCgQxM0/SUxQrY6g63HnHYN9NoYFoUG6K1oCZEjR5wwcgVZMxD8xPo7neYyNjVEpVxgdHWV2dhYrRsuoekaPUrGI57qcOHHii88+99yPPvTQQ4/1+n1pOw6FfJ4PfehD3+7h+6vHIS/n+I//8T9y6dJlXvnKuzl37tz4vn37/tXU1NS/EEIUEtrZQj6PETMeeL7PxsYGa2trtFotpqamqFQqylsKkw0vw5TbJArDgSCGtl2CAatRshqllLgxniwRzq5duyiVSmnDped5dLtdHMchn8+xsrzSPPXSS//3N5999kMH9u9f+/SffJpX3fMqfu+vEIG/3OPbvkKGjy9/+cv8o3/09oR8v/PRj/7Ol2dmpk9nHOdgoVCY6Pf7tDsdiMHbhq5jWWZs+HOUy+WB14TSQNfah4TXMEWrDFEuaLBl80bDMLBMEz8IGBsbo1googkt3Wai3+9TLpcRmsaZM2ePHjly5F9+4AMf+L/vv+++tmVZFAoFPvaxj/1NDtnfrEAAvvrVr3LX3XfjuS7bts1Gt91228nnjxz5oq7rdqlYPGhalqVYSftoMbFm0qMXt36lwmDIflwvFIbAb3JQWWSA1BdCYMadTpmY2a3T6dJqNclmMlQrFdbXN1rHXjz2W88888xP3nHHHU8bhimFUJDRv8mV8bcmEIAnvv51nnzySR544AF++qd/moceemjzM595+IvlcuWEbVk7i6XSTIL+84NA1Uf0rbspyxRtmMhguKk/fVOl4OP/DtsQoQ82b5RSMfMo6g2dyYkJwiji9JkzTz///PM/86u/9mv/9e67X7nx7//9L/DZz36Wj3/84xw9evRvY6j+dgSSHE8//TT/+l//a3q9HqOjo+G+fftOPfPss5/XNK2Zz+X2FovFYhCG6U45It1Q68YtO9d5WvGntJg3Q9NI4xO1RarCVzWbTQCmpibJ53LMLyzMv/DCCx988qmn/s2thw49ZxqKzeLRRx+9Dp3+/yuBADz55JM8/fTTvOY1r+EHf+AHeeGFo+33v//9X/39j33sK0IIs1go7Crk844fBHQ6bfwgABQ1xeD4FqorEYiWbJMh01xWJ94wbHp6mtHRUdbXN2ovHj/+e88999y//PVf//VPff7zn28fPHiQ+fl5PvGJT/Dcc8/9bQ/P375AkuMb3/gGtu3Q7fX4xCc+wdjY2PKHP/zhL4yMjj4tdD1bLBa3F/J5OzW4SdOQZMt22NcJJf5dRjJmbOvGrJ8Gs7OzTE5M0Gw2mydOnPjM888//7O//Mu//P/ee++9V3/pl34JXddZW1v7Gzfc3+r4G3V7X+7xvp/8SdXD7brs3bOHLz36qPOG17/+Ddu2zf7I2OjYdzqOU+p0u0qVhWG6XYaitBjQfIdx3sp1Xfr9HmEYUSwWmZqawnEc1tfX65cvX37k/Pnzv/Xwww9/7Qd+8AfdkydOxGQzJp/85Cf/rofi74dAkuOnf+Zn1N6InseB/fv51Kc/bT/00EP3bZud/eHxsbG35vK5Kdf1FJlLr6cKWHEpNohr4p6n9jgcGRlhdHQUoWmsrK4uXb58+fMXLlz4/U9+8pOH3/Oe97gnT55Mt5H4xCc+8Xf96Onx90ogyfG+970PIyZE27lzJ//m3/6c/m/+9b+6dXZ29p0T4+PvKJVKt2hCmO12m83NzdQ2FItFxkZHyWSzdLsdf2np6on5+fnPXLhw4dO/8zu/c/KnfuqnwjNnzpCNG20+/elP/10/6nXH30uBJMdPvO8n0DRVvZuemuLnf/7nee+P/ujkrp07H5ycnHxHtVp9bS6XnSYmgfGDQK6vry8tLS19bX5+/jOnXnrpq5/70z9dee9738vly5dxYr7Dhx9++O/60W56/L0WSHL82I/9mEqjx6xxtxw8yL/7+V8w3/3uH9o3OzPzhnK5/N2+70XLyyufuXjx4uO/8zu/c/YXf/EXgyNHjnL16hKlUglNCD7791gQyfE/hECGjx//8R9X22YEIaOjI7z2gQf40K/9WqHb7fAz//KnW48+9hjLy8s4GYco/Puplr7V8T+cQJLjPf/iX+C5Hq9+1av4xuFv4Louf/iHf8i73vUuAP74j//47/oW/+H4h+Mfjm/78f8BLM+qGx8CIUIAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjYtMDYtMTdUMDU6MjM6NDgrMDA6MDCAP/UbAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDI2LTA2LTE3VDA1OjIzOjQ4KzAwOjAw8WJNpwAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyNi0wNi0xN1QwNToyMzo1MyswMDowMGjaOBwAAAAASUVORK5CYII=" alt="" width="100" height="127" />
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td class="inner-padding" style="background-color: #ffffff">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="
                    font-family: &quot;Open Sans&quot;, Arial, sans-serif;
                    font-size: 15px;
                    line-height: 24px;
                    color: #555555;
                    padding-bottom: 20px;
                  ">
             ${description}
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 0 0 25px 0">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="
                      background-color: #caf0f8;
                      border: 2px dashed #0077b6;
                      border-radius: 8px;
                    ">
                <tr>
                  <td align="center" style="padding: 20px">
                    <p style="
                            margin: 0;
                            font-family:
                              &quot;Open Sans&quot;, Arial, sans-serif;
                            font-size: 16px;
                            color: #0077b6;
                            font-weight: 600;
                          ">
                      ${datetitle}
                    </p>
                    <p style="
                            margin: 5px 0 0 0;
                            font-family:
                              &quot;Open Sans&quot;, Arial, sans-serif;
                            font-size: 28px;
                            color: #333333;
                            font-weight: 800;
                          ">
                      ${date}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

       

          <tr>
            <td align="center" style="padding-bottom: 10px">
              <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center"  bgcolor="#0077b6">
                    <a href={${buttonURL}} target="_blank" class="btn-primary" style="
                            font-size: 16px;
                            font-family:
                              &quot;Open Sans&quot;, Arial, sans-serif;
                            color: #ffffff;
                            text-decoration: none;
                            text-transform: uppercase;
                            border-radius: 30px;
                            padding: 14px 30px;
                            border: 1px solid #0077b6;
                            display: inline-block;
                            font-weight: bold;
                          ">
                      ${buttonTitle}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td style="
              background-color: #f9f9f9;
              padding: 30px 40px;
              border-top: 1px solid #eeeeee;
            ">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="
                    font-family: &quot;Open Sans&quot;, Arial, sans-serif;
                    font-size: 11px;
                    line-height: 18px;
                    color: #999999;
                    text-align: center;
                  ">
              Nöbet Yönetim Uygulaması  <br /><br />
              Saygılarımızla,<br />
              <strong>Siber Sistem Geliştirme Komutanlığı</strong>
              
            </td>
          </tr>
        </table>
      </td>
    </tr>
    </table>


  </center>
</body>

</html>`
}
