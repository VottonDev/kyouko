<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <meta property="og:title" content="Kyouko - Drop"/>
    <meta property="og:site_name" content="Kyouko.se"/>
    <meta property="og:locale" content="en-US"/>
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">

    <title>Kyouko Drop</title>

    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <link href="css/ie10-viewport-bug-workaround.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/theme_red.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <!--<script src="js/ie-emulation-modes-warning.js"></script>-->

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

<!---->

  <!--
  <div class="leftAlert" style="margin-top:218px;">
    <h1>FileName</h1>
    <div class="progressBar">
      <div class="progress"></div>
    </div><p class="progressText">0%</p>
  </div>
-->


  <body>

    <div class="site-wrapper">

      <div class="site-wrapper-inner">

        <div class="cover-container">

          <div class="masthead clearfix">
            <div class="inner">
              <h3 class="masthead-brand"><a href="index.php">Kyouko</a></h3>
              <nav>
                <ul class="nav masthead-nav">
                  <!--<li><a href="#">LOG IN</a></li>-->
                  <!--<li><a href="situation.php" class="emphasise">SITUATION</a></li>-->
                </ul>
              </nav>
            </div>
          </div>

          <div class="inner cover">
            <form id="upload-form" enctype="multipart/form-data" method="post" action="upload.php?output=html">
    <!--            <button id="upload-btn" class="btn" type="button">Select or drop file(s)</button>
                <input type="file" id="upload-input" name="files[]" multiple="multiple" data-max-size="100MiB"/> -->
                    <div class="upload-btn-wrapper">
                        <button id="upload-btn" class="ubtn" type="button">Drop</button>
                        <input type="file" id="upload-input" name="files[]" multiple="multiple" data-max-size="100MiB" />
                    </div>
    <!--            <input type="submit" value="Submit"/> -->
            </form>
            <div id="alertArea">

            </div>
          </div>
      
          <div class="mastfoot">
            <div class="inner">
              <div class="container">
                <!-- Headings -->
                <div class="row">
                  <div class="col-sm">
                    <div class="textContainer">
                        <div class="fHeader">
                          <fH>Legal</fH>
                        </div>
                        <div class="fLinks">
                          <a href="legal/terms.html" target="_blank">Terms of Service</a>
                          <a href="legal/privacy.html" target="_blank">Privacy Policy</a>
                          <a href="mailto:votton@auroware.com?Subject=Content%20Takedown%20Request">Report Content</a>
                        </div>
                      </div> 
                    </div>
                  <div class="col-sm">
                    <div class="textContainer">
                      <div class="fHeader">
                        <fH>Transparency</fH>
                      </div>
                      <div class="fLinks">
                        <a href="https://t.kyouko.se/?dir=DMCA" target="_blank">DMCA Requests</a>
                        <a href="situation.php" target="_blank">Our Current Situation</a>
                      </div>
                    </div>
                  </div>

                  <div class="col-sm">
                    <div class="textContainer">
                      <div class="fHeader">
                        <fH>Donate</fH>
                      </div>
                      <div class="fLinks">
                        <a href="https://patreon.com/Votton" target="_blank">Patreon</a>
                        <a href="bitcoin:1Jx1PSYdqwrhtYGhUvVvYZRfKScHQ9VLRH">Bitcoin</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="js/bootstrap.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="js/ie10-viewport-bug-workaround.js"></script>

    <!-- Upload JS -->
    <script src="js/upload.js"></script>
  </body>
</html>