<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$user = "bhavik";
$password = "logieagle2";
$dbname = "reactdb";
$id = '';

$con = mysqli_connect($host, $user, $password,$dbname);

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));


if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}


switch ($method) {
  case 'GET':
  $id = $_GET['id'];
  $sql = "SELECT * from contacts".($id?" where id=$id":''). " ORDER BY id DESC";
  break;
  
  case 'POST':
  $name = $_POST["name"];
  $email = $_POST["email"];
  $country = $_POST["country"];
  $city = $_POST["city"];
  $job = $_POST["job"];

  $sql = "INSERT INTO contacts (name, email, city, country, job) values ('$name', '$email', '$city', '$country', '$job')";
  break;

  case 'PUT':
  $id = $_GET['id'];
  $name = $_POST["name"];
  $email = $_POST["email"];
  $country = $_POST["country"];
  $city = $_POST["city"];
  $job = $_POST["job"];
  $sql = "UPDATE contacts SET name = '$name', email = '$email', city = '$city', country = '$country', job = '$job' where id = '$id'";
  break;
}

// run SQL statement
$result = mysqli_query($con,$sql);

// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}

if ($method == 'GET') {
  if (!$id) echo '[';
  for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
    echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
  }
  if (!$id) echo ']';
} elseif ($method == 'POST') {

  $sql = "select * from contacts".($id?" where id=$id":'');
  $result = mysqli_query($con,$sql);

  if (!$id) echo '[';
  for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
    echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
  }
  if (!$id) echo ']';

} else {
  echo mysqli_affected_rows($con);
}

$con->close();
