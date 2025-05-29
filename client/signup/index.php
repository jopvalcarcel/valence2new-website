<?php
session_start();

if (isset($_SESSION["user_id"])) {
    $mysqli = require __DIR__ . "/database.php";

    $sql = "SELECT * FROM user WHERE id = ?";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("i", $_SESSION["user_id"]);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome to Valence 2</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <style>
        body {
            margin: 0;
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, #4e54c8, #8f94fb);
            color: #333;
            display: flex;
            justify-content: center;
            align-items: start;
            min-height: 100vh;
            padding: 3vh 2rem;
        }

        .container {
            background: #fff;
            padding: 2.5rem 2rem;
            border-radius: 16px;
            max-width: 600px;
            width: 100%;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .brand {
            font-size: 2rem;
            font-weight: 600;
            color: #4e54c8;
            margin-bottom: 0.3rem;
        }

        .greeting {
            font-size: 1.25rem;
            margin-top: 0.5rem;
            margin-bottom: 2rem;
        }

        .actions a {
            display: inline-block;
            margin: 0.5rem;
            padding: 0.8rem 1.5rem;
            background-color: #4e54c8;
            color: #fff;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 500;
            transition: background 0.3s;
        }

        .actions a:hover {
            background-color: #3c3fa1;
        }

        @media (max-width: 600px) {
            .container {
                padding: 2rem 1.5rem;
            }

            .brand {
                font-size: 1.6rem;
            }
        }
    </style>
</head>
<body>

<div class="container">
    <div class="brand">Valence <span style="opacity: 0.7;">2</span></div>

    <?php if (isset($user)): ?>
        <h2>👋 Welcome back, <?= htmlspecialchars($user["name"]) ?>!</h2>
        <p class="greeting">We're glad to have you. Let's get designing.</p>

        <div class="actions">
            <a href="valence/dashboard.html">🚀 Go to Dashboard</a>
            <a href="logout.php">🔓 Log Out</a>
        </div>
    <?php else: ?>
        <h2>👋 Welcome to Valence 2</h2>
        <p class="greeting">Please log in or sign up to start designing smarter wastewater systems.</p>

        <div class="actions">
            <a href="login.php">🔐 Log In</a>
            <a href="signup.html">📝 Sign Up</a>
        </div>
    <?php endif; ?>
</div>

</body>
</html>