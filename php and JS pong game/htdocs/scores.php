<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Pong Game - Home</title>
  <!-- styles -->
  <?php require './styles/styles.php' ?>
  <!-- Scripts -->
  <?php
  require './src/user-management.php'
  ?>
</head>

<body>
  <div class="decorator"></div>
  <div class="grid-layout">
    <?php require './partials/header.php' ?>
    <div class="content">
      <div class="gutters">
        <?php require './partials/scores-content.php' ?>
      </div>
    </div>
    <?php require './partials/footer.php' ?>
  </div>
</body>

</html>