<?php
$is_invalid = false;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $mysqli = require __DIR__ . "/database.php";

    $sql = sprintf("SELECT * FROM user
                    WHERE email = '%s'",
        $mysqli->real_escape_string($_POST["email"]));

    $result = $mysqli->query($sql);
    $user = $result->fetch_assoc();

    if ($user && $user["account_activation_hash"] === null) {
        if (password_verify($_POST["password"], $user["password_hash"])) {
            session_start();
            session_regenerate_id();
            $_SESSION["user_id"] = $user["id"];
            header("Location: index.php");
            exit;
        }
    }

    $is_invalid = true;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Valence 2 — Login</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, #4e54c8, #8f94fb);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .login-wrapper {
            text-align: center;
        }

        .brand-title {
            font-size: 2.2rem;
            font-weight: 600;
            color: white;
            margin-bottom: 1.2rem;
            letter-spacing: 1px;
        }

        .login-container {
            background: white;
            padding: 2.5rem 2.5rem;
            border-radius: 14px;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
        }

        h1 {
            font-size: 1.5rem;
            margin-bottom: 1.2rem;
            color: #333;
        }

        form {
            display: flex;
            flex-direction: column;
        }

        label {
            font-weight: 600;
            margin-bottom: 0.3rem;
            text-align: left;
        }

        input {
            padding: 0.8rem;
            margin-bottom: 1.2rem;
            border: 1px solid #ccc;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.3s;
        }

        input:focus {
            border-color: #4e54c8;
            outline: none;
        }

        button {
            padding: 0.8rem;
            background-color: #4e54c8;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        button:hover {
            background-color: #3c3fa1;
        }

        .error {
            color: #e74c3c;
            background: #fdecea;
            padding: 0.6rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            text-align: center;
            font-size: 0.95rem;
        }

        .forgot-link {
            margin-top: 1rem;
            display: block;
            color: #4e54c8;
            text-decoration: none;
            font-size: 0.9rem;
        }

        .forgot-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>

<div class="login-wrapper">
    <div class="brand-title">Valence <span style="opacity: 0.7;">2</span></div>
    <div class="login-container">
        <h1>Login to your account</h1>

        <?php if ($is_invalid): ?>
            <div class="error">Invalid email or password</div>
        <?php endif; ?>

        <form method="post">
            <label for="email">Email</label>
            <input type="email" name="email" id="email"
                   value="<?= htmlspecialchars($_POST["email"] ?? "") ?>" required>

            <label for="password">Password</label>
            <input type="password" name="password" id="password" required>

            <button type="submit">Log In</button>
        </form>

        <a class="forgot-link" href="forgot-password.php">Forgot password?</a>
    </div>
</div>

</body>
</html>
